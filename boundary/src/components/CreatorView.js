import React, { Component } from 'react';
import CommentPanel from './CommentPanel'
import SnippetText from './SnippetText.js';
import SnippetHeader from './SnippetHeader';
import CreatorSnippetInfo from './CreatorSnippetInfo';
import CreatorControlPanel from './CreatorControlPanel';


class CreatorView extends Component {
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
