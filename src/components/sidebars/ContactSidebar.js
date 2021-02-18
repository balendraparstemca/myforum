import React, {Component} from 'react';
import { GoLocation } from 'react-icons/go'
import { FiPhone } from 'react-icons/fi'
import { FaRegEnvelope } from 'react-icons/fa'

class ContactSidebar extends Component {
    state = {
        title: 'Our Office',
        img: require('../../assets/images/bread-bg.jpg'),
        desc: 'You can ask us anything and suggest us any new things that we can add to help a fellow Indian in any country, we are all ears for you.',
        address: '5605 N MacArthur Blvd Suite 740 Irving, TX 75038',
        phoneNum: '703-829-5141',
        email: 'ears@casualdesi.com',
        opendays: 'Monday To Saturday',
        opendaytime: '9am - 7pm',
        closeday: 'Sunday'
    }
    render() {
        return (
            <>
                <div className="billing-form-item">
                    <div className="billing-title-wrap">
                        <h3 className="widget-title pb-0">
                            {this.state.title}
                        </h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="billing-content">
                        <div className="our-office-content">
                            <img src={this.state.img} alt="group-img" className="w-100 radius-round" />
                            <div className="section-heading mt-4 mb-4">
                                <p className="sec__desc font-size-15 line-height-24">
                                    {this.state.desc}
                                </p>
                            </div>
                            <ul className="info-list">
                                <li className="d-inline-block mb-2 mr-2">
                                    <span className="la"><GoLocation /></span> {this.state.address}
                                </li>
                                <li className="d-inline-block mb-2 mr-2">
                                    <span className="la"><FiPhone /></span> {this.state.phoneNum}
                                </li>
                                <li className="d-inline-block mb-2 mr-2">
                                    <span className="la"><FaRegEnvelope /></span> {this.state.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="billing-title-wrap pt-0">
                        <h3 className="widget-title pb-0">Working Hours</h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="billing-content">
                        <ul className="list-items">
                            <li className="d-flex align-items-center justify-content-between color-text-2">
                                <strong className="font-weight-medium">{this.state.opendays}</strong><strong className="font-weight-medium color-text-3">{this.state.opendaytime}</strong>
                            </li>
                            <li className="d-flex align-items-center justify-content-between color-text-2">
                                <strong className="font-weight-medium">{this.state.closeday}</strong><strong className="color-text">Closed</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default ContactSidebar;