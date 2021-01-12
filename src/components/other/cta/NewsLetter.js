import React, {Component} from 'react';
import SectionsHeading from "../../common/SectionsHeading";
import { FaRegEnvelope } from 'react-icons/fa'
import { connect } from "react-redux";
import { Subscribe } from '../../../services/action/common';
class NewsLetter extends Component {

    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state={
            email:''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const obj={
            email:this.state.email,
            time:(new Date().getTime()).toString()
        }
        this.props.dispatch(Subscribe(obj)).then(()=>{
            this.setState({
                email:''
            })
        })
    }


    render() {
        return (
            <>
                <section className="cta-area cta-area2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cta-box d-flex align-items-center">
                                    <div className="col-lg-8">
                                        <SectionsHeading title="Subscribe to Newsletter!" titleClass="text-white" desc="Subscribe to get latest updates and information." />
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="contact-form-action">
                                            <form method="post" onSubmit={this.handleLogin}>
                                                <div className="form-group mb-0">
                                                    <span className="form-icon">
                                                        <FaRegEnvelope />
                                                    </span>
                                                    <input className="form-control" type="email"  value={this.state.email} onChange={this.onChangeEmail} required="required" placeholder="Enter your email" />
                                                        <button className="theme-btn" type="submit">Subscribe</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(NewsLetter);