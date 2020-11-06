import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class Comment extends Component {
	// dynamic styling
	getStyle = () => {
		return {
			backgroundColor	: '#f4f4f4',
			padding			: '10px',
			borderBottom	: '1px #ccc dotted',
			textDecoration	: this.props.comment.delete ? 'line-through' : 'none'
		}
	}

	render() {
		const { id, text } = this.props.comment;
		return (
			<div style={this.getStyle()}>
				<p>
					{ text }
					<button onClick={ this.props.delComment.bind(this, id) } class="deleteButton" >x</button>
				</p>
			</div>
		)
	}
}

// PropTypes
Comment.propTypes = {
	comment : PropTypes.object.isRequired,
	delComment : PropTypes.func.isRequired
}

export default Comment;
