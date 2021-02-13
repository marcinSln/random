import React, { Component } from 'react';
import Block from '../components/Block';
import Input from '../components/Input';
import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Btn from '../components/Btn';
import config from '../config';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import Toastr from '../components/Toastr';

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
		let form = e.target;
		const { logIn, redirect } = this.context;
		const { errors } = this.state;
		if (!Firebase.apps.length) {
			Firebase.initializeApp(config);
		}

		e.preventDefault();

		let login = e.target.login.value;
		let password = e.target.password.value;
		let obj = {
			id: '',
			title: '',
			desc: '',
			isActive: ''
		};

		if (login === '' || password === '') {
			obj.desc = 'Uzupełnij pola';
			obj.title = 'error';
			obj.isActive = true;

			errors['password'] = password ? false : true;
			errors['login'] = login ? false : true;

			this.setState({
				toastr: obj,
				errors: errors
			});

			setTimeout((e) => {
				obj.isActive = false;
				this.setState({
					toastr: obj
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
					obj.desc = 'Hasło lub login są niepoprawne';
					obj.title = 'error';
					obj.isActive = true;

					this.setState({
						toastr: obj
					});

					setTimeout((e) => {
						obj.isActive = false;
						this.setState({
							toastr: obj
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
