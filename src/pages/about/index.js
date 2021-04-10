import React, { Component } from 'react';
import s from './styles.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AboutPage extends Component {
	constructor (props) {
		super(props);

		this.state = {
			showContactDialog: false
		}
	}

	_renderContactDialog () {
    const { showContactDialog } = this.state;

    return (
      <Dialog
        open={showContactDialog}
        onClose={() => { this.setState({ showContactDialog: false }) }}
        maxWidth={'md'}
        fullWidth={true} >
        <DialogTitle id="alert-dialog-title">Contact Getting EV</DialogTitle>
        <DialogContent className={s.dialogContent}>
        	<TextField required label="Email" placeholder="hi@gettingev.com" InputLabelProps={{ shrink: true }}/>
        	<TextField
        		className={s.message}
        		required
	          label="Message"
	          multiline
	          rows={6}
	          placeholder="Hi! I just wanted to say hello!"
	          InputLabelProps={{ shrink: true }}
	        />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { this.setState({ showContactDialog: false }) }} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { this.setState({ showContactDialog: false }) }} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
	}

  render() {
		return (
			<div className={s.container}>
				<div className={s.header}>
				  <h3> About </h3>
				</div>
				<div className={s.body}>
					<p> 
					{
						"Created with <3 by Shy, Tim, and Sam. We are car enthusiasts, but more specifically EV enthusiasts and have had a hard time finding a decent website that aggregated EV information without all that advertising fluff."
					}
					</p>
					<p> 
					{
						"This is an open source project! If you'd like to contribute / help out please reach out via github:"
					}
					</p>
					<div className={s.github}>
						<a href="https://github.com/shayan786/gettingev" target="_blank" rel="noopener noreferrer"> Github </a>
					</div>
					<Button
						color="primary"
						variant="contained"
						onClick={() => { window.location.href = "mailto:shayandhanani@gmail.com" }}>
            Contact Us
        	</Button>
        	<a href="https://gettingev.com/api/documentation/v1.0.0" target="_blank">
	        	<Button
	        		className={s.apiButton}
							variant="contained">
	            View API Docs
	        	</Button>
	        </a>
				</div>
			</div>
		)
  }
}

export default AboutPage;
