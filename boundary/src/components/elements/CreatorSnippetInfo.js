import React from 'react';
import ReactDOM from 'react-dom';
import './SnippetInfo.css';
import PropTypes from 'prop-types';

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

class CreatorSnippetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
   
  handleSubmit(event) {
    event.preventDefault();
    /*{alert('Snippet Info was updated' + this.state.value);}*/
  }

  render () {
    return (
      <div className='snippetInfo'>
        <div className='infoHeader'>
        	<h1>Snippet Info</h1>
        </div>
        <CreatorButton />
        <CreatorForm value={this.props.info} 
        		onSubmit={ (event) => this.handleSubmit(event)} 
        		onChange={ (event) => this.handleChange(event)}/>          
      </div>
    );
  }
}
  
  CreatorSnippetInfo.propTypes = {
	info : PropTypes.string.isRequired
};

export default CreatorSnippetInfo;
