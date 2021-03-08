import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { IoIosCheckmarkCircle, IoIosLink } from 'react-icons/io'
import { AiOutlineEye } from 'react-icons/ai'
import { FiPhone, FiHeart } from 'react-icons/fi'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactStars from "react-rating-stars-component";
import { BsFillAlarmFill, BsPeopleCircle } from 'react-icons/bs';
import SectionsHeading from '../common/SectionsHeading';
import Button from "../../components/common/Button";
import { gethomeList, getpeopleviewList } from '../../services/action/list';
import { fetchHomePost } from '../../services/action/post';
class Toplisting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            viewlist: [],
            previcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13 20c-.802 0-1.555-.312-2.122-.879l-7.121-7.121 7.122-7.121c1.133-1.133 3.11-1.133 4.243 0 .566.566.878 1.32.878 2.121s-.312 1.555-.879 2.122l-2.878 2.878 2.878 2.879c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.122c-.566.566-1.319.878-2.121.878zm-6.415-8l5.708 5.707c.378.378 1.037.377 1.414 0 .189-.189.293-.439.293-.707s-.104-.518-.293-.707l-4.292-4.293 4.292-4.293c.189-.189.293-.44.293-.707s-.104-.518-.293-.707c-.378-.379-1.037-.378-1.414-.001l-5.708 5.708z"></path></svg>',
            nextIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 20c-.802 0-1.555-.312-2.122-.879-.566-.566-.878-1.32-.878-2.121s.312-1.555.879-2.122l2.878-2.878-2.878-2.879c-.567-.566-.879-1.32-.879-2.121s.312-1.555.879-2.122c1.133-1.132 3.109-1.133 4.243.001l7.121 7.121-7.122 7.121c-.566.567-1.319.879-2.121.879zm0-14c-.268 0-.518.104-.707.292-.189.19-.293.441-.293.708s.104.518.293.707l4.292 4.293-4.292 4.293c-.189.189-.293.439-.293.707s.104.518.293.707c.378.379 1.037.378 1.414.001l5.708-5.708-5.708-5.707c-.189-.189-.439-.293-.707-.293z"></path></svg>',
            author: require('../../assets/images/testi-img2.jpg'),
            listimage: require('../../assets/images/bread-bg.jpg'),
            img: require('../../assets/images/post.png'),
            cmid: null,
            catid: undefined

        }
    }

    componentDidMount() {

    }
    componentDidUpdate() {
        if (this.state.catid !== this.props.myloc) {
            this.setState({ catid: this.props.myloc });
            this.fetchtoplistnear(this.props.myloc)
            this.fetchtoppostsnearyou(this.props.myloc)
        }
    }


    fetchtoplistnear = (loc) => {
        const obj = {
            "city": loc.city,
            "country": loc.country,
            "state": loc.state
        }

        return this.props.dispatch(getpeopleviewList(obj));
    }

    fetchtoppostsnearyou = (loc) => {
        const obj = { place: loc.city, country: loc.country };
        this.props.dispatch(fetchHomePost(obj))
    }

    fetchHomelists = () => {

        this.props.dispatch(gethomeList())
    }

    fetchhomepost = () => {

        this.props.dispatch(fetchHomePost({ place: 'India' }))
    }




    responsive1 = {
        // breakpoint from 0 up
        0: {
            items: 1
        },
        // breakpoint from 480 up
        480: {
            items: 1
        },
        // breakpoint from 768 up
        768: {
            items: 3
        }
    }

    responsive = {
        // breakpoint from 0 up
        0: {
            items: 1
        },
        // breakpoint from 480 up
        480: {
            items: 1
        },
        // breakpoint from 768 up
        768: {
            items: 4
        }
    }

    render() {

        return (<>

            <section className="blog-area">
                <div className="container">
                    <div className="row section-title-width section-title-ml-mr-0">
                        <div className="col-lg-8">
                            <SectionsHeading title="Popular Things near you" desc="Seriously you can search and find anything Indian near by you. Temples to Grocery Stores to Cricket Events and more…." />
                        </div>
                        <div className="col-lg-4">
                            <div className="btn-box h-100 d-flex align-items-center justify-content-end">
                                <Button text="view all Lists Near You" url="/listing-list/search/?q=nearme" className=" margin-top-100px" />
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-lg-12">
                            {this.props.viewedlists && this.props.viewedlists.length > 0 ? (


                                <OwlCarousel
                                    className="gallery-carousel mt-5"
                                    loop={false}
                                    margin={10}
                                    autoplay={true}
                                    nav={true}
                                    dots={false}
                                    navText={[this.state.previcon, this.state.nextIcon]}
                                    rewind={true}
                                    items={3}
                                    smartSpeed={10000}

                                    responsive={this.responsive1}
                                >
                                    { this.props.viewedlists && this.props.viewedlists.map((item, index) => {
                                        return (
                                            <div className="card-item" key={index}>
                                                <Link to={`/listing-details/${item.listing.canonicalurl}`} className="card-image-wrap">
                                                    <div className="card-image">
                                                        <img src={item.listing.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.bannerimg}` : this.state.listimage} className="card__img" alt={item.listing.list_title} width="200px" height="200px" />
                                                        <span className='badge'>{item.listing.badge_status ? item.listing.badge_status : ''}</span>
                                                        <span className="badge-toggle" data-toggle="tooltip" data-placement="bottom" title={item.listing.likes}>
                                                            <FiHeart />
                                                        </span>
                                                    </div>
                                                </Link>
                                                <div className="card-content-wrap">
                                                    <div className="card-content">
                                                        <Link to={`/listing-list/${item.listing.canonical_url}`}>
                                                            <h5 className="card-meta">
                                                                <span><i className={item.listing.icon}></i></span> {item.listing.categoryname}
                                                            </h5>
                                                        </Link>
                                                        <Link to={`/listing-details/${item.listing.canonicalurl}`}>

                                                            <h4 className="card-title">{item.listing.list_title}
                                                                <i><IoIosCheckmarkCircle /></i>
                                                            </h4>
                                                            <p className="card-sub">
                                                                {item.listing.address}
                                                            </p>
                                                        </Link>
                                                        <Link to={`/user-profile/${item.listing.username}`} className="author-img" >
                                                            <img src={item.listing.profileimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.profileimg}` : this.state.author} alt="author-img" />
                                                        </Link>
                                                        <ul className="info-list padding-top-20px">
                                                            <li><span className="la d-inline-block"><FiPhone /></span> {item.listing.phone}</li>
                                                            <li><span className="la d-inline-block"><IoIosLink /></span>  <a target="_blanc" href={item.listing.website}>
                                                                {item.listing.website.replace(/^https:\/\//, '')}
                                                            </a>
                                                            </li>
                                                            <li>
                                                                <span className="la d-inline-block"><FaRegCalendarCheck /></span>posted {moment(Number(item.listing.creating_time)).fromNow()}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="rating-row">
                                                        <div className="listing-info">
                                                            <ul>

                                                                <li><span> <ReactStars
                                                                    count={5}
                                                                    size={24}
                                                                    value={item.rating[0].rating ? parseFloat(item.rating[0].rating).toFixed(1) : 0}
                                                                    isHalf={true} /> </span> </li>
                                                                <li> <span className="info__count"> {parseFloat(item.rating[0].rating).toFixed(1)}</span></li>
                                                            </ul>
                                                        </div>
                                                        <div className="listing-info">
                                                            <ul>
                                                                <li><span className="info__count"><AiOutlineEye /></span> {item.listing.view}</li>

                                                                <li>
                                                                    <span className="info__count">   <FiHeart /></span> {item.listing.likes}
                                                                </li>

                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}


                                </OwlCarousel>) : ''}

                        </div>
                    </div>

                    <div className="row section-title-width section-title-ml-mr-0">
                        <div className="col-lg-8">
                            <SectionsHeading title="Popular Posts near you" desc="Any question related to Indian abroad is answered here, let it be a immigration question, business question or a simple gossip discussion, our forums have everything you need" />
                        </div>
                        <div className="col-lg-4">
                            <div className="btn-box h-100 d-flex align-items-center justify-content-end">
                                <Button text="view all post" url="/forum/home" className=" margin-top-100px" />
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-lg-12">
                            {this.props.posts && this.props.posts.length > 0 ? (
                                <OwlCarousel
                                    className="gallery-carousel mt-5"
                                    loop={false}
                                    margin={10}
                                    autoplay={true}
                                    nav={true}
                                    navText={[this.state.previcon, this.state.nextIcon]}
                                    dots={true}
                                    smartSpeed={1000}
                                    items={4}
                                    smartSpeed={10000}
                                    responsive={this.responsive}
                                >


                                    { this.props.posts && this.props.posts.map((post, index) => {
                                        return (
                                            <div className="card-item" key={index}>
                                                <Link to={`/forum/post/${post.canonicalurl}`} className="card-image-wrap">
                                                    <div className="card-image">
                                                        {post.imgSrc ? <img src={`${process.env.REACT_APP_API_KEY}utilities/${post.imgSrc}`} alt={post.title} className="card__img" width="200px" height="200px" /> : <img src={this.state.img} width="200px" height="200px" alt={post.title} />}
                                                    </div>
                                                    <h5>  <span className="badge badge-secondary badge-pill">{post.flare_tag}</span></h5>

                                                </Link>
                                                <div className="card-content-wrap">
                                                    <Link to={{ pathname: `/forum/post/${post.canonicalurl}`, aboutProps: { postid: post.post_id } }} style={{ textDecoration: 'none', color: 'black' }} className="thumbnail self" >
                                                        <b> {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}</b></Link>
                                                    <p>
                                                        <Link to={`/forum/r/${post.com_name}`}><b> <BsPeopleCircle /> r/{post.com_name}</b></Link> <BsFillAlarmFill /> <span>{moment(Number(post.post_time)).fromNow()}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}


                                </OwlCarousel>) : ''}

                        </div>
                    </div>

                </div>
            </section>


        </>);
    }
}


function mapStateToProps(state) {
    const { posts, isFetched } = state.post;
    const { isLoggedIn, userdetails } = state.auth;
    const { listdetail, viewedlists, lists } = state.list;
    return {
        isLoggedIn, userdetails, listdetail, viewedlists, lists, posts, isFetched

    };
}
export default connect(mapStateToProps)(Toplisting);