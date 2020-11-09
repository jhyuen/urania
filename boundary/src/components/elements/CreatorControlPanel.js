import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

class CreatorControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	password_enable: this.props.password_status,
    	value: ""
    }
    this.viewSnippet = this.viewSnippet.bind(this);
    this.setPasswordStatus = this.setPasswordStatus.bind(this);
    this.enableSnippetPassword = this.enableSnippetPassword.bind(this);
    this.updateSnippetInfo = this.updateSnippetInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
	  this.setState({ password_enable: this.props.password_status })
	  this.setState({ value: this.props.info })
  }
  
  updateSnippetInfo = async () => {
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var update_url = base_url + this.props.id + "/info";
	  fetch(update_url, {
		  method: 'POST',
		  body: JSON.stringify({info: this.state.value}),
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
		  }
	  })
	    .catch(error => {
	      console.log("error", error);
	      alert("An error occured, please try again later.");
	    });
  }

  enableSnippetPassword = async (val) => {
    console.log(val)
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var update_url = base_url + this.props.id + "/set_password";
	  fetch(update_url, {
		  method: 'POST',
		  body: JSON.stringify({enable: val}),
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
		  }
	  })
	    .catch(error => {
	      console.log("error", error);
	      alert("An error occured, please try again later.");
	    });
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
   
  handleSubmit(event) {
    event.preventDefault();
    this.updateSnippetInfo();
    /*{alert('Snippet Info was updated' + this.state.value);}*/
  }

  fetchSnippet = async (id) => {
		var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	    var get_snippet_url = base_url + id + "/snippet"; 
		var data = await fetch(get_snippet_url)
		
		var snippetData = await data.json()
		console.log(snippetData)
        return snippetData.httpCode
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
				<p>{timestampText}<br></br>{d.toLocaleString()}</p>
				<div>
					<label>
						Enabled Viewer Password &nbsp;
						<input defaultChecked={this.state.password_enable} onChange={this.setPasswordStatus} type="checkbox" />
					</label>
				</div>
		        <div>
		        {this.state.password_enable ?
		          <div>
		            <p className="password">Autogenerated Password: <br />{this.props.password}</p>
		          </div>
		          : <br></br>}
		        </div>
			        <div className='infoHeader'>
			        	<h2>Description</h2>
			        </div>
			        <form className='infoTextArea' id='infoForm' onSubmit={this.handleSubmit}>
			        	<textarea className='infoArea' placeholder="Add snippet description and don't forget to save..." value = {this.state.value} onChange={this.handleChange}/>
			        </form>
			        <Button className='submitButton' type='submit' form='infoForm' variant="primary">Save</Button>{' '}
		        <br></br>
		        <br></br>
		        <h2>Actions</h2>
				<Link to={'/'+this.props.id}>
					<Button className="actionButton" variant="primary" onClick={this.viewAsViewer}>View as Viewer</Button>{' '}
				</Link>
				<Link>
					<Button className="actionButton" variant="info" onClick={this.viewSnippet}>View Snippet</Button>{' '}
				</Link>
				<Link to='/'>
					<Button className="actionButton" variant="success">Create New Snippet</Button>{' '}
				</Link>
				<Link>
					<Button className="actionButton" variant="danger" onClick={this.deleteSnippet}>Delete Snippet</Button>{' '}
				</Link>
			</>
		)
	};
	
	setPasswordStatus(event) {
		console.log("changed password status");
    this.enableSnippetPassword(event.target.checked)
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
	
	viewSnippet() {    
		Swal.fire({
            title: 'Submit Snippet ID',
            input: 'text',
            inputAttributes: {
               autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (id) => {
	           let res = this.fetchSnippet(id).then(function(result) {
		             if(result == 201) {
	                window.location.pathname = '/' + id + '/creator';  
               } else {
	                Swal.fire(
		                'Error',
                        'Snippet not found',
                        'error'
	                )
               }	          
              })            	                 
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
	}
}

CreatorControlPanel.propTypes = {
	  id              : PropTypes.string.isRequired,
    password_status : PropTypes.bool.isRequired,
    password        : PropTypes.string.isRequired,
    time            : PropTypes.number.isRequired
};

export default CreatorControlPanel;
