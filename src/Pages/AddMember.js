import React, { Component } from 'react';
import Btn from '../components/Btn';
import Header from '../components/Header';
import Block from '../components/Block';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/fontawesome-free-solid';
import AuthContext from '../contexts/AuthContext';
import Input from '../components/Input';
import { Redirect } from 'react-router-dom';
import Firebase from 'firebase';
import config from '../config';

export default class AddMember extends Component {
	static contextType = AuthContext;
	constructor(props) {
		super(props);
		this.state = {
			isAuth: '',
			redirect: '',
			lastIndex: ''
		};
	}

	componentDidMount() {
		const context = this.context;
		this.setState({
			isAuth: context.isAuth,
			redirect: context.isAuth ? '' : '/login'
		});

		if (!Firebase.apps.length) {
			Firebase.initializeApp(config);
		}

		Firebase.database().ref('/members').on('value', (snapshot) => {
			let lastIndex = snapshot.val().length;
			this.setState({
				lastIndex: lastIndex
			});
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData(document.querySelector('form'));
		let name = data.get('name');
		let overall = data.get('overall');
		let ref = Firebase.database().ref('/members');

		console.log('this', this.state.lastIndex);
		Firebase.database().ref(`/members`).child(this.state.lastIndex).set({
			overall: overall,
			name: name
		});

		this.setState({ lastIndex: this.statelastIndex + 1 });
	};

	render() {
		const { isAuth, redirect } = this.state;
		return (
			<div>
				<Header className="header--logged">
					<Link to="/admin" className="header__link-box">
						<FontAwesomeIcon className="input__submit-icon" icon={Icons.faCrown} size="1x" />
						Witaj, admin
					</Link>
					<Link to="/">
						<Btn text="Wyloguj się" className="btn btn--small  btn btn--base" />
					</Link>
				</Header>
				{/* {redirect ? <Redirect to={redirect} /> : ""} */}
				<div className="wrapper">
					<Block>
						<div className="text__header-block">
							<h1 className="text text--header-with-border text--left"> Dodaj zawodnika </h1>
							<form className="form__content" onSubmit={(e) => this.handleSubmit(e)}>
								<Input name="name" label="Imię i nazwisko" type="text" />
								<Input name="overall" label="Ocena" type="number" max="10" />
								<Btn
									isSubmit="true"
									className="btn btn--base btn--small text--center"
									text="Dodaj zawodnika"
								/>
							</form>
						</div>
					</Block>
				</div>
			</div>
		);
	}
}
