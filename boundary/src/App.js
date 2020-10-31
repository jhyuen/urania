import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
					<Route path="/" exact 	component={ AdminView } />
					<Route path="/creator" exact render={() => {
		                return <Redirect to={{ pathname: '/123/creator' }} />
					}} />
					<Route path="/:snippetId/creator" exact component={ CreatorView } />
					<Route path="/admin" 	component={ AdminView } />
					<Route path="/:snippetId" 	component={ ViewerView } />
				</Switch>
			</Router>
		);
	}
}

export default App;
