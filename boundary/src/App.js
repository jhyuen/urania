import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import CreatorView from './components/views/CreatorView';
import ViewerView from './components/views/ViewerView';
import AdminView from './components/views/AdminView';
import NewSnippet from './components/views/NewSnippet';

export * from './api.js';

class App extends Component {
	
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact 	component={ NewSnippet } />
					<Route path="/creator" exact component={ NewSnippet } />
					<Route path="/:snippetId/creator" exact component={ CreatorView } />
					<Route path="/admin" 	component={ AdminView } />
					<Route path="/:snippetId" 	component={ ViewerView } />
				</Switch>
			</Router>
		);
	}
}

export default App;
