import React, { Component } from 'react';
import './App.css';
import CreatorView from './components/CreatorView';
import ViewerView from './components/ViewerView';
import AdminView from './components/AdminView';

export * from './api.js';

// uuidv4 generates random ids 
const { v4: uuidv4 } = require('uuid');	

// local storage key (DEBUG)
//const LOCAL_STORAGE_KEY = 'SnippetApp.comments'

class App extends Component {
	state = {}
	
	render() {
		return (
			<CreatorView />
		);
	}
}

export default App;
