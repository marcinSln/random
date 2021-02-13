import './assets/scss/app.scss';
import React, { Component } from 'react';
import Manage from './Pages/Manage';
import Main from './Pages/Main';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AddMember from './Pages/AddMember';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
	render() {
		Login.contetType = AuthContext;
		Admin.contetType = AuthContext;
		AddMember.contetType = AuthContext;
		Manage.contetType = AuthContext;
		return (
			<AuthProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/admin" component={Admin} />
						<Route path="/manage" component={Manage} />
						<Route path="/add" component={AddMember} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		);
	}
}

export default App;
