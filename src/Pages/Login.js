import React, { Component } from 'react';
import Block from '../components/Block';
import Input from '../components/Input';
import Firebase from 'firebase/app'; // TODO Make component to connect into firebase
import Btn from '../components/Btn';
import config from '../config';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import Toastr from '../components/Toastr';
import { validate } from '../components/FormHandler';

export default class Login extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			redirect: '',
			toastr: '',
			errors: [ ('password': ''), ('login': '') ]
		};
	}

	componentDidMount() {
		const context = this.context;
		this.setState({ user: context.user });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target,
			{ logIn, redirect } = this.context,
			{ errors } = this.state,
			login = form.login.value,
			password = form.password.value,
			obj = {
				title: '',
				desc: '',
				isActive: '',
				login: login,
				password: password
			},
			result = validate(obj);

		if (result.errors) {
			this.setState({
				toastr: result.toastr,
				errors: result.errors
			});

			setTimeout(() => {
				obj.isActive = false;
				this.setState({
					toastr: obj,
					errors: ''
				});
			}, 3000);
		} else {
			Firebase.auth().signInWithEmailAndPassword(login, password).then(
				(user) => {
					if (user) {
						logIn(user.email);
						this.setState({ redirect: '/admin' });
					}
				},
				(error) => {
					validate(obj);
					setTimeout(() => {
						obj.isActive = false;
						this.setState({
							toastr: obj,
							errors: ''
						});
					}, 3000);
				}
			);
		}
	};

	render() {
		const { redirect, toastr, errors } = this.state;
		return (
			<div className="wrapper">
				<Toastr toastList={toastr} />
				<Block>
					<h2 className="text text--header-with-border"> Logowanie: </h2>
					<form className="form__content" onSubmit={(e) => this.handleSubmit(e)}>
						<Input label="E-mail" type="text" name="login" error={errors.login} />
						<Input label="Hasło" type="password" name="password" error={errors.password} />
						<div className="btn__box">
							<Btn isSubmit="true" className="btn btn--base btn--small text--center" text="Zaloguj się" />
							<Link to="/" className="link--item btn btn--second btn--small text--center">
								Powrót
							</Link>
						</div>
					</form>
				</Block>

				{redirect ? <Redirect to={redirect} /> : ''}
			</div>
		);
	}
}
