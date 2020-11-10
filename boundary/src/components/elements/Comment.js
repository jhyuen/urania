import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Delete from '@material-ui/icons/DeleteForeverOutlined';

class Comment extends Component {
	
	onChange = () => {}
	
	render() {
		return (
			<div className='comment'>
				<p>
					<textarea
						className='displayCommentTextArea'
						type="text"
						name="text"
						value={ this.props.comment.commentText }
						onChange={ this.onChange }
					/>
					<Button className="deleteButton" variant="danger" onClick={ this.props.delComment.bind(this, this.props.comment.commentID) }>
						<Delete/>
					</Button>
				</p>
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
