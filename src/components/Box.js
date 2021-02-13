import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  Link } from 'react-router-dom';


export default class Box extends Component {
    render(props) {
        let {icon,header,link} = this.props;
        return (
            <>
            { link ? (
                <Link to={link} className="box">
                    <FontAwesomeIcon className="icon--big box__icon"  icon={icon} size="4x" />
                    <p className='text--sub-header'>
                    {header}
                    </p>
                </Link>
            ) : (
                <div className="box">
                    <FontAwesomeIcon className="icon--big box__icon"  icon={icon} size="4x" />
                    <p className='text--sub-header'>
                    {header}
                    </p>
                </div>
            )}
            </>
        )
    }
}
