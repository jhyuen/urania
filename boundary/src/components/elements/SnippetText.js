import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap'
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SnippetText.css';
import "ace-builds/src-noconflict/theme-monokai";
// coding languages
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
// ace editor modes
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-sublime";

class SnippetText extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	value						: "",
	    	dropDownLanguageValue		: 'Java',
			textEditorLanguageMode		: 'java',
	    	dropDownEditorModeValue		: 'Sublime',
			textEditorKeyboardHandler	: 'sublime',
	    	markers						: []
	    }
	    
	    this.updateSnippetText = this.updateSnippetText.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleTextSelection = this.handleTextSelection.bind(this);
	}
	
	componentDidMount() {
	    let newMarkers = []
	    this.props.comments.map((comment) => (
	      newMarkers.push({startRow		: comment.startLine,
	                       startCol		: comment.startIndex,
	                       endRow		: comment.endLine,
	                       endCol		: comment.endIndex,
	                       className	: "highlight",
	                       type			: "text" })
		));
		this.setState({ value: this.props.text, markers: newMarkers })
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		let newMarkers = []
		nextProps.comments.map((comment) => {
			if (nextProps.selectedCommentId == comment.commentID) {
				console.log(nextProps.selectedCommentId)
				newMarkers.push({ 
					startRow		: comment.startLine,
				    startCol		: comment.startIndex,
				    endRow			: comment.endLine,
				    endCol			: comment.endIndex,
				    className		: "selectedHighlight",
				    type			: "text" })
			} else {
				newMarkers.push({
					startRow		: comment.startLine,
                    startCol		: comment.startIndex,
                    endRow			: comment.endLine,
                    endCol			: comment.endIndex,
                    className		: "highlight",
                    type			: "text" })
			}     
		})	
		return { markers: newMarkers };
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

	setJava() {
	    this.setState({ dropDownLanguageValue: 'Java' })
		this.setState({ textEditorLanguageMode: 'java' })
	}
	
	setPython() {
	    this.setState({ dropDownLanguageValue: 'Python' })
		this.setState({ textEditorLanguageMode: 'python' })
	}
	
	setCpp() {
	    this.setState({ dropDownLanguageValue: 'C++' })
		this.setState({ textEditorLanguageMode: 'c_cpp' })
	}
	
	setSublime() {
	    this.setState({ dropDownEditorModeValue: 'Sublime' })
		this.setState({ textEditorKeyboardHandler: 'sublime' })
	}
	
	setVim() {
	    this.setState({ dropDownEditorModeValue: 'Vim' })
		this.setState({ textEditorKeyboardHandler: 'vim' })
	}
	
	setEmacs() {
	    this.setState({ dropDownEditorModeValue: 'Emacs' })
		this.setState({ textEditorKeyboardHandler: 'emacs' })
	}
	
	changeSelectionValue(text) {
		this.setState({codingTypeValue: text})
	}
	
	handleChange(newValue) {
		this.setState({value: newValue})
        this.props.updTextCallback(newValue)
	}

  handleTextSelection(selection) {
    this.props.selectionCallback(selection.getRange())
  }
	   
	successCallback() {
      Swal.fire({
	      title: 'Success',
          html: 'Snippet Updated!',
          icon: 'success',
          background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
          backdrop: ` rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      left top
                      no-repeat`
      })
    }

    failureCallback() {
      Swal.fire({
	      title: 'Error',
          html: 'Unable to Update Snippet',
          icon: 'error',
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
          backdrop: ` rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      left top
                      no-repeat`
      })
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
							{this.state.dropDownLanguageValue}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Header>Coding Language</Dropdown.Header>
							<Dropdown.Divider />
							<Dropdown.Item as="button"><div onClick={() => this.setJava()}>Java</div></Dropdown.Item>
							<Dropdown.Item as="button"><div onClick={() => this.setPython()}>Python</div></Dropdown.Item>
							<Dropdown.Item as="button"><div onClick={() => this.setCpp()}>C++</div></Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown size="sm">
					<Dropdown.Toggle variant="info" id="dropdown-editor-mode">
						{this.state.dropDownEditorModeValue}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Header>Editor Mode</Dropdown.Header>
						<Dropdown.Divider />
						<Dropdown.Item as="button"><div onClick={ () => this.setSublime() }>Sublime</div></Dropdown.Item>
						<Dropdown.Item as="button"><div onClick={ () => this.setVim() }>Vim</div></Dropdown.Item>
						<Dropdown.Item as="button"><div onClick={ () => this.setEmacs() }>Emacs</div></Dropdown.Item>
					</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<div className="editor" id="aceEditor">
				<AceEditor 
					width				= { '100%' }
					height				= { '84.2vh' }
					onChange			= { this.handleChange }
					onSelectionChange   = { this.handleTextSelection }
					value				= { this.state.value }
                    markers				= { this.state.markers }
					mode 				= { this.state.textEditorLanguageMode }
					keyboardHandler 	= { this.state.textEditorKeyboardHandler }
					theme 				= 'monokai'
					setOptions			={{
						highlightActiveLine			: true,
						showPrintMargin				: true,
						autoScrollEditorIntoView	: true
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
        comments : PropTypes.array.isRequired,
        selectedCommentId : PropTypes.string.isRequired
};

export default SnippetText;
