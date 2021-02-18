import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchCategory, getDefaultMeta, getPageinfo } from '../../services/action/common';
import LoadingOverlay from 'react-loading-overlay';
import MetaTag from '../metainfo';
class AllCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            breadcrumbImg: require('../../assets/images/bread-bg.jpg'),
            alllists: [],
            category: [],
            img: require('../../assets/images/img1.jpg'),
            loading: true,
            metainfo: null,
            defaultMetaTag: null,
        }
    }
    componentDidMount() {
        this.getpageseo({ page_type: 'category' })
        this.props.dispatch(fetchCategory({ for: 'LISTING',status:true })).then(() => {
            this.setState({ loading: false })
        },(error) => {

            this.setState({ loading: false })
        })

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
  
        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'
            >
                 { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || getDefaultMeta() }></MetaTag> : ''}

                <main className="all-categories">
                    {/* Header */}
                    <GeneralHeader />

                    {/* Breadcrumb */}
                    <>
                        <Breadcrumb CurrentPgTitle="All Categories" MenuPgTitle="Categories" img={this.state.breadcrumbImg} />


                        <section className="cat-area padding-top-40px padding-bottom-80px">
                            <div className="container">
                                <div className="row">
                                    { this.props.category.length > 0 ?  (this.props.category && this.props.category.map((item, index) => {
                                        return (
                                            <div className="col-lg-3 column-td-6" key={index}>
                                                <div className="category-item mb-4 mt-0 ml-0 mr-0 p-0">
                                                    <figure className="category-fig m-0">
                                                        <img src={item.imgsrc ? `${process.env.REACT_APP_API_KEY}utilities/${item.imgsrc}` : this.state.img} alt="" width="200px" height="200px" className="cat-img" />
                                                        <figcaption className="fig-caption">
                                                            <Link to={`/categories/${item.canonical_url}`} className="cat-fig-box">
                                                                <div className="icon-element mb-3">
                                                                    <i className={`${item.icon}`}></i>
                                                                </div>
                                                                <div className="cat-content">
                                                                    <h4 className="cat__title mb-3">{item.name}</h4>

                                                                </div>
                                                            </Link>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                        )
                                    })): (<div className="col-lg-3 column-td-6">
                                    <div className="category-item mb-4 mt-0 ml-0 mr-0 p-0">
                                        <figure className="category-fig m-0">
                                             <figcaption className="fig-caption">
                                                     
                                                    <div className="cat-content">
                                                        <h4 className="cat__title mb-3">there is no category</h4>

                                                    </div>
                                            
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>) }

                                </div>
                            </div>
                        </section>

                    </>

                    {/* NewsLetter */}
                    <NewsLetter />

                    {/* Footer */}
                    <Footer />

                    <ScrollTopBtn />

                </main>
            </LoadingOverlay>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { lists, categorylists } = state.list;
    const { category,pageinfo} = state.common;
    return {
        isLoggedIn, userdetails, lists, categorylists,category,pageinfo 

    };
}


export default connect(mapStateToProps)(AllCategories);