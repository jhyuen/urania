import React, { Component } from 'react';
import './CommentPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import CommentHeader from './CommentHeader'
import Comments from './Comments'
import Comment from './Comment'
import AddComment from './../controllers/AddComment.js'

//uuidv4 generates random ids 
const { v4: uuidv4 } = require('uuid');	

// local storage key (DEBUG)
//const LOCAL_STORAGE_KEY = 'SnippetApp.comments'	

class CommentPanel extends Component {
	
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
		return(
			<>
				<CommentHeader />
				<Comments comments={this.state.comments} delComment={ this.delComment }/>
				<AddComment addComment={ this.addComment } />
			</>
		)
	}
	
}

export default CommentPanel;