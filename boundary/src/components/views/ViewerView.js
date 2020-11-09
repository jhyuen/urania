import React, { Component } from 'react';
import CommentPanel from '../elements/CommentPanel'
import SnippetText from '../elements/SnippetText.js';
import SnippetHeader from '../elements/SnippetHeader';
import ViewerSnippetInfo from '../elements/ViewerSnippetInfo';
import ViewerControlPanel from '../elements/ViewerControlPanel';

class ViewerView extends Component {
	
	state = {
		snippet: {
			"snippetId": "loading snippet id...",
	 		"snippetText": "loading snippet text..",		 		
	 		"snippetInfo": "loading snippet info...",
		 	"timeStamp": "loading timestamp...",
		 	"languageSelected": "loading language selected...",
		 	"viewerPassword": "loading viewer password...",
		 	"viewerPasswordStatus": "0",
			"list": []
		},
		dataFetched: false
	}
	
	updSnippetIdCallback = (id) => {
		this.setState({snippetId : id});
	}
	
	componentDidMount() {
		var patt = /\/[^/]*/i
		var result = window.location.pathname.match(patt)
		this.fetchSnippet(result[0])
	}
	
	fetchSnippet = async (path) => {
		var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta";
	    var get_snippet_url = base_url + path + "/snippet"; 
		var data = await fetch(get_snippet_url)
		
		var snippetData = await data.json()
		this.setState({ snippet: snippetData, dataFetched : true  })
	}

	render() {
		if (this.state.dataFetched) {
			return(
				<div className="app">
					<div className="snippetHeader">
						<SnippetHeader time={ this.state.snippet.timeStamp.epochSecond } id={ this.state.snippet.snippetId } />
					</div>
					<div className="snippetText">
						<SnippetText id={this.state.snippet.snippetId}
                           text={this.state.snippet.snippetText}
                           comments={this.state.snippet.list}/>
					</div>
					<div className="commentPanel">
						<CommentPanel comments={this.state.snippet.list}/>
					</div>
					<div className="controlPanel">
						<ViewerControlPanel time={ this.state.snippet.timeStamp.epochSecond } 
											updSnippetIdCallback={ this.updSnippetIdCallback } 
											info={ this.state.snippet.snippetInfo }/>
					</div>
				</div>
			)
		} else {
			return <h1>Loading Snippet...</h1>
		}
	}
}

export default ViewerView;
