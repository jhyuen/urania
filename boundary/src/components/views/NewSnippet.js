import React, { Component } from 'react';
import Loader from '../elements/Loader';
import { Redirect } from 'react-router-dom';

class NewSnippet extends Component {
	state = {
			snippetId: "",
			redirect: false
	}
	
	componentDidMount() {
		this.fetchNewSnippetId()
		document.getElementById('lText').innerHTML = 'Creating New Snippet'
	}
	
	fetchNewSnippetId = async () => {
		var url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/new_snippet/"
		fetch(url, {
			method: 'POST',
			body: JSON.stringify()
		})
			.then(response => response.json())
			.then(responseData => {
				this.setState({snippetId: responseData.snippetId})
			})
			.then(responseData => {
				this.setState({redirect: true})}
			)
			.catch(error => {
		          console.log("error", error);
		          alert("An error occured, please try again later.");
		     });
	}
	
	render() {
		if (this.state.redirect === true) {
			return <Redirect to={{ pathname: '/'+ this.state.snippetId + '/creator' }} />
		} else {
			return <Loader/>
		}
	}
}

export default NewSnippet;
