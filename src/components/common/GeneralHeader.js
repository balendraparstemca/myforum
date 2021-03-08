import React, { Component } from 'react'
import Navbar from './Navbar'
import HeaderAuthorAccess from '../other/account/HeaderAuthorAccess'
import Logo from './Logo'
import $ from 'jquery';
import { connect } from "react-redux";

class GeneralHeader extends Component {
    componentDidMount() {
        $(window).on('scroll', function () {
            //header fixed animation and control
            if ($(window).scrollTop() > 200) {
                $('.header-menu-wrapper').addClass('header-fixed');
            } else {
                $('.header-menu-wrapper').removeClass('header-fixed');
            }
        });
    }

    state = {
        logo: require('../../assets/images/logo-2.png')
    }
    render() {
        return (
            <>
                <header className="header-area">
                    <div className="header-menu-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="menu-full-width">
                                        {/* Logo */}
                                        <div className="logo">
                                            <Logo url={this.state.logo} />
                                        </div>

                                        {/* Navbar */}
                                        <Navbar loggedin={this.props.isLoggedIn}/>

                                        {/* Author Access */}
                                        <HeaderAuthorAccess />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { notifications } = state.notification;
    const { message } = state.message;
    return {
        isLoggedIn, userdetails, notifications,
        message
    };
}
export default connect(mapStateToProps)(GeneralHeader);
