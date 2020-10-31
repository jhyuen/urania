import React, { Component } from 'react';
import CommentPanel from '../elements/CommentPanel'
import SnippetText from '../elements/SnippetText.js';
import SnippetHeader from '../elements/SnippetHeader';
import CreatorSnippetInfo from '../elements/CreatorSnippetInfo';
import CreatorControlPanel from '../elements/CreatorControlPanel';

class CreatorView extends Component {
	state = {}
	
	componentDidMount() {
		this.fetchItems()
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
			<div class="app">
				<div class="snippetHeader">
					<SnippetHeader />
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
					<CreatorSnippetInfo />
				</div>
			</div>
		)
	}
}

export default CreatorView;
