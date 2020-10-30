import React from 'react';
import PropTypes from 'prop-types';

class SnippetHeader extends React.Component {
  render () {
	var idText 			= "Snippet ID: ";
	var timestampText 	= "Created on: ";
	
	return (
      <div className='snippetHeader'>
		<h5>{idText}{this.props.id}</h5>
		<h5>{timestampText}{this.props.timestamp}</h5>
      </div>
    );
  }
}
 
// validate prop types
SnippetHeader.propTypes = {
	id			: PropTypes.string.isRequired,
	timestamp	: PropTypes.string.isRequired
};

export default SnippetHeader;
