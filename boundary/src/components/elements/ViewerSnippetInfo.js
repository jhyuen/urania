import React from 'react';
import './SnippetInfo.css';
import PropTypes from 'prop-types';

class ViewerSnippetInfo extends React.Component {
  render () {
    return (
      <div className='snippetInfo'>
        <div className='infoHeader'>
        	<h2>Description</h2>
        </div>
        <div className='viewerText'>{ this.props.info }</div>
      </div>
    );
  }
}

ViewerSnippetInfo.propTypes = {
	info : PropTypes.string.isRequired
};

export default ViewerSnippetInfo;