import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Delete from '@material-ui/icons/DeleteForeverOutlined';
import SearchIcon from '@material-ui/icons/Search';

class Comment extends Component {
	
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		
	}
	
	onChange = () => {}
	
	render() {
		var tempSecond = this.props.comment.timeStamp.epochSecond
		var d = new Date(0)
		d.setUTCSeconds(tempSecond)
		console.log("selectedCommentId: " + this.props.selectedCommentId)
		return (
			<div>
			{ this.props.comment.commentID === this.props.selectedCommentId ?
				<div className='chosenComment'>
					<div className="commentHeader"> 
						<p className="commentTimestamp">{d.toLocaleString()}</p>
						<Button className="deleteButton" variant="danger" onClick={ this.props.delComment.bind(this, this.props.comment.commentID) }>
							<Delete className="commentButton" />
						</Button>	
						<Button className="identifyButton" variant="info" onClick={ this.props.identifyComment.bind(this, this.props.comment.commentID )  }>
							<SearchIcon className="commentButton"/>
						</Button>					
					</div>
					<textarea 
						className='displayCommentTextArea'
						type="text"
						disabled
						name="text"
						value={ this.props.comment.commentText }
						onChange={ this.onChange }
						readOnly
					/>
				</div>
				:
				<div className='comment'>
					<div className="commentHeader"> 
						<p className="commentTimestamp">{d.toLocaleString()}</p>
						<Button className="deleteButton" variant="danger" onClick={ this.props.delComment.bind(this, this.props.comment.commentID) }>
							<Delete className="commentButton" />
						</Button>	
						<Button className="identifyButton" variant="info" onClick={ this.props.identifyComment.bind(this, this.props.comment.commentID )  }>
							<SearchIcon className="commentButton"/>
						</Button>					
					</div>
					<textarea 
						className='displayCommentTextArea'
						type="text"
						disabled
						name="text"
						value={ this.props.comment.commentText }
						onChange={ this.onChange }
						readOnly
					/>
				</div>
					
			}
			</div>
		)
	}
}

// PropTypes
Comment.propTypes = {
	comment 	: PropTypes.object.isRequired,
	delComment 	: PropTypes.func.isRequired,
	identifyComment : PropTypes.func.isRequired
}

export default Comment;
