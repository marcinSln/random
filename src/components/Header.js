import React, { Component } from 'react';

export default class Header extends Component {
	render(props) {
		return (
			<div className={`header ${this.props.className ? this.props.className : ''} `}>{this.props.children}</div>
		);
	}
}
