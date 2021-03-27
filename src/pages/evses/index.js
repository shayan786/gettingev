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
import { EvsesContextConsumer } from '../../contexts/evses.js';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { api } from '../../utils/api.js';
import Image from 'material-ui-image';


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

class EvsesPage extends Component {
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

  _renderTableBody(evses, loading) {
    return loading
      ? <CircularProgress 
         className={s.spinner} />
      : (
          <MaterialTable
            title="Getting EV - EVSEs"
            icons={tableIcons}
            columns={[
              { title: "Manufacturer", field: "manufacturer"},
              { title: "Model", field: "model"},
              { title: "Type", field: "type"},
              { title: "Cable Length (ft)", field: "cable_length", type: 'numeric'},
              { title: "Current Rating (A)", field: "current_rating", type: 'numeric'},
              { title: "Warranty (yrs)", field: "warranty", type: 'numeric'},
              { title: "Price ($)", field: "price", type: 'currency'}
            ]}
            data={evses}
            options={
              {
                filtering: false,
                actionsColumnIndex: -1,
                headerStyle: {
                  backgroundColor: 'white'
                },
                paging: false,
                minBodyHeight: window.innerHeight - 70,
                maxBodyHeight: window.innerHeight - 70,
                padding: 'dense'
              }
            }>
          </MaterialTable>
        )
  }

  render() {
    return (
      <div>
      	<EvsesContextConsumer>
          {
            ({ evses, loading, error, acknowledgeError }) => { return error.state ? this._renderError(error, acknowledgeError) : this._renderTableBody(evses, loading) }
          }
        </EvsesContextConsumer>
      </div>
    )
  }
}

export default EvsesPage;
