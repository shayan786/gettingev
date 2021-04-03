import React, { Component } from 'react';
import s from './styles.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { ResourcesContextConsumer } from '../../contexts/resources.js';

class ResourcesPage extends Component {
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

  _renderResources(resources, loading) {
  	return (
  		<div className={s.resources}>
  			{ resources.map((r, index) => 
  				<div key={index} className={s.resource}>
		        <h4>{r.title}</h4>
		        <a href={r.url} target="_blank" rel="noopener noreferrer">{r.url} </a>
		      </div>
  			)}
	    </div>
  	);
  }

  render() {
		return (
			<div className={s.container}>
				<div className={s.header}>
				  <h3> Useful Resources </h3>
				</div>
				<div className={s.body}>
					<ResourcesContextConsumer>
						{
	            ({ resources, loading, error, acknowledgeError }) => { return error.state ? this._renderError(error, acknowledgeError) : this._renderResources(resources, loading) }
	          }
	        </ResourcesContextConsumer>
				</div>
			</div>
		)
  }
}

export default ResourcesPage;
