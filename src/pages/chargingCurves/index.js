import React, { Component } from 'react';
import s from './styles.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { ChargingCurvesContextConsumer } from '../../contexts/chargingCurves.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { getChargingCurves, chartColors} from '../../utils/helpers.js';

class ChargingCurvesPage extends Component {
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

  _renderCurves(chargingCurves, loading) {
    const data = getChargingCurves(chargingCurves);

    return data.length > 0 ? (
      <ResponsiveContainer width={"100%"} height={window.innerHeight - 150}>
        <LineChart
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
          data={data} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="soc">
            <Label
              value="SOC (%)"
              position="bottom"
              style={{ textAnchor: "middle" }} />
          </XAxis>
          <YAxis dataKey="kw">
            <Label
              value="KW"
              position="left"
              angle={-90}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Legend wrapperStyle={{ bottom: -10 }} />
          {
            chargingCurves.map((c, index) => 
              <Line
                key={index}
                dataKey="kw"
                name={`${c.car.manufacturer} - ${c.car.model}`}
                type="monotone"
                stroke="#8884d8"
                activeDot={{ r: 8 }} />
            )
          }
        </LineChart>
      </ResponsiveContainer>
    ) : null
  }

  render() {
		return (
			<div className={s.container}>
				<div className={s.header}>
				  <h3> Charging Curves </h3>
				</div>
				<div className={s.body}>
					<ChargingCurvesContextConsumer>
						{
	            ({ chargingCurves, loading, error, acknowledgeError }) => { return error.state ? this._renderError(error, acknowledgeError) : this._renderCurves(chargingCurves, loading) }
	          }
	        </ChargingCurvesContextConsumer>
				</div>
			</div>
		)
  }
}

export default ChargingCurvesPage;


/*
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
    */