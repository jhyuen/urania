import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Delete from '@material-ui/icons/DeleteForeverOutlined';

class Comment extends Component {
	// dynamic styling
	getStyle = () => {
		return {
			backgroundColor	: '#333333',
			padding			: '10px',
			marginBottom	: '10px',
			marginTop		: '10px',	
			borderRadius	: '10px 10px 10px 10px'
		}
	}

	render() {
		const { commentID, commentText } = this.props.comment;			
		return (
			<>
			<div style={this.getStyle()}>
				<p>
					{ commentText }
					<Button className="deleteButton" variant="danger" onClick={ this.props.delComment.bind(this, commentID) }>
						<Delete/>
					</Button>
				</p>
			</div>
			</>
		)
	}
}

// PropTypes
Comment.propTypes = {
	comment 	: PropTypes.object.isRequired,
	delComment 	: PropTypes.func.isRequired
}

export default Comment;