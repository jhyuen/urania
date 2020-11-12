import React from 'react';
import PropTypes from 'prop-types';
import './SnippetHeader.css';

class SnippetHeader extends React.Component {

render () {
	var idText = "Snippet ID: ";
	return (
      <div className = 'snippetHeader'>
		<h2>{ idText }{ this.props.id }</h2>
      </div>
    );
  }
}
 
// validate prop types
SnippetHeader.propTypes = {
	id : PropTypes.string.isRequired
};

export default SnippetHeader;
