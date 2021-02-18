import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { BsFillAlarmFill, BsPeopleCircle } from 'react-icons/bs';
import moment from 'moment';
class PopularPosts extends Component {
    states = {
        img: require('../../assets/images/post.png'),
        previcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13 20c-.802 0-1.555-.312-2.122-.879l-7.121-7.121 7.122-7.121c1.133-1.133 3.11-1.133 4.243 0 .566.566.878 1.32.878 2.121s-.312 1.555-.879 2.122l-2.878 2.878 2.878 2.879c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.122c-.566.566-1.319.878-2.121.878zm-6.415-8l5.708 5.707c.378.378 1.037.377 1.414 0 .189-.189.293-.439.293-.707s-.104-.518-.293-.707l-4.292-4.293 4.292-4.293c.189-.189.293-.44.293-.707s-.104-.518-.293-.707c-.378-.379-1.037-.378-1.414-.001l-5.708 5.708z"></path></svg>',
        nextIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 20c-.802 0-1.555-.312-2.122-.879-.566-.566-.878-1.32-.878-2.121s.312-1.555.879-2.122l2.878-2.878-2.878-2.879c-.567-.566-.879-1.32-.879-2.121s.312-1.555.879-2.122c1.133-1.132 3.109-1.133 4.243.001l7.121 7.121-7.122 7.121c-.566.567-1.319.879-2.121.879zm0-14c-.268 0-.518.104-.707.292-.189.19-.293.441-.293.708s.104.518.293.707l4.292 4.293-4.292 4.293c-.189.189-.293.439-.293.707s.104.518.293.707c.378.379 1.037.378 1.414.001l5.708-5.708-5.708-5.707c-.189-.189-.439-.293-.707-.293z"></path></svg>',
       

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
      
        return (
            <div className="row">

                <div className="col-lg-12 mt-3">
                   <b>Trending Posts</b>
                    <OwlCarousel
                        className="gallery-carousel mt-2"
                        loop={false}
                        margin={10}
                        autoplay={true}
                        nav={true}
                        navText={[this.states.previcon, this.states.nextIcon]}
                        dots={true}
                        smartSpeed={1000}
                        items={4}
                        smartSpeed={10000}
                         responsive={this.responsive}
                    >


                        {this.props.posts && this.props.posts.map((post, index) => {
                            return (
                                <div className="card-item" key={index}>
                                                                   <Link to={`/forum/post/${post.canonicalurl}`} className="card-image-wrap">
                                        <div className="card-image">
                                            {post.imgSrc ? <img src={`${process.env.REACT_APP_API_KEY}utilities/${post.imgSrc}`} alt={post.title} className="card__img" width="200px" height="200px" /> : <img src={this.states.img} width="200px" height="200px" alt={post.title}/>}
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


                    </OwlCarousel>

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { posts, isFetched } = state.post;
    const { userdetails, isLoggedIn } = state.auth;
    return {
        posts, isFetched, userdetails, isLoggedIn
    };
}
export default connect(mapStateToProps)(PopularPosts);