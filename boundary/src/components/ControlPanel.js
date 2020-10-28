import React, { Component } from 'react';
import './ControlPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import * as urls from '../api.js';

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
    const base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
    const create_snippet_url = base_url + "new_snippet";    // POST
    console.log(create_snippet_url);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", create_snippet_url, true);

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

export default ControlPanel;
