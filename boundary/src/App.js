import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import CreatorView from './components/views/CreatorView';
import ViewerView from './components/views/ViewerView';
import AdminView from './components/views/AdminView';

export * from './api.js';

// uuidv4 generates random ids 
const { v4: uuidv4 } = require('uuid');	

// local storage key (DEBUG)
//const LOCAL_STORAGE_KEY = 'SnippetApp.comments'

class App extends Component {
	state = {}
	
	render() {
		return (
			<Router>
				<Route exact path="/" render={props => (
					<React.Fragment>
						<ViewerView />
					</React.Fragment>
				)} />
				<Route path="/creator" render={props => (
					<React.Fragment>
						<CreatorView />
					</React.Fragment>
				)} />
				<Route path="/admin" render={props => (
					<React.Fragment>
						<AdminView />
					</React.Fragment>
				)} />
			</Router>
		);
	}
}

export default App;
