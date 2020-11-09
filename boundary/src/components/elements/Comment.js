import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Button from 'react-bootstrap/Button';

class Comment extends Component {
	// dynamic styling
	getStyle = () => {
		return {
			backgroundColor	: '#333333',
			padding			: '10px',
			marginBottom	: '10px',
			marginTop		: '10px',	
			borderRadius	: '10px 10px 10px 10px',
			textDecoration	: this.props.comment.delete ? 'line-through' : 'none'
		}
	}

	render() {
		const { commentID, commentText } = this.props.comment;			
		return (
			<>
			<div style={this.getStyle()}>
				<p>
					{ commentText }
					<button onClick={ this.props.delComment.bind(this, commentID) } className="deleteButton" >x</button>
				</p>
			</div>
			</>
		)
	}
}

// PropTypes
Comment.propTypes = {
	comment : PropTypes.object.isRequired,
	delComment : PropTypes.func.isRequired
}

export default Comment;
