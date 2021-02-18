import React, {Component} from 'react';
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
import AskQuestionField from "../components/contact/AskQuestionField";
import ContactSidebar from "../components/sidebars/ContactSidebar";
import GeneralMap from "../components/contact/GeneralMap";
import { FiPhone } from 'react-icons/fi'
import { FaRegEnvelope } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import MetaTag from './metainfo';
import { getDefaultMeta, getPageinfo } from '../services/action/common';
import { connect } from "react-redux";

class Contact extends Component {
    state = {
        breadcrumbimg: require('../assets/images/hero-bg.jpg'),
        metainfo: null,
        defaultMetaTag: null,
    }

    componentDidMount()
    {
        this.getpageseo({ page_type: 'contact' })
    }



    getpageseo = (obj) => {
        this.props.dispatch(getPageinfo(obj)).then(() => {
            if (this.props.pageinfo.length > 0) {
                this.setState({
                    metainfo: {
                        title: this.props.pageinfo[0].meta_title,
                        canonicalURL: `https://www.casualdesi.com/contact || ''}`,
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
           { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || getDefaultMeta() }></MetaTag> : ''}

            <main className="contact-page">
                {/* Header */}
                <GeneralHeader />

                {/* Breadcrumb */}
                <Breadcrumb CurrentPgTitle="Contact Us" MenuPgTitle="pages" img={this.state.breadcrumbimg} />

                <section className="contact-area padding-top-40px padding-bottom-80px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <AskQuestionField/>
                            </div>

                            <div className="col-lg-5">
                                <ContactSidebar />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="gmaps">
                    <GeneralMap  lat="17.444529871100663" lang="78.43372183862219"/>
                    <div className="map-address-box">
                        <ul className="map-address">
                            <li>
                                <span className="la"><GoLocation /></span>
                                <h5 className="map__title">address</h5>
                                <p className="map__desc">
                                5605 N MacArthur Blvd <br />Suite 740 <br/>Irving, TX 75038
                                </p>
                            </li>
                            <li>
                                <span className="la"><FiPhone /></span>
                                <h5 className="map__title">phone</h5>
                                <p className="map__desc">Local: 703-829-5141</p>
                              
                            </li>
                            <li>
                                <span className="la"><FaRegEnvelope /></span>
                                <h5 className="map__title">email</h5>
                                <p className="map__desc">ears@casualdesi.com</p>
                                
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />

            </main></>
        );
    }
}


function mapStateToProps(state) {
    const { pageinfo } = state.common;
    return {
      pageinfo
       
    };
}
export default connect(mapStateToProps)(Contact);