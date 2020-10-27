import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class Comments extends Component {
	render() {
		return this.props.comments.map((comment) => (
			// the key allows react to rerender only the comments which were changed
			<Comment key={comment.id} comment={comment} delComment={ this.props.delComment }/>
		));
	}
}

// PropTypes
Comments.propTypes = {
	comments 	: PropTypes.array.isRequired,
	delComment 	: PropTypes.func.isRequired
}

export default Comments;

// TODO: should store a snippet ID