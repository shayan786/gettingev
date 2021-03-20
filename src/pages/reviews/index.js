import React, { Component, forwardRef } from 'react';
import s from './styles.module.css';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ReviewsContextConsumer } from '../../contexts/reviews.js';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { api } from '../../utils/api.js';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class ReviewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetailsDialog: false,
      selectedRowData: null
    }
  }

  componentDidMount () {
    const { params } = this.props.match;

    if (params.id) {
      fetch(`${api.url}/reviews/${params.id}`, {
        method: 'GET'
      }).then(response => {
        return response.json()
      }).then(data => {
        this.setState({ selectedRowData: data, showDetailsDialog: true });
      }).catch(error => {
        console.log(error)
      })
    }
  }

	_renderError (error, acknowledgeError) {
    return (
      <Dialog
        open={error.state}
        onClose={() => acknowledgeError()} >
        <DialogTitle id="alert-dialog-title">Uh Oh, something went wrong!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {error.content.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => acknowledgeError()} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  _renderReviewer(rowData) {
    return (
      <div className={s.reviewer}>
        <img src={`https://gettingev.com/api${rowData.reviewer.logo[0].formats ? rowData.reviewer.logo[0].formats.thumbnail.url : rowData.reviewer.logo[0].url}`} className={s.reviewerLogo} />
        { rowData.reviewer.name }
      </div>
    )
  }

  _renderDetailsDialog () {
    const { showDetailsDialog, selectedRowData } = this.state;

    return selectedRowData && (
      <Dialog
        open={showDetailsDialog}
        onClose={() => { this.setState({ showDetailsDialog: false }) }}
        maxWidth={'lg'}
        fullWidth={true} >
        <DialogTitle id="alert-dialog-title">{`${selectedRowData.cars[0].year} ${selectedRowData.cars[0].manufacturer} ${selectedRowData.cars[0].model} - ${selectedRowData.type} Review`}</DialogTitle>
        <DialogContent className={s.dialogContent}>
          <iframe width="100%" height="600" src={selectedRowData.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { this.setState({ showDetailsDialog: false }) }} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  _renderTableBody(reviews, loading) {
    return loading
      ? <CircularProgress 
         className={s.spinner} />
      : (
          <MaterialTable
            title="Getting EV - Reviews"
            icons={tableIcons}
            columns={[
              { title: "Type", field: "type"},
              { title: "Reviewer", render: rowData => this._renderReviewer(rowData) },
              { title: "Car", render: rowData => rowData.cars.length > 0 ? `${rowData.cars[0].year} ${rowData.cars[0].manufacturer} ${rowData.cars[0].model}` : ""}
            ]}
            data={reviews}
            onRowClick={(e, rowData) => { this.setState({ showDetailsDialog: true, selectedRowData: rowData }) } }
            options={
              {
                filtering: false,
                actionsColumnIndex: -1,
                headerStyle: {
                  backgroundColor: 'white'
                },
                paging: false,
                maxBodyHeight: window.innerHeight - 60,
                padding: 'dense'
              }
            }>
          </MaterialTable>
        )
  }

  render() {
    return (
      <div>
      	<ReviewsContextConsumer>
          {
            ({ reviews, loading, error, acknowledgeError }) => { return error.state ? this._renderError(error, acknowledgeError) : this._renderTableBody(reviews, loading) }
          }
        </ReviewsContextConsumer>
        { this._renderDetailsDialog() }
      </div>
    )
  }
}

export default ReviewsPage;
