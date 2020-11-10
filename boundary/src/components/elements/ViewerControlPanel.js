import React, { Component } from 'react';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

class ViewerControlPanel extends Component {
	constructor(props) {
		super(props)
		this.updId 			= this.updId.bind(this);
		this.viewSnippet 	= this.viewSnippet.bind(this);
		this.state = {
			snippet: {
				 		"snippetId": "loading snippet id...",
				 		"snippetText": "loading snippet text..",
				 		"snippetInfo": "loading snippet info...",
				 		"timeStamp": "loading timestamp...",
				 		"languageSelected": "loading language selected...",
				 		"viewerPassword": "loading viewer password...",
				 		"viewerPasswordStatus": "0",
				 	 }
		}
	}
	
	componentDidMount() {
	}
	
	updId = (id) => {
		this.props.updSnippetIdCallback(id);
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
				<p>Role: Viewer</p>
				<p>{timestampText}<br></br>{d.toLocaleString()}</p>
				<br></br>
		        <div className='infoHeader'>
		        	<h2>Description</h2>
		        </div>
		        <div className='viewerText'>{ this.props.info }</div>
		        <br></br>
		        <h2>Actions</h2>
				<Button className="actionButton" variant="info" onClick={this.viewSnippet}>View Snippet</Button>{' '}
				<Link to='/'>
					<Button className="actionButton" variant="success">Create New Snippet</Button>{' '}
				</Link>
			</>
		)
	}
	
	viewSnippet() {
		Swal.fire({
            title: 'Submit Snippet ID',
            input: 'text',
            width: 600,
            padding: '3em',
            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
            inputAttributes: {
               autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (id) => {
	           let res = this.fetchSnippet(id).then(function(result) {
	               if(result === 201) {
		                 window.location.pathname = '/' + id;  
	               } else {
		                Swal.fire({
			                title: 'Error',
	                        html: 'Snippet not found',
	                        icon: 'error',
	                        width: 600,
	                        padding: '3em',
	                        background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)'
		                })
	               }	          
              })            	                 
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
	}
}

// validate prop types
ViewerControlPanel.propTypes = {
	updSnippetIdCallback 	: PropTypes.func.isRequired,
	time 					: PropTypes.number.isRequired
};

export default ViewerControlPanel;
