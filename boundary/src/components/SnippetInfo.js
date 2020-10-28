import React from 'react';
import ReactDOM from 'react-dom';
import './SnippetInfo.css';

function CreatorButton () {
  return (
    <input className='submitButton' type='submit' value='Submit' form='infoForm'/>
  );
}

function CreatorForm (props) {
  return (
    <form className='infoTextArea' id='infoForm' onSubmit={props.onSubmit}>
      <textarea className='infoArea' placeholder='Some snippet info...' onChange={props.onChange}/>
    </form>
  );
}

function ViewerArea(props) {
  return (
    <div className='viewerText'>{props.value}</div>
  );
}

class SnippetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreator: true,
      value: 'Default Snippet Text...',
      id: 'ABCDEF123',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
   
  handleSubmit(event) {
    event.preventDefault();
    {/*alert('Snippet Info was updated' + this.state.value);*/}
  }

  render () {
    return (
      <div className='snippetInfo'>
        <div className='infoHeader'>Snippet Info:</div>
        { this.state.isCreator ? <CreatorButton/> : null }
        { this.state.isCreator 
          ? <CreatorForm value={this.state.value} 
                         onSubmit={ (event) => this.handleSubmit(event)} 
                         onChange={ (event) => this.handleChange(event)}/> 
          : <ViewerArea value={this.state.value}/> }
      </div>
    );
  }
}
  
export default SnippetInfo;
