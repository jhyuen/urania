import React, { Component } from 'react';
import './CommentPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from './Comments'
import AddComment from '../../controllers/AddComment.js'

const { v4: uuidv4 } = require('uuid');	

class CommentPanel extends Component {
	
	state = {
		comments:[]
	}
	
	delComment = (id) => {
		this.setState({ comments: [...this.state.comments.filter(comment => comment.id !== id)] });
	}
		
	addComment = (text) => {
		const newComment = {	
				id				: uuidv4(),				// generate a random unique id
				timestamp		: Date.now(),			// grab the current time
				text			: text,
				startLine		: 0,
				startCharIndex	: 0,
				endLine			: 0,
				endCharIndex	: 0
		}
		this.setState({ comments: [...this.state.comments, newComment] });
	} 
	
	render() {
		return(
			<>
				<h2>Comments</h2>
				<AddComment addComment={ this.addComment } />
				<Comments comments={ this.state.comments } delComment={ this.delComment }/>
			</>
		)
	}
}

export default CommentPanel;