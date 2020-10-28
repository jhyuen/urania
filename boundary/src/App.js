import React, { Component } from 'react';
import './App.css';
import CommentPanel from './components/CommentPanel'
import SnippetText from './components/SnippetText.js';
import SnippetHeader from './components/SnippetHeader';
import SnippetInfo from './components/SnippetInfo';
import ControlPanel from './components/ControlPanel';		

class App extends Component {
	state = {}
	
	render() {
		return (
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
					<ControlPanel />
				</div>
				<div class="snippetInfo">
					<SnippetInfo />
				</div>
			</div>
		);
	}
}

export default App;
