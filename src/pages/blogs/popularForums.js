import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import GenericHeader from "../../components/common/GenericHeader";
import { fetchPopularPost } from '../../services/action/post';
import PopularPosts from '../../components/places/popularposts';
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import HomeSidebar from '../../components/sidebars/widgets/homeleftbar';
import { getDefaultMeta, getGeoInfo, getPageinfo } from '../../services/action/common';
import MetaTag from '../metainfo';
class PopularForum extends Component {
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
        getGeoInfo()
        this.fetchpost()
        this.getpageseo({ page_type: 'forum' })
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

    fetchpost = async () => {

        return await this.props.dispatch(fetchPopularPost())
    }


    render() {
        return (<>
         { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || getDefaultMeta()}></MetaTag> : ''}

            <main className="List-map-view">
                <Helmet>
                    <title>Popular</title>
                    <meta name="description" content="forum for casual desi Popular" />
                    <meta name="keywords" content="welcome to casual desi forum you can create community and discuss usefull topic get information popular,forums casucal desi" />
                </Helmet>
                {/* Header */}
                <GeneralHeader />
                <section className="blog-grid padding-bottom-100px">


                    <div className="container">
                        <div className="row">
                           
                            <div className="margin-top-150px margin-bottom-10px col-lg-12">
                            
                                <PopularPosts></PopularPosts>
                            </div>
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
            </>
        );
    }
}


function mapStateToProps(state) {
    const { communitydetails, communitylist } = state.community;
    const { message } = state.message;
    const { category,pageinfo } = state.common;
    const { posts } = state.post;

    return {
        communitydetails, category, communitylist, posts,pageinfo,
        message
    };
}
export default connect(mapStateToProps)(PopularForum);