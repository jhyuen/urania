import React, { Component } from 'react';
import CommentPanel from '../elements/CommentPanel'
import SnippetText from '../elements/SnippetText.js';
import SnippetHeader from '../elements/SnippetHeader';
import CreatorSnippetInfo from '../elements/CreatorSnippetInfo';
import CreatorControlPanel from '../elements/CreatorControlPanel';

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
