import React, { useState, useEffect, useContext } from 'react';
import Firebase from 'firebase/app'; // TODO Make component to connect into firebase
import config from '../config';

import AuthContext from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import { validate } from '../components/FormHandler';
import useToastContext from '../hooks/useToastContext';
import LoginTemplate from '../components/LoginTemplate';

function Login() {
	const contextType = AuthContext;
	const [ user, setUser ] = useState('');
	const [ redirect, setRedirect ] = useState('');
	const context = useContext(AuthContext);
	const toastr = useToastContext();

	useEffect(
		() => {
			setUser(context.user);
		},
		[ context ]
	);

	const HandleSubmit = (e) => {
		e.preventDefault();
		let result;
		const form = e.target,
			login = form.login.value,
			password = form.password.value,
			obj = {
				title: '',
				desc: '',
				isActive: '',
				login: login,
				password: password
			};
		validate(obj).then((result) => {
			if (result.errors) {
				toastr.addToast(obj);
			} else {
			}
		});
	};

	return (
		<div className="wrapper " toastr={toastr}>
			<LoginTemplate onSubmit={HandleSubmit} errors={errors} />
			{redirect ? <Redirect to={redirect} /> : ''}
		</div>
	);
}

export default Login;
