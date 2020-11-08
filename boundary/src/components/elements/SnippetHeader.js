import React from 'react';
import PropTypes from 'prop-types';
import './SnippetHeader.css';

class SnippetHeader extends React.Component {

constructor() {
	super();
    this.state = {
      dropDownValue: "Java"
    }
}

changeValue(text) {
    this.setState({dropDownValue: text})
}

render () {
	var idText 			= "Snippet ID: ";
	return (
      <div className='snippetHeader'>
		<div className="leftFloat">
			<h2>{idText}{this.props.id}</h2>
		</div>
		<div className="rightFloat">
			<h2>Urania Snippet Collaborator</h2>
		</div>
      </div>
    );
  }
}
 
// validate prop types
SnippetHeader.propTypes = {
	id		: PropTypes.string.isRequired
};

export default SnippetHeader;
