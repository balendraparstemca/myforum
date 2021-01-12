import React, { Component } from 'react'
import GeneralHeader from '../../components/common/GeneralHeader'
import BannerOne from '../../components/banner/banner1/BannerOne'
import SectionsHeading from "../../components/common/SectionsHeading";
import PopularCategories from "../../components/other/categories/PopularCategories";
import Toplisting from "../../components/places/toplist";
import InfoBox2 from "../../components/other/infoboxes/InfoBox2";
import Button from "../../components/common/Button";
import SectionDivider from "../../components/common/SectionDivider";
import ClientLogo from "../../components/sliders/ClientLogo";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { connect } from "react-redux";
import { fetchCategory, getAddress } from '../../services/action/common';
import PopularPosts from '../../components/places/popularposts';
import { getpeopleviewList } from '../../services/action/list';
import { fetchHomePost } from '../../services/action/post';
class Home extends Component {


    componentDidMount() {
        this.fetchcurrentlocation()
        this.props.dispatch(fetchCategory())
        this.fetchtoplistnear();
        this.fetchtoppostsnearyou();

    }



    fetchcurrentlocation = async () => {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                const result =await getAddress(position.coords.latitude, position.coords.longitude)
                if(result)
                {
                    console.log(result.results[0].formatted_address)
                    const addressArray =  result.results[0].address_components;
                     console.log(addressArray)
                  
                }
               
            }, function (error) {
                 }
        );
    }

    fetchtoplistnear= async () => {
        const obj = {
            "city": '',
            "country": '',
            "state": ''
        }
      return await this.props.dispatch(getpeopleviewList(obj));
    }

    fetchtoppostsnearyou =  () => {
          this.props.dispatch(fetchHomePost({place: 'India' }))
    }

    render() {

        return (
            <main className="home-1">
                {/* Header */}
                <GeneralHeader />

                {/* Hero Banner */}
                <BannerOne />

                {/* Popular Categories */}
                <section className="cat-area padding-top-10px padding-bottom-10px">
                    <div className="container">
                        <div className="row section-title-width text-center">
                            <SectionsHeading title="Browse by Categories" desc="Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortors." />
                        </div>
                        <div className="row mt-5">

                            <PopularCategories />
                        </div>
                    </div>
                </section>
                {/* How It Word */}
                <section className="hiw-area padding-top-10px padding-bottom-10px after-none text-center">
                    <div className="container">
                        <div className="row section-title-width text-center">
                            <SectionsHeading title="What We Offer" desc="Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortors." />
                        </div>

                        <InfoBox2 />
                    </div>
                </section>

                {/* CTA */}

                <SectionDivider />

                {/* Blog */}
                <section className="blog-area padding-top-100px padding-bottom-80px">
                    <div className="container">
                        <div className="row section-title-width section-title-ml-mr-0">
                            <div className="col-lg-8">
                                <SectionsHeading title="Popular Places near you" desc="Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortors." />
                            </div>
                            <div className="col-lg-4">
                                <div className="btn-box h-100 d-flex align-items-center justify-content-end">
                                    <Button text="view all Lists" url="/listing-list/search/?q=nearme" className=" margin-top-100px" />
                                </div>
                            </div>
                        </div>
                        <Toplisting city="" country="" state="" />
                        <div className="row section-title-width section-title-ml-mr-0">
                            <div className="col-lg-8">
                                <SectionsHeading title="Popular Posts near you" desc="Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortors." />
                            </div>
                            <div className="col-lg-4">
                                <div className="btn-box h-100 d-flex align-items-center justify-content-end">
                                    <Button text="view all post" url="/forum/home" className=" margin-top-100px" />
                                </div>
                            </div>
                        </div>

                        <PopularPosts />
                    </div>
                </section>



                {/* Client Logo */}
                <ClientLogo />

                {/* NewsLetter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />
            </main>
        )
    }
}

function mapStateToProps(state) {
    const { posts } = state.post;
    const { isLoggedIn, userdetails } = state.auth;
    const { category } = state.common;
    return {
        isLoggedIn, category, userdetails, posts

    };
}
export default connect(mapStateToProps)(Home);
