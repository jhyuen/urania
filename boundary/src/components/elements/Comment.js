import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Delete from '@material-ui/icons/DeleteForeverOutlined';

class Comment extends Component {
	render() {
		const { commentID, commentText } = this.props.comment;			
		return (
			<div className='comment'>
				<p>
					{ commentText }
					<Button className="deleteButton" variant="danger" onClick={ this.props.delComment.bind(this, commentID) }>
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
