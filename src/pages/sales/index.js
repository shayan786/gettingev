import React, { Component } from 'react';
import s from './styles.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { SalesContextConsumer } from '../../contexts/sales.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getQuarterlySales, getUniqueCars, chartColors} from '../../utils/helpers.js';

class SalesPage extends Component {
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

  _renderSales (sales, loading) {
    return (
      <div>
        { this._renderUSSales(sales.filter(s => s.country === 'US'), loading)}
      </div>
    )
  }

  _renderUSSales(sales, loading) {
    const data = getQuarterlySales(sales);
    const uniqueCars = getUniqueCars(sales);

    return data.length > 0 ? (
      <div>
        <h4> US Quarterly Sales </h4>
        <BarChart
          width={window.innerWidth - 120}
          height={300}
          data={data} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {
            uniqueCars.map((car, index) => 
              <Bar
                key={index}
                dataKey={car}
                stackId="a"
                fill={chartColors[index]} />
            )
          }
        </BarChart>
      </div>
    ) : null;
  }

  render() {
		return (
			<div className={s.container}>
				<div className={s.header}>
				  <h3> Manufacturer Sales Data </h3>
				</div>
				<div className={s.body}>
					<SalesContextConsumer>
						{
	            ({ sales, loading, error, acknowledgeError }) => { return error.state ? this._renderError(error, acknowledgeError) : this._renderSales(sales, loading) }
	          }
	        </SalesContextConsumer>
				</div>
			</div>
		)
  }
}

export default SalesPage;
