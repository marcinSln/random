import { render } from '@testing-library/react';
import React, { Component } from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isAuth: false,
			redirect: ''
		};
	}

	logIn = (login) => {
		this.setState({
			username: login,
			isAuth: true
		});
	};

	logOut = (login) => {
		this.setState({
			username: login,
			isAuth: false
		});
	};

	render() {
		const { username, isAuth, redirect } = this.state;
		const { logIn, logOut } = this;

		return (
			<AuthContext.Provider
				value={{
					username,
					isAuth,
					logIn,
					logOut,
					redirect
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

export default AuthContext;
