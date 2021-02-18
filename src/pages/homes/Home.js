import React, { Component } from 'react'
import GeneralHeader from '../../components/common/GeneralHeader'
import BannerOne from '../../components/banner/banner1/BannerOne'
import SectionsHeading from "../../components/common/SectionsHeading";
import PopularCategories from "../../components/other/categories/PopularCategories";
import Toplisting from "../../components/places/toplist";
import InfoBox2 from "../../components/other/infoboxes/InfoBox2";
import SectionDivider from "../../components/common/SectionDivider";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { connect } from "react-redux";
import { fetchCategory, getDefaultMeta, getGeoInfo, getPageinfo } from '../../services/action/common';
import MetaTag from '../metainfo';


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            metainfo: null,
            defaultMetaTag: null
        }

    }


    componentDidMount() {
        this.fetchlocationbyipaddress()
        this.getpageseo({ page_type: 'home' })
        this.props.dispatch(fetchCategory({  for: 'LISTING',status:true}))

    }


    getpageseo = (obj) => {
        this.props.dispatch(getPageinfo(obj)).then(() => {
            if (this.props.pageinfo.length > 0) {
                this.setState({
                    metainfo: {
                        title: this.props.pageinfo[0].meta_title,
                        canonicalURL: `https://www.casualdesi.com${this.props.location.pathname || ''}`,
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



    // fetchcurrentlocation = async () => {
    //     navigator.geolocation.getCurrentPosition(
    //         async function (position) {
    //             const result = await getAddress(position.coords.latitude, position.coords.longitude)
    //             if (result) {
    //                 console.log(result)
    //             }

    //         }, function (error) {
    //         }
    //     );
    // }

    fetchlocationbyipaddress = () => {
        getGeoInfo()

    }

    render() {

        return (<>
            { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || this.state.defaultMetaTag}></MetaTag> : ''}

            <main className="blog-left-sidebar-page">
                {/* Header */}
                <GeneralHeader />

                {/* Hero Banner */}
                <BannerOne />

                {/* Popular Categories */}
                <section className="cat-area padding-top-50px padding-bottom-0px">

                    <div className="container">
                        <div className="row section-title-width text-center">
                            <SectionsHeading title="Top Categories" desc="Let it be an Immigration question you have or a Indian roommate or Indian event or a movie near by you, we got you covered" />
                        </div>
                        <PopularCategories />
                    </div>
                </section>
                {/* How It Word */}
                <section className="hiw-area  text-center">
                    <div className="container">
                        <div className="row section-title-width text-center">
                            <SectionsHeading title="What We Offer" desc="We help you find any thing Desi Around you, let it be in any part of the world you live. From Indian Restaurant to a Desi Nanny or a near by local Desi event " />
                        </div>

                        <InfoBox2 />
                    </div>
                </section>

                {/* CTA */}

                <SectionDivider />


                {/* neares lists and post */}


                <Toplisting myloc={this.props.mylocation && this.props.mylocation} />




                {/* Client Logo */}
                {/* <ClientLogo /> */}

                {/* NewsLetter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />
            </main>
        </>
        )
    }
}

function mapStateToProps(state) {
    const { posts } = state.post;
    const { isLoggedIn, userdetails } = state.auth;
    const { category, topcategory, mylocation, pageinfo } = state.common;
    return {
        isLoggedIn, category, userdetails, posts, pageinfo, topcategory, mylocation

    };
}
export default connect(mapStateToProps)(Home);
