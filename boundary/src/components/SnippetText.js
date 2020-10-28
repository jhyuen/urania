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
			<div class="snippetTextHeader">
				<h1>Snippet</h1>
				<div class="snippetTextBtns">
		  			<Button variant="primary" onClick={this.save}>Save</Button>{' '}
				</div>
			</div>
			<div class="editor">
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
}

export default SnippetText;