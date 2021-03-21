import React, { Component, forwardRef } from 'react';
import s from './styles.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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
// import {
//   Chart,
//   ArgumentAxis,
//   ValueAxis,
//   BarSeries,
//   Title,
//   Legend,
// } from '@devexpress/dx-react-chart-material-ui';
// import { Stack, Animation } from '@devexpress/dx-react-chart';

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

class CompareDialog extends Component {
	_renderContent (cars) {
		return cars ? (
      <MaterialTable
        icons={tableIcons}
        columns={[
          { title: "Year", field: "year" },
          { title: "Manufacturer", field: "manufacturer" },
          { title: "Model", field: "model" },
          { title: "Trim", field: "trim" },
          { title: "Drivetrain", field: "drivetrain" },
          { title: "Range (mi)", field: "range", type: 'numeric' },
          { title: "Battery (kwh)", field: "battery", type: 'numeric' },
          { title: "Accel. 0-60 (s)", field: "acceleration", type: 'numeric'},
          { title: "HP", field: "hp", type: 'numeric'},
          { title: "Torque (ft-lbs)", field: "torque", type: 'numeric'},
          { title: "Top Speed (mph)", field: "top_speed", type: 'numeric'},
          { title: "Efficiency (Wh/km)", field: "efficiency", type: 'numeric'},
          { title: "Curb Weight (lbs)", field: "weight_lbs", type: 'numeric'},
          { title: "Drag Coefficient", field: "drag_coefficient", type: 'numeric'},
          { title: "Dimensions", field: "dimensions"},
          { title: "Price ($)", field: "price", render: rowData => `$${rowData.price}`, type: 'currency' }
        ]}
        data={cars}
        options={
          {
            filtering: false,
            paging: false,
            showTextRowsSelected: false,
            search: false,
            selection: false,
            toolbar: false,
            showTitle: false
          }
        }>
      </MaterialTable>
		) : null
	}

  render() {
    const { cars, open, handleClose } = this.props;

    return (
      <Dialog
        open={open}
        onClose={() => handleClose()}
        maxWidth={'lg'}
        fullWidth={true} >
        <DialogTitle id="alert-dialog-title">Cars Comparison</DialogTitle>
        <DialogContent className={s.dialogContent}>
          { this._renderContent(cars) }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default CompareDialog