import React from 'react';
import './SnippetInfo.css';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";

class CreatorSnippetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	value: ""
    }
    
    this.updateSnippetInfo = this.updateSnippetInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
	  this.setState({ value: this.props.info })
  }
  
  successCallback(result) {
      Swal.fire(
	      'Success',
          'Snippet Info Updated!',
          'success' 
      )
  }

  failureCallback(result) {
      Swal.fire(
	      'Error',
          'Unable to Update Snippet Info',
          'error' 
      )
  }

  updateSnippetInfo = async () => {
	  var base_url = "https://e061bpd3ph.execute-api.us-east-2.amazonaws.com/beta/";
	  var update_url = base_url + this.props.id + "/info";
	  fetch(update_url, {
		  method: 'POST',
		  body: JSON.stringify({info: this.state.value}),
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
		  }
	  })
	    .catch(error => {
	      console.log("error", error);
	      alert("An error occured, please try again later.");
	    });
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
   
  handleSubmit(event) {
    event.preventDefault();
    this.updateSnippetInfo().then(this.successCallback, this.failureCallback);
  }

  render () {
    return (
      <div className='snippetInfo'>
        <div className='infoHeader'>
        	<h2>Description</h2>
        </div>
        <Button className='submitButton' type='submit' form='infoForm' variant="primary">Save</Button>{' '}
        <form className='infoTextArea' id='infoForm' onSubmit={this.handleSubmit}>
        	<textarea className='infoArea' placeholder="Add snippet description and don't forget to save..." value = {this.state.value} onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}
 
CreatorSnippetInfo.propTypes = {
	info 	: 	PropTypes.string.isRequired,
	id		: 	PropTypes.string.isRequired
};

export default CreatorSnippetInfo;
