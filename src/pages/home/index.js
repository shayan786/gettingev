import React, { Component, forwardRef } from 'react';
import s from './styles.module.css';
import DetailsPanel from '../../components/DetailsPanel/DetailsPanel.js';
import CompareDialog from '../../components/CompareDialog/CompareDialog.js';
import Button from '@material-ui/core/Button';
import { CarsContextConsumer } from '../../contexts/cars.js';
import { logos } from '../../utils/logos.js';
import { bodyStyles } from '../../utils/bodyStyles.js';
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
import CompareIcon from '@material-ui/icons/Compare';
import { api } from '../../utils/api.js';
import Tooltip from '@material-ui/core/Tooltip';
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

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetailsPanel: false,
      selectedRowData: null,
      showCompareDialog: false,
      compareCars: null
    }
  }

  componentDidMount () {
    const { params } = this.props.match;

    if (params.id) {
      fetch(`${api.url}/cars/${params.id}`, {
        method: 'GET'
      }).then(response => {
        return response.json()
      }).then(data => {
        this.setState({ selectedRowData: data, showDetailsPanel: true });
      }).catch(error => {
        console.log(error)
      })
    }
    if (params.cars) {
      fetch(`${api.url}/cars`, {
        method: 'GET'
      }).then(response => {
        return response.json()
      }).then(data => {
        const filteredCars = data.filter(d => params.cars.split(',').map(c => parseInt(c)).includes(d.id))
        this.setState({ compareCars: filteredCars, showCompareDialog: true });
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

  _getLookupObject (items) {
    const uniqueItems = Array.from(new Set(items)).sort()

    return uniqueItems.reduce(function(r, e) {
              r[e] = e;
              return r;
            }, {});
  }

  _renderManufacturer(rowData) {
    const logoStyles = {
      position: 'static'
    };

    const containerStyles = {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      paddingTop: '0px',
      position: 'static',
      borderRadius: '50%',
      width: '26px',
      height: 'auto',
      margin: '0 auto'
    }
    return (
      <Tooltip title={rowData.manufacturer} placement="bottom">
        <Image 
          src={logos.find(l => l.name === rowData.manufacturer.toLowerCase()).url}
          style={containerStyles}
          imageStyle={logoStyles} />
      </Tooltip>
    )
  }

  _renderStyle(rowData) {
    const logoStyles = {
      position: 'static'
    };

    const containerStyles = {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      paddingTop: '0px',
      position: 'static',
      borderRadius: '50%',
      width: '26px',
      height: 'auto',
      margin: '0 auto'
    }
    return (
      <Tooltip title={rowData.style} placement="bottom">
        <Image 
          src={bodyStyles.find(l => l.name === rowData.style.toLowerCase()).url}
          style={containerStyles}
          imageStyle={logoStyles} />
      </Tooltip>
    )
  }

  _renderTableBody(cars, loading) {
    const { history } = this.props;

    return (
      <MaterialTable
        isLoading={loading}
        title="Getting EV - Cars"
        icons={tableIcons}
        columns={[
          { title: "Manu.", 
            field: 'manufacturer', 
            render: rowData =>  this._renderManufacturer(rowData), 
            align: 'center',
            lookup: this._getLookupObject(cars.map(s => s.manufacturer))
          },
          { title: "Model", field: "model" },
          { title: "Trim", field: "trim" },
          { title: "Style", 
            field: 'style', 
            render: rowData =>  this._renderStyle(rowData), 
            align: 'center',
            lookup: this._getLookupObject(cars.map(s => s.style))
          },
          { title: "Drivetrain", field: "drivetrain", lookup: this._getLookupObject(cars.map(s => s.drivetrain)) },
          { title: "Range (mi)", field: "range", type: 'numeric', filtering: false },
          { title: "Battery (kwh)", field: "battery", type: 'numeric', filtering: false },
          { title: "Accel. 0-60 (s)", field: "acceleration", type: 'numeric', filtering: false },
          { title: "Weight (lbs)", field: "weight_lbs", type: 'numeric', filtering: false },
          { title: "Dimensions", field: "dimensions", filtering: false },
          { title: "Rebate US ($)", field: "tax_credit", type: 'currency', filtering: false, customSort: (a, b) =>  a.tax_credit - b.tax_credit },
          { title: "MSRP ($)", field: "price", type: 'currency', filtering: false, customSort: (a, b) =>  a.price - b.price }
        ]}
        data={cars}
        onRowClick={(e, rowData) => { this.setState({ showDetailsPanel: true, selectedRowData: rowData });  history.push(`/${rowData.id}`)} }
        options={
          {
            filtering: true,
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: 'white'
            },
            paging: false,
            selection: true,
            maxBodyHeight: window.innerHeight - 70,
            padding: 'dense'
          }
        }
        actions={[
          {
            tooltip: 'Compare',
            icon: () => <CompareIcon />,
            onClick: (evt, data) => { this.setState({ showCompareDialog: true, compareCars: data }); history.push(`/compare/${data.map(c => c.id)}`)}
          }
        ]}>
      </MaterialTable>
    )
  }

  _closeDetailsPanel () {
    const { history } = this.props;

    this.setState({
      showDetailsPanel: false
    })

    history.push('/');
  }

  _closeCompareDialog () {
    const { history } = this.props;

    this.setState({
      showCompareDialog: false
    })

    history.push('/');
  }

  render() {
    const { showDetailsPanel, selectedRowData, showCompareDialog, compareCars } = this.state;

    return (
      <div>
      	<CarsContextConsumer>
          {
            ({ cars, loading, error, acknowledgeError }) => { return error.state ? this._renderError(error, acknowledgeError) : this._renderTableBody(cars, loading) }
          }
        </CarsContextConsumer>
        <DetailsPanel
          car={selectedRowData}
          open={showDetailsPanel}
          handleClose={this._closeDetailsPanel.bind(this)} />
        <CompareDialog
          open={showCompareDialog}
          cars={compareCars}
          handleClose={this._closeCompareDialog.bind(this)} />
      </div>
    )
  }
}

export default HomePage;
