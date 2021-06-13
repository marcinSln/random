import React, { Component } from 'react';
import Header from '../components/Header';
import Members from "../components/Members";
import Btn from "../components/Btn";
import {  Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid";
import AuthContext from '../contexts/AuthContext';
import { Redirect } from "react-router-dom";

export default class Manage extends Component {
    static contextType = AuthContext;

    constructor(props) {
   
        super(props);
        this.state = {
            isAuth:'',
            redirect:'',
        };
    }

    componentDidMount() {
        const context = this.context;
        this.setState({
            isAuth:context.isAuth,
            redirect:context.isAuth ? "" : '/login',
        })
    }
    


    render() {
        const {isAuth,redirect} = this.state;
        
        return (
            <>
                {/* {redirect ? <Redirect to={redirect} /> : ""} */}
                <Header className="header--logged row--center">
                    <Link to="/admin">
                        <div className="header__link-box">
                            <FontAwesomeIcon className="input__submit-icon"  icon={Icons.faCrown} size="1x" />
                            Witaj, admin
                        </div>
                    </Link>
                    <Link to="/">
                        <Btn text="Wyloguj się"  className="btn btn--small  btn btn--base"/>
                    </Link>
                </Header>
                
                <div className="site">
                    <div className="wrapper wrapper--start">
                        <div className="column">
                            <div className="text__header-block block--center">
                                <h1 className="text text--header-with-border"> Edytuj zawodników </h1>
                            </div>
                            <Members isEditable="true" isWider='true' />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
