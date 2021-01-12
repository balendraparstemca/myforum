import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import GenericHeader from "../../components/common/GenericHeader";
import {  fetchHomePost } from '../../services/action/post';
import { connect } from "react-redux";
import HomeSidebar from '../../components/sidebars/widgets/homeleftbar';
import { Helmet } from 'react-helmet';

class BlogFullWidth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: require('../../assets/images/default.png'),
            communitydetails: {},
            title: "All Category Lists",
            communitylist: [],
            catid: null,
            lists: []
        }
    }

    componentDidMount() {
        this.fetchpost()
    }

    fetchpost=async () => {
    
       return await this.props.dispatch(fetchHomePost({place:'India'}))
    }


    render() {
        return (
            <main className="List-map-view2">
                {/* Header */}
                <Helmet>
                    <title>forum</title>
                    <meta name="description" content="forum for casual desi Home" />
                    <meta name="keywords" content="welcome to casual desi forum you can create community and discuss usefull topic get information" />
                </Helmet>
                <GeneralHeader />

                <section className="blog-grid margin-top-190px  padding-bottom-100px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="margin-top-0px">
                                    <GenericHeader updatepostaftervote={this.fetchpost} />
                                </div>

                            </div>
                            <div className="col-lg-4">
                                <HomeSidebar />
                            </div>
                        </div>
                      
                    </div>
                </section>

                {/* Newsletter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />

            </main>
        );
    }
}


function mapStateToProps(state) {
    const { communitydetails, communitylist } = state.community;
    const { message } = state.message;
    const { category } = state.common;
    const { posts } = state.post;

    return {
        communitydetails, category, communitylist, posts,
        message
    };
}
export default connect(mapStateToProps)(BlogFullWidth);