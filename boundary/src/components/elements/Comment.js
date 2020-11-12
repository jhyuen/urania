import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Delete from '@material-ui/icons/DeleteForeverOutlined';

class Comment extends Component {
	
	onChange = () => {}
	
	render() {
		var tempSecond = this.props.comment.timeStamp.epochSecond
		var d = new Date(0)
		d.setUTCSeconds(tempSecond)
		return (
			<div className='comment'>
				<div className="commentHeader"> 
					<p>{d.toLocaleString()}</p>
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
				<Button className="deleteButton" variant="danger" onClick={ this.props.delComment.bind(this, this.props.comment.commentID) }>
					<Delete/>
				</Button>	
			</div>
		)
	}
}

// PropTypes
Comment.propTypes = {
	comment 	: PropTypes.object.isRequired,
	delComment 	: PropTypes.func.isRequired
}

export default Comment;
