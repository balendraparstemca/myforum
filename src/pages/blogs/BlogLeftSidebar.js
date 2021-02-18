import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import ForumCategory from '../../components/sidebars/widgets/forumCategory';
import CommunityList from '../../components/blogs/communityList';
import { connect } from "react-redux";
import { getDefaultMeta, getPageinfo } from '../../services/action/common';
import MetaTag from '../metainfo';
class BlogLeftSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
            metainfo: null,
            defaultMetaTag: null,
        }
    }
    componentDidMount() {
        this.getpageseo({ page_type: 'community' })
       
      
    }

        
    getpageseo = (obj) => {
        this.props.dispatch(getPageinfo(obj)).then(() => {
            if (this.props.pageinfo.length > 0) {
                this.setState({
                    metainfo: {
                        title: this.props.pageinfo[0].meta_title,
                        canonicalURL: `https://www.casualdesi.com/forum/community`,
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

            } 
        })
    }

    

    render() {

        return (<>
          { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || getDefaultMeta() }></MetaTag> : ''}

      
            <main className="blog-left-sidebar-page">
                {/* Header */}
                <GeneralHeader />

                {/* Breadcrumb */}
                <Breadcrumb CurrentPgTitle="Forum community" MenuPgTitle="Forum" img={this.state.breadcrumbimg} />

                <section className="blog-left-sidebar padding-top-40px padding-bottom-100px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="sidebar section-bg">

                                    <ForumCategory />


                                </div>
                            </div>
                            <div className="col-lg-4">
                                <CommunityList categoryLink={this.props.match.params.categoryid} />
                            </div>

                            <div className="col-lg-4">

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">

                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <NewsLetter />

                {/* Footer*/}
                <Footer />

                <ScrollTopBtn />

            </main>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { communitylist } = state.community;
    const { pageinfo } = state.common;
    const { message } = state.message;

    return {
        communitylist, pageinfo,
        message
    };
}
export default connect(mapStateToProps)(BlogLeftSidebar);