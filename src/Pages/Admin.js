import React, { Component } from 'react';
import Btn from '../components/Btn';
import Members from '../components/Members';
import Header from '../components/Header';
import Box from '../components/Box';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/fontawesome-free-solid';
import AuthContext from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

import '../assets/scss/app.scss';

export default class Admin extends Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			isAuth: '',
			redirect: ''
		};
	}

	componentDidMount() {
		const context = this.context;
		this.setState({
			isAuth: context.isAuth,
			redirect: context.isAuth ? '' : '/login'
		});
	}

	render() {
		const { isAuth, redirect } = this.state;
		return (
			<div className="App">
				{/* {redirect ? <Redirect to={redirect} /> : ''} */}
				<Header className="header--logged">
					<Link className="header__link-box text--light-blue">
						<FontAwesomeIcon className="input__submit-icon" icon={Icons.faCrown} size="1x" />
						Witaj, admin
					</Link>
					<Link to="/">
						<Btn text="Wyloguj się" className="btn btn--small  btn btn--base" />
					</Link>
				</Header>
				<div className="wrapper wrapper--start">
					<div className="box__list">
						<Box link="/manage" icon={Icons.faUsers} header="Edycja zawodników" />
					</div>
				</div>
			</div>
		);
	}
}
