import React, { Component } from 'react';
import Block from '../components/Block';
import Input from '../components/Input';
import Btn from '../components/Btn';
import Firebase from 'firebase';
import config from '../config';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		if (!Firebase.apps.length) {
			Firebase.initializeApp(config);
		}
		super(props);
		this.state = {
			isActive: false,
			name: '',
			overall: '',
			redirect: false,
			toastr: '',
			errors: [ ('password': ''), ('login': '') ]
		};
	}

	trans = (message) => {
		switch (message) {
			case 'The email address is badly formatted.':
				message = 'Adres email ma niepoprawny format';
				break;
			case 'Password should be at least 6 characters':
				message = 'Hasło powinno zawierać 6 znaków';
		}
		return message;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let form = e.target;
		let login = form.login.value;
		const { errors } = this.state;
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
			Firebase.auth()
				.createUserWithEmailAndPassword(login, password)
				.then((user) => {
					obj.desc = 'Konto pomyślnie założone, za chwile zostaniesz przekierowany na stonę logowania';
					obj.title = 'success';
					obj.isActive = true;

					this.setState({
						toastr: obj
					});

					setTimeout(() => {
						obj.isActive = false;
						this.setState({
							toastr: obj
						});
						this.setState({ redirect: true });
					}, 3000);
				})
				.catch((error) => {
					obj.desc = this.trans(error.message);
					obj.title = 'error';
					obj.isActive = true;

					this.setState({
						toastr: obj
					});

					setTimeout(() => {
						obj.isActive = false;
						this.setState({
							toastr: obj
						});
					}, 3000);
				});
		}
	};

	render() {
		const { redirect, toastr, errors } = this.state;
		return (
			<div className="wrapper">
				<Block>
					<h2 className="text text--header-with-border"> Rejestracja: </h2>
					<form className="form__content" onSubmit={(e) => this.handleSubmit(e)}>
						<Input label="E-mail" type="text" name="login" error={errors.login} />
						<Input label="Hasło" type="password" name="password" error={errors.password} />
						<div className="btn__box">
							<Btn
								isSubmit="true"
								className="btn btn--base btn--small text--center"
								text="Zarejestruj się"
							/>
							<Link to="/" className="link--item btn btn--second btn--small text--center">
								Powrót
							</Link>
						</div>
					</form>
					{redirect ? <Redirect to="/login" /> : ''}
				</Block>
			</div>
		);
	}
}

export default Register;
