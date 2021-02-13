import React, { Component } from 'react';

export default class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleChange = (e) => {
		if (e.target.value) {
			this.setState({
				isActive: true
			});
		} else {
			this.setState({
				isActive: false
			});
		}
	};

	render(props) {
		return (
			<div className="form__group">
				<label className={`form__label ${this.state.isActive ? 'isActive' : ''}`}>{this.props.label}</label>
				<input
					type={this.props.type}
					max={this.props.max ? this.props.max : ''}
					className={`form__input ${this.props.error && !this.state.isActive
						? ' form__input--error'
						: null} `}
					name={this.props.name ? this.props.name : this.props.label}
					onChange={(e) => {
						this.handleChange(e);
					}}
				/>
			</div>
		);
	}
}
