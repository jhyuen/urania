import React from 'react';
import ReactDOM from 'react-dom';

class SnippetHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'ABCDEF123',
      timestamp: 'Oct. 27 11:30:03AM',
    };
  }

  render () {
    const header = "Snippet #: " + (this.state.id);
    const timestamp = "Created on: " + (this.state.timestamp)
    return (
      <div className='snippetHeader'>
        <div className='snippetID'>{header}</div>
        <div className='snippetTimestamp'>{timestamp}</div>
      </div>
    );
  }
}
 
export default SnippetHeader;