import React, { Component } from 'react';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ViewerControlPanel extends Component {
	constructor(props) {
		super(props)
		this.updId 			= this.updId.bind(this);
		this.viewAnotherSnippet 	= this.viewAnotherSnippet.bind(this);
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
		        <Link>
					<Button className="actionButton" variant="info" onClick={this.viewAnotherSnippet}>View Snippet</Button>{' '}
				</Link>
				<Link to='/'>
					<Button className="actionButton" variant="success">Create New Snippet</Button>{' '}
				</Link>
			</>
		)
	}
	
	viewAnotherSnippet() {
		console.log("yiii");
	}
}

// validate prop types
ViewerControlPanel.propTypes = {
	updSnippetIdCallback 	: PropTypes.func.isRequired,
	time : PropTypes.number.isRequired
};

export default ViewerControlPanel;
