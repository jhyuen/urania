import React, { Component } from 'react';
import CommentPanel from '../elements/CommentPanel'
import SnippetText from '../elements/SnippetText.js';
import SnippetHeader from '../elements/SnippetHeader';
import ViewerSnippetInfo from '../elements/ViewerSnippetInfo';
import ViewerControlPanel from '../elements/ViewerControlPanel';

class ViewerView extends Component {
	state = {
		snippetID: ""		
	}
	
	updSnippetIdCallback = (id) => {
		this.setState({snippetID : id});
	}

	render() {
		return(
			<div class="app">
				<div class="snippetHeader">
					<SnippetHeader timestamp={ "Oct. 27 11:30:03AM" } id={ this.state.snippetID } />
				</div>
				<div class="snippetText">
					<SnippetText />
				</div>
				<div class="commentPanel">
					<CommentPanel />
				</div>
				<div class="controlPanel">
					<ViewerControlPanel updSnippetIdCallback={this.updSnippetIdCallback} />
				</div>
				<div class="snippetInfo">
					<ViewerSnippetInfo />
				</div>
			</div>
		)
	}
}

export default ViewerView;
