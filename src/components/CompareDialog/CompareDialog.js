import React, { Component } from 'react';
import s from './styles.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

class CompareDialog extends Component {
	_renderContent (cars) {
		return cars ? (
			<MaterialTable
        columns={[
          { title: "Year", field: "year" },
          { title: "Manufacturer", field: "manufacturer" },
          { title: "Model", field: "model" },
          { title: "Trim", field: "trim" },
          { title: "Drivetrain", field: "drivetrain" },
          { title: "Range (mi)", field: "range" },
          { title: "Battery (kwh)", field: "battery" },
          { title: "Price ($)", field: "price", render: rowData => `$${rowData.price}` }
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