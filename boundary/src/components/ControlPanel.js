import React, { Component } from 'react';
import './ControlPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class ControlPanel extends Component {
	state = {}
	render() {
		return(
			<>
				<h1>Control Panel</h1>
				<Button variant="primary" onClick={this.viewAsViewer}>View as Viewer</Button>{' '}
				<Button variant="primary" onClick={this.viewSnippet}>View another Snippet</Button>{' '}
				<Button variant="primary" onClick={this.createSnippet}>Create another Snippet</Button>{' '}
				<Button variant="primary" onClick={this.deleteSnippet}>Delete Snippet</Button>{' '}
			</>
		)
	}
	
	viewAsViewer() {
		console.log("view as viewer");
	}
	
	viewSnippet() {
		console.log("view snippet");
	}
	
	createSnippet() {
		console.log("created snippet");
	}
	
	deleteSnippet() {
		console.log("deleted snippet");
	}
}

export default ControlPanel;