import React from 'react';
import PropTypes from 'prop-types';

class SnippetHeader extends React.Component {
  render () {
	var idText 			= "Snippet ID: ";
	var timestampText 	= "Created on: ";
	
	var tempSecond = this.props.time
	var d = new Date(0)
	d.setUTCSeconds(tempSecond)
	console.log(d)
	
	return (
      <div className='snippetHeader'>
		<h5>{idText}{this.props.id}</h5>
		<h5>{timestampText}{d.toLocaleString()}</h5>
      </div>
    );
  }
}
 
// validate prop types
SnippetHeader.propTypes = {
	id		: PropTypes.string.isRequired,
	time	: PropTypes.number.isRequired
};

export default SnippetHeader;
