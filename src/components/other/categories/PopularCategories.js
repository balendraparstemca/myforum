import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { GiChickenOven } from 'react-icons/gi'
import { connect } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { fetchTopCategory } from '../../../services/action/common';
import LoadingOverlay from 'react-loading-overlay';
class PopularCategories extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alllists: [],
            category: [],
            img: require('../../../assets/images/bg.png'),
            previcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13 20c-.802 0-1.555-.312-2.122-.879l-7.121-7.121 7.122-7.121c1.133-1.133 3.11-1.133 4.243 0 .566.566.878 1.32.878 2.121s-.312 1.555-.879 2.122l-2.878 2.878 2.878 2.879c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.122c-.566.566-1.319.878-2.121.878zm-6.415-8l5.708 5.707c.378.378 1.037.377 1.414 0 .189-.189.293-.439.293-.707s-.104-.518-.293-.707l-4.292-4.293 4.292-4.293c.189-.189.293-.44.293-.707s-.104-.518-.293-.707c-.378-.379-1.037-.378-1.414-.001l-5.708 5.708z"></path></svg>',
            nextIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 20c-.802 0-1.555-.312-2.122-.879-.566-.566-.878-1.32-.878-2.121s.312-1.555.879-2.122l2.878-2.878-2.878-2.879c-.567-.566-.879-1.32-.879-2.121s.312-1.555.879-2.122c1.133-1.132 3.109-1.133 4.243.001l7.121 7.121-7.122 7.121c-.566.567-1.319.879-2.121.879zm0-14c-.268 0-.518.104-.707.292-.189.19-.293.441-.293.708s.104.518.293.707l4.292 4.293-4.292 4.293c-.189.189-.293.439-.293.707s.104.518.293.707c.378.379 1.037.378 1.414.001l5.708-5.708-5.708-5.707c-.189-.189-.439-.293-.707-.293z"></path></svg>',
            loaded:true
        }
    }

    componentDidMount() {

        this.fetchtopcategory();

    }

    fetchtopcategory = () => {
        this.props.dispatch(fetchTopCategory()).then(() => {
            this.setState({loaded:false})
            if (this.props.topcategory && this.props.topcategory.length > 0) {
                this.setState({ category: this.props.topcategory })

            }

        },(error) => {

            this.setState({ loaded: false })
        })
    }



    responsive = {
        // breakpoint from 0 up
        0: {
            items: 1
        },
        // breakpoint from 480 up
        350: {
            items: 2
        },
        // breakpoint from 768 up
        768: {
            items: 5
        }
    }


    category() {
        const array = this.state.alllists;
        const result = [];
        const map = new Map();

        for (const item of array) {
            if (map.has(item.listing.categoryname)) {
                let objIndex = result.findIndex((obj => obj.title === item.listing.categoryname));
                result[objIndex].stitle = result[objIndex].stitle + 1;

            }
            else {
                map.set(item.listing.categoryname, true);    // set any value to Map
                result.push({
                    id: item.listing.categoryid,
                    icon: <GiChickenOven />,
                    title: item.listing.categoryname,
                    stitle: 1,
                    img: require('../../../assets/images/img1.jpg')


                });
            }
        }


        this.setState({ category: result })

    }

    render() {

        return (
            <>

                <LoadingOverlay
                    active={this.state.loaded}
                    spinner
                    text='Loading your content...'
                >
                <div className="row">

                    {this.state.category && this.state.category.length > 0 ? this.state.category.map((item, index) => (

                        <div className="col-lg-12" key={index}>
                            <h2 className="card-title" style={{ color: "black", marginBottom: '10px' }}>{item.category.name}</h2>
                            <OwlCarousel
                                className="gallery-carousel"
                                loop={false}
                                margin={10}
                                autoplay={true}
                                nav={true}
                                navText={[this.state.previcon, this.state.nextIcon]}
                                smartSpeed={500}
                                items={5}
                                smartSpeed={500}
                                animateOut={"slideOutDown"}
                                animateIn={"fadeIn"}
                                responsive={this.responsive}
                            >


                                {item.subcategory && item.subcategory.map((item, index) => {
                                    return (
                                        <div className="card-item" key={index}>
                                            <div className="category-item mb-2 mt-0 ml-0 mr-0 p-0">
                                                <figure className="category-fig m-0">
                                                    <img src={item.imgsrc ? `${process.env.REACT_APP_API_KEY}utilities/${item.imgsrc}` : this.state.img} alt="" width="200px" height="200px" className="cat-img" />
                                                    <figcaption className="fig-caption">
                                                        <Link to={`/listing-list/${item.canonical_url}`} className="cat-fig-box">
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
                                })}


                            </OwlCarousel>

                        </div>


                    )) : ''}
                </div>
                </LoadingOverlay>

            </>
        );
    }
}

function mapStateToProps(state) {
    const { posts, isFetched } = state.post;
    const { isLoggedIn, userdetails } = state.auth;
    const { lists, categorylists } = state.list;
    const { category, topcategory } = state.common;
    return {
        isLoggedIn, topcategory, userdetails, lists, posts, isFetched, categorylists, category

    };
}
export default connect(mapStateToProps)(PopularCategories);
