import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SnippetText.css';
import "ace-builds/src-noconflict/theme-monokai";

class SnippetText extends Component {
	state = {}
	render() {
		return(
			<>
			<div class="snippetHeader">
				<h1>Snippet</h1>
				<div class="snippetTextBtns">
		  			<Button variant="success" onClick={this.save}>Save</Button>{' '}
		 			<Button variant="danger" onClick={this.cancel}>Cancel</Button>{' '}
		 			<Button variant="primary" onClick={this.edit}>Edit</Button>{' '}
				</div>
			</div>
			<div>
				<AceEditor
					theme="monokai"
					placeholder="Type in code to have a fun time"
				/>
			</div>
			</>
			
		)
	}
	
	save() {
		console.log("save");
	}
	
	cancel() {
		console.log("cancel");
	}
	
	edit() {
		console.log("edit");
	}
}

export default SnippetText;