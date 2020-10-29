import React, { Component } from 'react';
import './ControlPanel.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import * as urls from '../../api.js';

class CreatorControlPanel extends Component {
	state = {}
	
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
				<p class="password">Autogenerated Password: 1234</p>
				<ButtonGroup vertical>
					<Button variant="primary" onClick={this.viewAsViewer}>View as Viewer</Button>{' '}
					<Button variant="primary" onClick={this.viewSnippet}>Refresh Snippet</Button>{' '}
					<Button variant="primary" onClick={this.createSnippet}>Create another Snippet</Button>{' '}
					<Button variant="primary" onClick={this.deleteSnippet}>Delete Snippet</Button>{' '}
				</ButtonGroup>
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
      xhr.send();

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

export default CreatorControlPanel;
