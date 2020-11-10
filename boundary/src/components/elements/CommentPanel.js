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

	    this.deleteCommentRequest = this.deleteCommentRequest.bind(this);
	}
	
	componentDidMount() {
		this.setState({ comments: this.props.comments })
    console.log(this.state.comments)
	}

	deleteCommentRequest = async (cID) => {
    console.log(this.props.id)
    console.log(cID)
    var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
    var update_url = base_url + this.props.id + "/delete_comment";
		fetch(update_url, {
			method: 'POST',
      body: JSON.stringify({ commentID : cID }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
		})
			.then(response => response.json())
			.then(responseData => {
				console.log(responseData.snippetId)
				console.log(responseData)
        return responseData
			})
			.catch(error => {
		          console.log("error", error);
		          alert("An error occured, please try again later.");
		     });

	}

	delComment = (id) => {
	  var snippet = this.deleteCommentRequest(id);
    console.log(snippet)
		this.setState({ comments: [...this.state.comments.filter(comment => comment.commentID !== id)] });
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
				<AddComment addComment={ this.addComment } />
				<Comments comments={ this.state.comments } delComment={ this.delComment }/>
			</>
		)
	}
}

export default CommentPanel;

CommentPanel.propTypes = {
  	id        	: PropTypes.string.isRequired,
	comments 	: PropTypes.array.isRequired,
}
