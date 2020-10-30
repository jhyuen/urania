import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CreatorView from './components/views/CreatorView';
import ViewerView from './components/views/ViewerView';
import AdminView from './components/views/AdminView';

export * from './api.js';

class App extends Component {
	state = {}
	
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" 	component={ ViewerView } />
					<Route path="/creator" 	component={ CreatorView } />
					<Route path="/admin" 	component={ AdminView } />
				</Switch>
			</Router>
		);
	}
}

export default App;
