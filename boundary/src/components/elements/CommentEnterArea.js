import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';


export class CommentEnterArea extends Component {

	state = {
		text: ''		
	}
	
	onChange = (e) => {
		this.setState( {text: e.target.value} );
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		this.props.addComment(this.state.text);
		this.setState( {text: ''} );
	}

	render() {
		return (
			<form className="commentInput" onSubmit={ this.onSubmit }>
				<textarea
					className='addCommentField'
					type="text"
					name="text"
					placeholder="Add Comment..."
					value={ this.state.text }
					onChange={ this.onChange }
				/>
				<Button className="addButton" type="submit" variant="primary">
					Add
				</Button>
			</form>
		)
	}
}

// PropTypes
CommentEnterArea.propTypes = {
	addComment : PropTypes.func.isRequired
}

export default CommentEnterArea;
