import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap'

class SnippetHeader extends React.Component {

constructor() {
	super();
    this.state = {
      dropDownValue: "Java"
    }
}

changeValue(text) {
    this.setState({dropDownValue: text})
}

render () {
	var idText 			= "Snippet ID: ";
	var timestampText 	= "Created on: ";
	
	var tempSecond = this.props.time
	var d = new Date(0)
	d.setUTCSeconds(tempSecond)
	
/*		<DropdownButton id="dropdown-button-language" title="Coding Language">
			<Dropdown.Item href="#/action-1"> Java </Dropdown.Item>
			<Dropdown.Item href="#/action-2"> Python </Dropdown.Item>
			<Dropdown.Item href="#/action-3"> C++ </Dropdown.Item>
		</DropdownButton>*/
	
	return (
      <div className='snippetHeader'>
		
		<h5>{idText}{this.props.id}</h5>
		<h5>{timestampText}{d.toLocaleString()}</h5>
		
		<Dropdown size="sm">
			<Dropdown.Toggle variant="success" id="dropdown-coding-language">
				{this.state.dropDownValue}
			</Dropdown.Toggle>
		
			<Dropdown.Menu>
				<Dropdown.Header> Select Coding Language</Dropdown.Header>
				<Dropdown.Divider />
				<Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}> Java </div></Dropdown.Item>
				<Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}> Python </div></Dropdown.Item>
				<Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}> C++ </div></Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
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
