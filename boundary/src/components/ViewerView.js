import React, { Component } from 'react';
import CommentPanel from './CommentPanel'
import SnippetText from './SnippetText.js';
import SnippetHeader from './SnippetHeader';
import ViewerSnippetInfo from './ViewerSnippetInfo';
import ViewerControlPanel from './ViewerControlPanel';


class ViewerView extends Component {
	state = {}
	
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
					<ViewerControlPanel />
				</div>
				<div class="snippetInfo">
					<ViewerSnippetInfo />
				</div>
			</div>
		)
	}
}

export default ViewerView;
