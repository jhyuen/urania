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
        <textarea className='viewerText' value={this.props.info} disabled/>
      </div>
    );
  }
}

ViewerSnippetInfo.propTypes = {
	info : PropTypes.string.isRequired
};

export default ViewerSnippetInfo;