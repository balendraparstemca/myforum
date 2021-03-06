import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai'
import { FaRegEnvelope } from 'react-icons/fa'
import { FiLock } from 'react-icons/fi'
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import { connect } from "react-redux";
import { registerUser } from '../services/action/auth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { getDefaultMeta, getPageinfo } from '../services/action/common';
import MetaTag from './metainfo';
class SignUp extends Component {

    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCpassword = this.onChangeCpassword.bind(this);
        this.state = {
            username: "",
            email: "",
            password: "",
            successfull: false,
            message: "",
            loading: false,
            breadcrumbimg: require('../assets/images/bread-bg.jpg'),
            submit: false,
            metainfo: null,
            defaultMetaTag: null
        };
    }

    componentDidMount() {
        this.getpageseo({ page_type: 'register' })
    }

    onReset = () => {
        this.setState({
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            cpassword: "",

        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });

    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value,
        });

    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value,
        });

    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });

    }

    onChangeCpassword(e) {

        if (this.state.password === e.target.value) {
            this.setState({
                submit: false
            })

        } else {
            this.setState({
                submit: true
            })

        }
        this.setState({
            cpassword: e.target.value,
        });

    }

    getAlert = (alerttype, title) => (
        <SweetAlert
            type={alerttype}
            title={title}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}>
            {this.props.message}
        </SweetAlert>
    );

    handleRegister(e) {
        e.preventDefault();
        this.setState({
            loading: true,
        });

        this.props.dispatch(registerUser(this.state.firstname, this.state.lastname, this.state.username, this.state.email, this.state.password)).then(() => {

            if (this.props.isSignup) {
                this.setState({
                    successfull:true,loading: false, alert:this.getAlert('success', 'signup successfull')
                })
            }
            else {
                this.setState({
                    alert: this.getAlert('warning', 'signup Failed')
                })
            }

        }).catch(() => {
            this.setState({
                successfull: false, loading: false, username: '', email: '', password: '', alert: this.getAlert('warning', ' signup Failed')
            });

        });

    }

    onConfirm = () => {
        if (this.state.successfull) {
            this.props.history.push("/login");
            window.location.reload();
        }
        this.setState({ alert: null, loading: false })



    }

    getpageseo = (obj) => {
        this.props.dispatch(getPageinfo(obj)).then(() => {
            if (this.props.pageinfo.length > 0) {
                this.setState({
                    metainfo: {
                        title: this.props.pageinfo[0].meta_title,
                        canonicalURL: `https://www.casualdesi.com/sign-up}`,
                        meta: [{
                            attribute: 'name',
                            value: 'description',
                            content: this.props.pageinfo[0].meta_description
                        },
                        {
                            attribute: 'name',
                            value: 'keywords',
                            content: this.props.pageinfo[0].meta_keywords
                        }]
                    }
                })

            } else {

                this.setState({
                    defaultMetaTag: getDefaultMeta()
                })
            }
        })
    }

    render() {
        return (<>
         { this.state.metainfo ? <MetaTag metaTag={ this.state.metainfo || getDefaultMeta() }></MetaTag> : ''}

            <main className="signup-page">
              
                {/* Header */}
                <GeneralHeader />

                {/* Breadcrumb */}
                <Breadcrumb CurrentPgTitle="Sign Up" img={this.state.breadcrumbimg} />

                <section className="form-shared padding-top-40px padding-bottom-100px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <div className="billing-form-item mb-0">
                                    <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
                                        <h3 className="widget-title font-size-28 pb-0">
                                            Create an account!
                                        </h3>
                                        <p className="font-size-16 font-weight-medium">

                                        </p>
                                    </div>
                                    <div className="billing-content">
                                        <div className="contact-form-action">
                                            <form method="post" onSubmit={this.handleRegister}>
                                                <div className="row">


                                                    <div className="col-lg-12">
                                                        <div className="account-assist mt-4 mb-4 text-center">
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text">First name</label>
                                                            <div className="form-group">
                                                                <span className="form-icon">
                                                                    <AiOutlineUser />
                                                                </span>
                                                                <input className="form-control" type="text" placeholder="First name" name="firstname" value={this.state.firstname} onChange={this.onChangeFirstname} required="required" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text">Last name</label>
                                                            <div className="form-group">
                                                                <span className="form-icon">
                                                                    <AiOutlineUser />
                                                                </span>
                                                                <input className="form-control" type="text" name="lastname" value={this.state.lastname} onChange={this.onChangeLastname} required="required" placeholder="Last name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text">Username(please enter uniq name)</label>
                                                            <div className="form-group">
                                                                <span className="form-icon">
                                                                    <AiOutlineUser />
                                                                </span>
                                                                <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.onChangeUsername} required="required" placeholder="Username" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text">Email(please enter your email id so you can get notification )</label>
                                                            <div className="form-group">
                                                                <span className="form-icon">
                                                                    <FaRegEnvelope />
                                                                </span>
                                                                <input className="form-control" type="email" required="required" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Enter email" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text">Password</label>
                                                            <div className="form-group">
                                                                <span className="form-icon">
                                                                    <FiLock />
                                                                </span>
                                                                <input className="form-control" type="text" name="password" value={this.state.password} onChange={this.onChangePassword} required="required"  placeholder="Password" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text">Confirm Password  {this.state.ismatch ? '' : this.state.matchpassword}</label>
                                                            <div className="form-group">
                                                                <span className="form-icon">
                                                                    <FiLock />
                                                                </span>
                                                                <input className="form-control" type="text" name="password" value={this.state.cpassword} onChange={this.onChangeCpassword} placeholder="Confirm password" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {this.state.submit && (
                                                                <span className="label-danger">password does not match</span>
                                                            )}
                                                   
                                                    <div className="col-lg-12">
                                                        <div className="btn-box margin-top-20px margin-bottom-20px">
                                                            <button className="theme-btn border-0" type="submit" disabled={this.state.loading || this.state.submit}>
                                                                {this.state.loading && (
                                                                    <span className="spinner-border spinner-border-sm"></span>
                                                                )} Register account
                                                           </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <p className="font-weight-medium">
                                                            Already have an account? <Link to="/login" className="color-text">Login</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                                {this.state.alert}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Newsletter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />

            </main></>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, isSignup } = state.auth;
    const { message } = state.message;
    const { pageinfo } = state.common;
    return {
        isLoggedIn, isSignup,pageinfo,
        message
    };
}
export default connect(mapStateToProps)(SignUp);