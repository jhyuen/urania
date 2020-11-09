import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SnippetText.css';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-emacs";
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap'
import Swal from "sweetalert2";

class SnippetText extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	value: "",
	    	dropDownValue: "Java",
	    	codingTypeValue: "vim",
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
		this.setState({ value: this.props.text, markers: newMarkers
                    })
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
	
	changeValue(text) {
	    this.setState({dropDownValue: text})
	}
	
	changeSelectionValue(text) {
		this.setState({codingTypeValue: text})
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
				<div className="leftFloat">
					<h2>Snippet</h2>
				</div>
				<div className="rightFloat">
					<Button className="snippetTextButton rightish" variant="primary" onClick={this.handleSubmit}>Save</Button>{' '}
					<Dropdown size="sm">
						<Dropdown.Toggle variant="success" id="dropdown-coding-language">
							{this.state.dropDownValue}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Header> Select Coding Language</Dropdown.Header>
							<Dropdown.Divider />
							<Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}> Java </div></Dropdown.Item>
							<Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}> Python </div></Dropdown.Item>
							<Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}> C++ </div></Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					
					<Dropdown size="sm">
					<Dropdown.Toggle variant="info" id="dropdown-selection-type">
						{this.state.codingTypeValue}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Header> Select Selection Type</Dropdown.Header>
						<Dropdown.Divider />
						<Dropdown.Item as="button"><div onClick={(e) => this.changeSelectionValue(e.target.textContent)}> vim </div></Dropdown.Item>
						<Dropdown.Item as="button"><div onClick={(e) => this.changeSelectionValue(e.target.textContent)}> emacs </div></Dropdown.Item>
						<Dropdown.Item as="button"><div onClick={(e) => this.changeSelectionValue(e.target.textContent)}> normal </div></Dropdown.Item>
					</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<div className="editor" id="aceEditor">
				<AceEditor 
					width={ '100%' }
					height={' 67.8vh '}
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
