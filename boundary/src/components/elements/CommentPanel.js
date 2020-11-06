import React, { Component } from 'react';
import './CommentPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from './Comments'
import AddComment from '../../controllers/AddComment.js'
import PropTypes from 'prop-types';

const { v4: uuidv4 } = require('uuid');	

class CommentPanel extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	comments: []
	    }
	}
	
	componentDidMount() {
		this.setState({ comments: this.props.comments })
    console.log(this.state.comments)
	}
	
	delComment = (id) => {
		this.setState({ comments: [...this.state.comments.filter(comment => comment.id !== id)] });
	}
		
	addComment = (text) => {
		const newComment = {	
				commentID				: uuidv4(),				// generate a random unique id
				timeStamp		: Date.now(),			// grab the current time
				commentText			: text,
				startLine		: 0,
				startIndex	: 0,
				endLine			: 0,
				endIndex	: 0
		}
		this.setState({ comments: [...this.state.comments, newComment] });
	} 
	
	render() {
		return(
			<>
				<h2>Comments</h2>
				<Comments comments={this.state.comments} delComment={ this.delComment }/>
				<AddComment addComment={ this.addComment } />
			</>
		)
	}
}

CommentPanel.propTypes = {
	comments 	: PropTypes.array.isRequired,
}

export default CommentPanel;
