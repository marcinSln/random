import React, { Component } from 'react';
import Btn from '../components/Btn';
import Members from '../components/Members';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

import '../assets/scss/app.scss';

export default class PMain extends Component {
	render() {
		return (
			<div className="App">
				<Header>
					<Link to="/register">
						<Btn text="Zarejestruj się" className="btn btn--small  btn btn--base" />
					</Link>
					<Link to="/login">
						<Btn text="Zaloguj się" className="btn btn--small  btn btn--base" />
					</Link>
				</Header>
				<Members />
			</div>
		);
	}
}
