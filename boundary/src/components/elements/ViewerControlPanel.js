import React, { Component } from 'react';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import * as urls from '../../api.js';

class ViewerControlPanel extends Component {
	constructor(props) {
		super(props)
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
		this.fetchItems()
		console.log("I mounted") 
	}
	
	componentDidUpdate() {
		console.log("I updated")
	}
	
	
    
    
	fetchItems = async () => {
		console.log("fetching")
		var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	    var tempID = "abcd123/"
	    //var tempID = this.props.snippetId	
	    var get_snippet_url = base_url + tempID + "snippet"; 
		var data = await fetch(get_snippet_url)
		
		var snippetData = await data.json()
		this.setState({ snippet: snippetData })
		console.log(snippetData)
	}
	
	render() {
		return(
			<>
				<h1>Control Panel</h1>
				<p>Role: Viewer</p>
				<p class="password">Autogenerated Password: 1234</p>
				<ButtonGroup vertical>
					<Button variant="primary" onClick={this.viewSnippet}>View another Snippet</Button>{' '}
					<Button variant="primary" onClick={this.createSnippet}>Create another Snippet</Button>{' '}
				</ButtonGroup>
				
				<p>{this.state.snippet.snippetId}</p>
				<p>{this.state.snippet.snippetText}</p>
				<p>{this.state.snippet.snippetInfo}</p>
				<p>{this.state.snippet.languageSelected}</p>
				<p>{this.state.snippet.viewerPassword}</p>
				<p>{this.state.snippet.viewerPasswordStatus}</p>
			</>
		)
	}
	
	setPasswordStatus() {
		console.log("changed password status");
	}
	
	
	viewAsViewer() {
		console.log("view as viewer");
	}
	
	viewSnippet() {
		console.log("view snippet");
	    const base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
        const tempID = "abcd123/"
	    const get_snippet_url = base_url + tempID + "snippet";    // GET
	    console.log(get_snippet_url);
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", get_snippet_url, true);
	    var sender = JSON.stringify();
		xhr.send(sender);

      console.log("sent");
      // This will process results and update HTML as appropriate.
      xhr.onloadend = function () {
	      if (xhr.readyState === XMLHttpRequest.DONE) {
	          console.log ("XHR: " + xhr.responseText);
	          var js = JSON.parse(xhr.responseText);
	          var snippetID = js["snippetId"];
	          var snippetText = js["snippetText"];
	          var snippetInfo = js["snippetInfo"];
	          console.log ("Got snippet: " + snippetID);
            console.log ("Text: " + snippetText);
            console.log ("Info: " + snippetInfo);
        } else {
          console.log("actual: " + xhr.responseText);
          var js = JSON.parse(xhr.responseText);
          var err = js["response"];
          alert (err);
	    }
      }
	}
	
	createSnippet() {
	    const base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	    const create_snippet_url = base_url + "new_snippet";    // POST
	    console.log(create_snippet_url);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", create_snippet_url, true);
	
	    var sender = JSON.stringify();
	    xhr.send(sender);
	    
	    // Process the results and update the HTML as appropriate.
	    xhr.onloadend = function() {
	      console.log(xhr);
	      console.log(xhr.request);
	      if (xhr.readyState === XMLHttpRequest.DONE) {
	        if (xhr.status === 201) {
	          console.log ("XHR: " + xhr.responseText);
	          var js = JSON.parse(xhr.responseText);
	          var snippetID = js["snippetId"];
	          console.log ("Created a new snippet: " + snippetID);
	        } else {
	          console.log("actual: " + xhr.responseText);
	          var js = JSON.parse(xhr.responseText);
	          var err = js["response"];
	          alert (err);
	        }
	      }
	    }
		
	    console.log("created snippet");
	}
	
	deleteSnippet() {
		console.log("deleted snippet");
	}
}

export default ViewerControlPanel;
