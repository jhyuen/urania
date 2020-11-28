import React, { Component } from 'react';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import './SnippetInfo.css';

class CreatorControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	password_enable: this.props.password_status,
    	value: "",
        status: null
    }
    this.viewSnippet = this.viewSnippet.bind(this);
    this.setPasswordStatus = this.setPasswordStatus.bind(this);
    this.enableSnippetPassword = this.enableSnippetPassword.bind(this);
    this.updateSnippetInfo = this.updateSnippetInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
	  }).then(response => response.json())
		.then(responseData => {
			console.log(responseData.httpCode)
			if(responseData.httpCode === 200) {
      Swal.fire({
	      title: 'Success',
          html: 'Snippet Updated!',
          icon: 'success',
          background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
          backdrop: ` rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      left top
                      no-repeat`
      })} else {
	document.getElementById('root').innerHTML = <></>
      Swal.fire({
                 title: 'Snippet not found',
                 padding: '3em',
                 icon: 'error',
                 background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
                 backdrop: ` rgba(0,0,123,0.4)
                             url("https://media1.thehungryjpeg.com/thumbs2/ori_3674132_r92n1p85dw7wvbdno6ihpnhy2kprdtgnlm613jmk_seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand.jpg")
                             left top
                             repeat`,
                 showConfirmButton: false,
                 allowOutsideClick: false,
                 allowEscapeKey: false
            })
}
            return responseData.httpCode
		})
	    .catch(error => {
	      console.log("error", error);
	      alert("An error occured, please try again later.");
	    });
  }

  enableSnippetPassword = async (val) => {
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var update_url = base_url + this.props.id + "/set_password";
	  fetch(update_url, {
		  method: 'POST',
		  body: JSON.stringify({enable: val}),
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
		  }
	  }).then(response => response.json())
		.then(responseData => {
			console.log(responseData.httpCode)
			if(responseData.httpCode !== 200) {
        	   document.getElementById('root').innerHTML = <></>
      Swal.fire({
                 title: 'Snippet not found',
                 padding: '3em',
                 icon: 'error',
                 background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
                 backdrop: ` rgba(0,0,123,0.4)
                             url("https://media1.thehungryjpeg.com/thumbs2/ori_3674132_r92n1p85dw7wvbdno6ihpnhy2kprdtgnlm613jmk_seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand.jpg")
                             left top
                             repeat`,
                 showConfirmButton: false,
                 allowOutsideClick: false,
                 allowEscapeKey: false
            })
           }
        	return responseData.httpCode
		})
	    .catch(error => {
	      console.log("error", error);
	      alert("An error occured, please try again later.");
	    });
  }

  deleteSnippet = async () => {
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var update_url = base_url + this.props.id + "/delete_snippet";
	  fetch(update_url, {
		  method: 'POST',
		  //body: JSON.stringify({enable: val}),
		  //headers: {
			  //'Accept': 'application/json',
			  //'Content-Type': 'application/json'
		  //}
	  }).catch(error => {
	      console.log("error", error);
	      alert("An error occured, please try again later.");
	  });
  }

  handleDelete(event) {
	Swal.fire({
  title: 'Delete Confirmation',
  showDenyButton: true,
  showCancelButton: false,
  icon: 'warning',
  confirmButtonColor: '#d33',
  denyButtonColor: '#3085d6',
  html: 'Are you sure you want to delete the snippet?',
  confirmButtonText: `Yes, Delete`,
  background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
  denyButtonText: `No, Go Back`
}).then((result) => {
  if (result.isConfirmed) {
     this.deleteSnippet().then(this.successCallback, this.failureCallback);
  } 
})
   
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  successCallback() {
      document.getElementById('root').innerHTML = <></>
      Swal.fire({
                 title: 'Snippet deleted',
                 padding: '3em',
                 icon: 'success',
                 background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
                 backdrop: ` rgba(0,0,123,0.4)
                             url("https://media1.thehungryjpeg.com/thumbs2/ori_3674132_r92n1p85dw7wvbdno6ihpnhy2kprdtgnlm613jmk_seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand.jpg")
                             left top
                             repeat`,
                 showConfirmButton: false,
                 allowOutsideClick: false,
                 allowEscapeKey: false
            })
    }

   failureCallback() {
      Swal.fire({
	      title: 'Error',
          html: 'Unable to Delete Snippet',
          icon: 'error',
          background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
          backdrop: ` rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      left top
                      no-repeat`
      })
    }
   
  handleSubmit(event) {
    event.preventDefault();
    this.updateSnippetInfo()
  }

  fetchSnippet = async (id) => {
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var get_snippet_url = base_url + id + "/snippet"; 
	  var data = await fetch(get_snippet_url)
	  var snippetData = await data.json()
	  return snippetData.httpCode
	}

	render() {
		var timestampText 	= "Created on: ";
		var tempSecond = this.props.time
		var d = new Date(0)
		d.setUTCSeconds(tempSecond)
		if(this.state.status !== 400) {
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
					<Button className="actionButton" variant="primary">View as Viewer</Button>{' '}
				</Link>
					<Button className="actionButton" variant="info" onClick={this.viewSnippet}>View Snippet</Button>{' '}
				<Link to='/'>
					<Button className="actionButton" variant="success">Create New Snippet</Button>{' '}
				</Link>
				<Button className="actionButton" variant="danger" onClick={this.handleDelete}>Delete Snippet</Button>{' '}
				
			</>
		)}
		else {
			Swal.fire({
                 title: 'Snippet not found',
                 padding: '3em',
                 icon: 'error',
                 background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
                 backdrop: ` rgba(0,0,123,0.4)
                             url("https://media1.thehungryjpeg.com/thumbs2/ori_3674132_r92n1p85dw7wvbdno6ihpnhy2kprdtgnlm613jmk_seamless-night-sky-stars-pattern-sketch-moon-space-planets-and-hand.jpg")
                             left top
                             repeat`,
                 showConfirmButton: false,
                 allowOutsideClick: false,
                 allowEscapeKey: false
            })
           return <></>
		}
	};
	
	setPasswordStatus(event) {
		console.log("changed password status");
    this.enableSnippetPassword(event.target.checked)
    this.setState({ password_enable: event.target.checked})
	};
	
	viewSnippet() {    
		Swal.fire({
            title: 'Submit Snippet ID',
            input: 'text',
            padding: '3em',
            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
            inputAttributes: {
               autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (id) => {
	           return this.fetchSnippet(id).then(result => {
               		if (result === 201) {
	                	window.location.pathname = '/' + id;  
               		} else {
		                 Swal.showValidationMessage(
                             `Invalid Snippet ID. Try Again.`
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
    info        : PropTypes.string.isRequired,
    time            : PropTypes.number.isRequired
};

export default CreatorControlPanel;
