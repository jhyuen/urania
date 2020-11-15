import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
				{this.props.btn}
			</form>
		)
	}
}

// PropTypes
CommentEnterArea.propTypes = {
	addComment : PropTypes.func.isRequired
}

export default CommentEnterArea;
