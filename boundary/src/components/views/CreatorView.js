import React, { Component } from 'react';
import CommentPanel from '../elements/CommentPanel'
import SnippetText from '../elements/SnippetText.js';
import SnippetHeader from '../elements/SnippetHeader';
import CreatorSnippetInfo from '../elements/CreatorSnippetInfo';
import CreatorControlPanel from '../elements/CreatorControlPanel';

class CreatorView extends Component {

	state = {
		snippet: {
			"snippetId": "loading snippet id...",
		 	"snippetText": "loading snippet text..",
		 	"snippetInfo": "loading snippet info...",
		 	"timeStamp": "loading timestamp...",
		 	"languageSelected": "loading language selected...",
		 	"viewerPassword": "loading viewer password...",
		 	"viewerPasswordStatus": "0",
		},
		dataFetched: false
	}
	
	componentDidMount() {
		var patt = /\/[^/]*/i
		var result = window.location.pathname.match(patt)
		this.fetchSnippet(result[0])
	}
	
	fetchSnippet = async (path) => {
		console.log("fetching")
		var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta";
	    var get_snippet_url = base_url + path + "/snippet"; 
		var data = await fetch(get_snippet_url)
		
		var snippetData = await data.json()
		this.setState({ snippet: snippetData, dataFetched : true })
		console.log(snippetData)
	}
	
	render() {
		if (this.state.dataFetched) {
			return(
					<div class="app">
						<div class="snippetHeader">
							<SnippetHeader timestamp={ "Oct. 27 11:30:03AM" } id={ this.state.snippet.snippetId } />
						</div>
						<div class="snippetText">
							<SnippetText />
						</div>
						<div class="commentPanel">
							<CommentPanel />
						</div>
						<div class="controlPanel">
							<CreatorControlPanel />
						</div>
						<div class="snippetInfo">
							<CreatorSnippetInfo info={this.state.snippet.snippetInfo} id={ this.state.snippet.snippetId } />
						</div>
					</div>
			)
		} else {
			return <p>Loading Snippet...</p>
		}
		
	}
}

export default CreatorView;
