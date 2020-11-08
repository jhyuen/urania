import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SnippetText.css';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/keybinding-vim";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

class SnippetText extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	value: "",
        markers: []
	    }
	    
	    this.updateSnippetText = this.updateSnippetText.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount() {
    let newMarkers = []
		this.props.comments.map((comment) => (
      newMarkers.push({startRow:  comment.startLine,
                       startCol:  comment.startIndex,
                       endRow:    comment.endLine,
                       endCol:    comment.endIndex,
                       className: "highlight",
                       type:      "text" })
		));
		this.setState({ value: this.props.text,
                    markers: newMarkers })
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
	   
	successCallback(result) {
      Swal.fire(
	      'Success',
          'Snippet Updated!',
          'success' 
      )
    }

    failureCallback(result) {
      Swal.fire(
	      'Error',
          'Unable to Update Snippet',
          'error' 
      )
    }

	handleSubmit(event) {
	    event.preventDefault();
	    this.updateSnippetText().then(this.successCallback, this.failureCallback);  
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
          markers={this.state.markers}
					theme = 'monokai'
					mode = 'java'
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
		id :       PropTypes.string.isRequired,
		text :     PropTypes.string.isRequired,
    comments : PropTypes.array.isRequired
};

export default SnippetText;
