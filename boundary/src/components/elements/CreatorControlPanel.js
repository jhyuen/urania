import React, { Component } from 'react';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CreatorControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	password_enable: false
    }
    
    this.setPasswordStatus = this.setPasswordStatus.bind(this);
  }

  componentDidMount() {
	  this.setState({ password_enable: this.props.password_status })
  }

	render() {
		var timestampText 	= "Created on: ";
		
		var tempSecond = this.props.time
		var d = new Date(0)
		d.setUTCSeconds(tempSecond)
		return(
			<>
				<h2>Information</h2>
				<p>Role: Creator</p>
				<h5>{timestampText}{d.toLocaleString()}</h5>
				<div>
					<label>
						Enabled Viewer Password 
						<input onChange={this.setPasswordStatus} type="checkbox" />
					</label>
				</div>
        <div>
        {this.state.password_enable ?
          <div>
            <p className="password">Autogenerated Password: <br />{this.props.password}</p>
          </div>
          : null}
        </div>
				<ButtonGroup vertical>
					<Link to={'/'+this.props.id}>
						<Button variant="primary" onClick={this.viewAsViewer}>View as Viewer</Button>{' '}
					</Link>
					<Button variant="primary" onClick={this.viewSnippet}>View Snippet</Button>{' '}
					<Link to='/'>
						<Button variant="primary">Create New Snippet</Button>{' '}
					</Link>
					<Button variant="primary" onClick={this.deleteSnippet}>Delete Snippet</Button>{' '}
				</ButtonGroup>

			</>
		)
	};
	
	setPasswordStatus(event) {
		console.log("changed password status");
    this.setState({ password_enable: event.target.checked})
    {/**var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
    var update_url = base_url + this.props.id + "/passwordEnable";
	  fetch(update_url, {
		  method: 'POST',
		  body: JSON.stringify({info: this.state.password_enable}),
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
      }
    })
    .catch(error => {
      console.log("error", error);
      alert("An error occured, please try again later.");
    });**/}
	};
	
	
	viewAsViewer() {
		console.log("view as viewer");
	};
	
	viewSnippet() {
	}
	
	deleteSnippet() {
		console.log("deleted snippet");
	};
}

CreatorControlPanel.propTypes = {
	id :              PropTypes.string.isRequired,
    password_status : PropTypes.bool.isRequired,
    password :        PropTypes.string.isRequired,
    time : PropTypes.number.isRequired
};

export default CreatorControlPanel;
