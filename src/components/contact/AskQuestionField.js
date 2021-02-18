import React from 'react';
import { AiOutlineUser } from 'react-icons/ai'
import { FaRegEnvelope } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'
import { RiSendPlane2Line } from 'react-icons/ri'
import { contctto } from '../../services/action/common';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

class AskQuestionField extends React.Component {
    constructor(props) {
        super(props)
        this.handleContact = this.handleContact.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.state = {
            username: '',
            email: '',
            message: '',
            loading: false
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value,
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

    onConfirm = () => {
        this.setState({
            alert: null, loading: false, username: '',email: '',message:''
        });

    }

    handleContact(e) {
        e.preventDefault();
        this.setState({
            loading: true,
        });

        const obj = {
            name: this.state.username,
            email: this.state.email,
            message: this.state.message,
            status:'unseen',
            date: new Date().getTime().toString()

        }
        this.props.dispatch(contctto(obj)).then(() => {
            this.setState({
                loading:false,alert: this.getAlert('success', 'Thanks we will response you soon')
            })
        },(error)=>{
            this.setState({
                loading:false
            })
        })


    }

    render() {
        return (
            <>
                <div className="faq-forum">
                    <div className="billing-form-item">

                        <div className="billing-title-wrap">
                            <h3 className="widget-title pb-0">Get in touch</h3>
                            <div className="title-shape margin-top-10px"></div>
                        </div>

                        <div className="billing-content">
                            <div className="contact-form-action">
                                <form method="post" onSubmit={this.handleContact}>
                                    <div className="input-box">
                                        <label className="label-text">Your name</label>
                                        <div className="form-group">
                                            <span className="form-icon"><AiOutlineUser /></span>
                                            <input className="form-control" type="text" name="name" value={this.state.username} onChange={this.onChangeUsername} placeholder="Your name" required="required" />
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <label className="label-text">Your email</label>
                                        <div className="form-group">
                                            <span className="form-icon"><FaRegEnvelope /></span>
                                            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email address" />
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <label className="label-text">message</label>
                                        <div className="form-group">
                                            <span className="form-icon"><BsPencil /></span>
                                            <textarea className="message-control form-control" name="message" value={this.state.message} onChange={this.onChangeMessage} placeholder="Write message" required="required"></textarea>
                                        </div>
                                    </div>
                                    <div className="btn-box">
                                        <button type="submit" className="theme-btn border-0">
                                            {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )} <i><RiSendPlane2Line /></i> send message
                                    </button>
                                    </div>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { rule } = state.common;
    return {
        rule
    };
}
export default connect(mapStateToProps)(AskQuestionField);