import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
				<Switch>
					<Route path="/" exact 	component={ AdminView } />
					<Route path="/creator" 	component={ CreatorView } />
					<Route path="/admin" 	component={ AdminView } />
					<Route path="/:snippetId" 	component={ ViewerView } />
				</Switch>
			</Router>
		);
	}
}

export default App;
