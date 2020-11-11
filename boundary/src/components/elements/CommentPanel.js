import React, { Component } from 'react';
import CommentList from './CommentList'
import CommentEnterArea from './CommentEnterArea.js'
import PropTypes from 'prop-types';
import './CommentPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

	delComment = (cID) => {
		var snippet = this.deleteCommentRequest(cID);
		console.log(snippet)
		this.setState({ comments: [...this.state.comments.filter(comment => comment.commentID !== cID)] });
	}
		
	addComment = async (text) => {
	    // check range
	    var selR = this.props.range
	    console.log(this.props.range)
	    if (((selR.start.row != selR.end.row) 
	    		|| (selR.start.column != selR.end.column))
	    		&& text != '') {
	      console.log("legal comment")
	      const newComment = {	
	          commentText	: text,
	          sL	: selR.start.row,
	          sI	: selR.start.column,
	          eL	: selR.end.row,
	          eI	: selR.end.column
	      }
	      var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	      var update_url = base_url + this.props.id + "/add_comment";
	
	      fetch(update_url, {
	        method: 'POST',
	        body: JSON.stringify(newComment),
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
	      })
	      .then(response => response.json())
	      .then(responseData => {
	    	  console.log(responseData)
	    	  console.log(responseData.list)
	    	  this.setState({ comments: responseData.list })
	      })
	      // Maybe need to change lambda to return a snippet with comment array
				//.then(responseData => {
					//this.props.snippetCallback(responseData)
				//})
	      .catch(error => {
	            console.log("error", error);
	            alert("An error occured, please try again later.");
	      });
	      
	      //this.setState({ comments: [...this.state.comments, newComment] });
	    }
		
	} 
	
	render() {
		return(
			<>
				<h2>Comments</h2>
				<CommentEnterArea addComment={ this.addComment } />
				<CommentList comments={ this.state.comments } delComment={ this.delComment }/>
			</>
		)
	}
}

export default CommentPanel;

CommentPanel.propTypes = {
  	id        	: PropTypes.string.isRequired,
	comments 	: PropTypes.array.isRequired,
}
