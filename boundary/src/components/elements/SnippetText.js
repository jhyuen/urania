import React, { Component } from 'react';
import AceEditor from 'react-ace';
import ace from 'ace-builds'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SnippetText.css';
import "ace-builds/src-noconflict/theme-monokai";


class SnippetText extends Component {

	componentDidMount() {
		let editor = ace.edit("aceEditor");
		editor.setValue(this.props.text);
	}
	
	render() {
		
		return(
			<>
			<div class="snippetTextHeader">
				<h1>Snippet</h1>
				
			</div>
			<div class="editor" id="aceEditor">
				<AceEditor
					theme="monokai"
					placeholder="Type in code to have a fun time"
				/>
			</div>
			<div class="snippetTextButton">
		  		<Button variant="primary" onClick={this.save}>Save</Button>{' '}
			</div>
			</>
			
		)
	}
	
	save() {
		console.log("save");
	}
}

export default SnippetText;