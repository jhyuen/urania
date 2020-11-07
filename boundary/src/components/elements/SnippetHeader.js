import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap'
import './SnippetHeader.css';

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
	return (
      <div className='snippetHeader'>
		<div className="leftFloat">
			<h2>Urania Snippet Collaborator</h2>
			<h6>{idText}{this.props.id}</h6>
		</div>
		<div className="rightFloat">
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
      </div>
    );
  }
}
 
// validate prop types
SnippetHeader.propTypes = {
	id		: PropTypes.string.isRequired
};

export default SnippetHeader;
