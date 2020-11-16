import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {
	
	render() {
		return this.props.comments.map((comment) => (
			<Comment key={ comment.commentID }
				  comment={ comment }
				  delComment={ this.props.delComment }
				  identifyComment= { this.props.identifyComment}
			/>
		))
	}
}

// PropTypes
CommentList.propTypes = {
	comments 	: PropTypes.array.isRequired,
	delComment 	: PropTypes.func.isRequired,
	identifyComment 	: PropTypes.func.isRequired,
}

export default CommentList;
