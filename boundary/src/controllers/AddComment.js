import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddComment extends Component {

	state = {
		text: ''		
	}
	
	// constantly change the state when typing a comment
	onChange = (e) => {
		this.setState( {[e.target.name]: e.target.value} );
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		this.props.addComment(this.state.text);
		this.setState( {text: ''} );
	}

	render() {
		return (
			<form onSubmit={ this.onSubmit } style={{ display: 'flex' }}>
				<input
					type="text"
					name="text"
					style={{ flex: '10', padding: '5px' }}
					placeholder="Add Comment..."
					value={ this.state.text }
					onChange={ this.onChange }
				/>
				<input
					type="submit"
					value="Add"
					className="btn"
				/>
			</form>
		)
	}
}

// PropTypes
AddComment.propTypes = {
	addComment : PropTypes.func.isRequired
}

export default AddComment;
