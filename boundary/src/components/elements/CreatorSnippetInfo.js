import React from 'react';
import './SnippetInfo.css';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

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
    this.updateSnippetInfo();
    /*{alert('Snippet Info was updated' + this.state.value);}*/
  }

  render () {
    return (
      <div className='snippetInfo'>
        <div className='infoHeader'>
        	<h2>Snippet Info</h2>
        </div>
        <Button className='submitButton' type='submit' form='infoForm' variant="primary">Save</Button>{' '}
        <form className='infoTextArea' id='infoForm' onSubmit={this.handleSubmit}>
        	<textarea className='infoArea' placeholder='Add Some snippet info...' value = {this.state.value} onChange={this.handleChange}/>
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
