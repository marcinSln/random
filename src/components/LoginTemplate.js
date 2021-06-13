import React from 'react';
import Block from './Block';
import Input from './Input';
import Btn from './Btn';
import { Link } from 'react-router-dom';

export default function LoginTemplate(props) {
	return (
		<Block>
			<h2 className="text text--header-with-border"> Logowanie: </h2>
			<form className="form__content" onSubmit={props.onSubmit}>
				<Input label="E-mail" type="text" name="login" error={props.errors.login} />
				<Input label="Hasło" type="password" name="password" error={props.errors.password} />
				<div className="btn__box">
					<Btn isSubmit="true" className="btn btn--base btn--small text--center" text="Zaloguj się" />
					<Link to="/" className="link--item btn btn--second btn--small text--center">
						Powrót
					</Link>
				</div>
			</form>
		</Block>
	);
}
