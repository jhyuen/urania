import React, { Component } from 'react';
import CommentHeader from './components/layout/CommentHeader'
import Comments from './components/Comments'
import AddComment from './controllers/AddComment'
import './App.css';
import SnippetText from './components/SnippetText.js';
import SnippetHeader from './components/SnippetHeader';
import SnippetInfo from './components/SnippetInfo';
import ControlPanel from './components/ControlPanel';


// uuidv4 generates random ids 
const { v4: uuidv4 } = require('uuid');	

// local storage key (DEBUG)
//const LOCAL_STORAGE_KEY = 'SnippetApp.comments'			

class App extends Component {
	state = {
		comments:[]
		//comments: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))	// DEBUG
	}
	
	// delete comment
	delComment = (id) => {
		this.setState({ comments: [...this.state.comments.filter(comment => comment.id !== id)] });
		//localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...this.state.comments.filter(comment => comment.id !== id)]));	// DEBUG
	}
	
	// add comment
	addComment = (text) => {
		const newComment = {	
				id				: uuidv4(),				// generate a random unique id
				timestamp		: Date.now(),		// grab the current time
				text			: text,
				startLine		: 0,
				startCharIndex	: 0,
				endLine			: 0,
				endCharIndex	: 0
		}
		this.setState({ comments: [...this.state.comments, newComment] });
		//localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...this.state.comments, newComment]));	// DEBUG
		//console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(this.timestamp));
	} 
	
	render() {
		return (
			<div class="app">
				<div class="snippetHeader">
					<SnippetHeader />
				</div>
				<div class="snippetText">
					<SnippetText />
				</div>
				<div class="comments" className="container">
					<CommentHeader />
					<Comments comments={this.state.comments} delComment={ this.delComment }/>
					<AddComment addComment={ this.addComment } />
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
