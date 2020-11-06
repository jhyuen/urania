import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SnippetText.css';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/keybinding-vim";
import PropTypes from 'prop-types';


class SnippetText extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	value: ""
	    }
	    
	    this.updateSnippetText = this.updateSnippetText.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount() {
		this.setState({ value: this.props.text })
	}
	
	updateSnippetText = async () => {
		  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
		  var update_url = base_url + this.props.id + "/text";
		  fetch(update_url, {
			  method: 'POST',
			  body: JSON.stringify({text: this.state.value}),
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
	
	handleChange(newValue) {
	    this.setState({value: newValue})
	}
	   
	
	handleSubmit(event) {
	    event.preventDefault();
	    this.updateSnippetText();
	}
	
	render() {
		return(
			<>
			<div className="snippetTextHeader">
				<h2>Snippet</h2>
			</div>
			<div className="editor" id="aceEditor">
				<AceEditor 
					width={ '100%' }
					height={' 56vh '}
					onChange={this.handleChange}
					value={this.state.value}
					theme = 'monokai'
					mode = 'java'
          keyboardHandler= 'vim'
					setOptions={{
						highlightActiveLine: true,
						showPrintMargin: true,
						autoScrollEditorIntoView: true
					}}
				/>
			</div>
			<div className="snippetTextButton">
		  		<Button variant="primary" onClick={this.handleSubmit}>Save</Button>{' '}
			</div>
			</>
			
		)
	}
}

SnippetText.propTypes = {
		id : PropTypes.string.isRequired,
		text : PropTypes.string.isRequired
};

export default SnippetText;
