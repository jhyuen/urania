import React, { Component } from 'react';
import CommentList from './CommentList'
import CommentEnterArea from './CommentEnterArea.js'
import PropTypes from 'prop-types';
import './CommentPanel.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";


class CommentPanel extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	comments: [],
	    	selectedCommentId: ''
	    }
	    this.deleteCommentRequest = this.deleteCommentRequest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.addComment = this.addComment.bind(this);
	}
	
	componentDidMount() {
		this.setState({ comments: this.props.comments })
		
	}
	
	successCallback(text, selR) {
      Swal.fire({
	      title: 'Success',
          html: 'Snippet Updated!',
          icon: 'success',
          background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
          backdrop: ` rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      left top
                      no-repeat`
      }).then(()=> {
	       this.addComment(text, selR)
      })
    }

    failureCallback() {
      Swal.fire({
	      title: 'Error',
          html: 'Unable to Update Snippet',
          icon: 'error',
          background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
          backdrop: ` rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      left top
                      no-repeat`
      })
    }
	
	handleSubmit(text, selR) {
	    this.updateSnippetText().then(this.successCallback(text, selR), this.failureCallback);  
	}
	
	updateSnippetText = async () => {
		  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
		  var update_url = base_url + this.props.id + "/text";
		  fetch(update_url, {
			  method: 'POST',
			  body: JSON.stringify({text: this.props.text}),
			  headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
			  }
		  })
		    .catch(error => {
		      console.log("error", error);
		      alert("An error occured, please try again later.");
		    });
	}

    fetchSnippet = async () => {
		var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	    var get_snippet_url = base_url + this.props.id + "/snippet"; 
		var data = await fetch(get_snippet_url)
		var snippetData = await data.json()
		return snippetData.snippetText
		//console.log(snippetData.viewerPasswordStatus)
	}
	
	deleteCommentRequest = async (cID) => {
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
			//console.log(responseData.snippetId)
			//console.log(responseData)
			this.props.commentCallback(responseData.list)
        	return responseData
		})
		.catch(error => {
			console.log("error", error);
			alert("An error occured, please try again later.");
	     });
	}
	
	identifyCommentRequest(cID) {
		this.props.selectedCommentIdCallback(cID)
	}
	
	handleTextSelection(selection) {
      this.props.selectionCallback(selection.getRange())
    }

	delComment = (cID) => {
		this.deleteCommentRequest(cID);
		this.setState({ comments: [...this.state.comments.filter(comment => comment.commentID !== cID)] });
	}
	
	identifyComment = (cID) =>  {
		console.log(cID)
		this.setState({ selectedCommentId : cID })
		this.identifyCommentRequest(cID);
	}
	
	addComment = async (text, selR) => {
		console.log(selR);
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
	    	  //console.log("reponseData:" + responseData)
	    	  this.setState({ comments: responseData.list })
	    	  this.props.commentCallback(responseData.list)
	      })
	      .catch(error => {
	            console.log("error", error);
	            alert("An error occured, please try again later.");
	      });
	}
		
	handleAddComment = (text) => {
	    // check range
		this.fetchSnippet().then((result) => { 
			let selR = this.props.range
	    if (((selR.start.row !== selR.end.row) 
	    		|| (selR.start.column !== selR.end.column))
	    		&& text !== '') {
		if(result === this.props.text) {
	      console.log("legal comment")
          this.addComment(text, selR)
	       }
	       else { 
		       Swal.fire({
            title: 'Unsaved Snippet Text',
            padding: '3em',
            icon: 'warning',
            showCancelButton: true,
            background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)',
            html: 'Do you want save your changes?',
            confirmButtonText: `Save & Add Comment`,
            allowOutsideClick: () => !Swal.isLoading()            
        }).then((result) => {
  if (result.isConfirmed) {
     this.handleSubmit(text, selR)
  } 
})
	        }
	      //this.setState({ comments: [...this.state.comments, newComment] });
	    } else { 
		    Swal.fire({
			 title: 'Empty Comment',
		     html: 'Comment cannot be blank',
             icon: 'error',
             background: '#fff url(https://t3.ftcdn.net/jpg/01/87/78/52/360_F_187785254_C2GnRn7UJDtngaw5LCY5rZRGf6YUZDsc.jpg)'
            })
	    }
        })    	
	} 
	
	render() {
		let addBtn;
		let selR = this.props.range;
		
		if((((selR.start.row !== selR.end.row) 
	    		|| (selR.start.column !== selR.end.column))
	    		)) { 
		addBtn = <Button className="addButton" type="submit" variant="primary">
			        Add
				 </Button> }
        else { 
	    addBtn = <Button disabled className="addButton" type="submit" variant="primary">
					Add
				 </Button> }
		return(
			<>
				<h2>Comments</h2>
				<CommentEnterArea addComment={ this.handleAddComment } btn={addBtn}/>
				<div className="commentList">
					<CommentList comments={ this.state.comments } delComment={ this.delComment } identifyComment={ this.identifyComment } selectedCommentId={ this.state.selectedCommentId }/>
				</div>
			</>
		)
	}
}

export default CommentPanel;

CommentPanel.propTypes = {
  	id        	: PropTypes.string.isRequired,
	comments 	: PropTypes.array.isRequired,
}
