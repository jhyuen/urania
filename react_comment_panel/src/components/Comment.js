import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
					<button onClick={ this.props.delComment.bind(this, id) } style={ btnStyle }>x</button>
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

// style variables
const btnStyle = {
	background		: '#ff0000',
	color			: '#fff',
	border			: 'none',
	padding			: '5px 9px',	// top&bottom left&right
	borderRadius	: '50%',
	cursor			: 'pointer',
	float			: 'right',
	//icon: ???
}

export default Comment;
