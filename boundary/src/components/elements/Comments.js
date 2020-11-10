import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class Comments extends Component {
	render() {
		return this.props.comments.map((comment) => (
			<Comment
				key={ comment.commentID }		// the key allows react to rerender only the comments which were changed
				comment={ comment }
				delComment={ this.props.delComment }
			/>
		));
	}
}

// PropTypes
Comments.propTypes = {
	comments 	: PropTypes.array.isRequired,
	delComment 	: PropTypes.func.isRequired
}

export default Comments;
