import React, { Component } from 'react';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as urls from '../../api.js';

class CreatorControlPanel extends Component {
	
	componentDidMount() { 
	}

	render() {
		return(
			<>
				<h1>Control Panel</h1>
				<p>Role: Creator</p>
				<div>
					<label>
						Enabled Viewer Password 
						<input onClick={this.setPasswordStatus} type="checkbox" />
					</label>
				</div>
				<p class="password">Autogenerated Password: </p>
				<ButtonGroup vertical>
					<Link to={'/'+this.props.id}>
						<Button variant="primary" onClick={this.viewAsViewer}>View as Viewer</Button>{' '}
					</Link>
					<Button variant="primary" onClick={this.viewSnippet}>Refresh Snippet</Button>{' '}
					<Link to='/'>
						<Button variant="primary">Create New Snippet</Button>{' '}
					</Link>
					<Button variant="primary" onClick={this.deleteSnippet}>Delete Snippet</Button>{' '}
				</ButtonGroup>

			</>
		)
	};
	
	setPasswordStatus() {
		console.log("changed password status");
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
		id : PropTypes.string.isRequired
};

export default CreatorControlPanel;
