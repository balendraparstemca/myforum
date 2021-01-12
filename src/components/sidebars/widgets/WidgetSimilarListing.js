import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getsimilarviewList } from '../../../services/action/list';

class WidgetSimilarListing extends Component {


    state = {
        title: 'Similar Listings',
        author: require('../../../assets/images/testi-img2.jpg'),
        listimg: require('../../../assets/images/img37.jpg'),
        cmid:null

    }

  

    componentDidUpdate() {
        if (this.state.cmid !== this.props.categoryid) {
            this.setState({ cmid: this.props.categoryid });
            const obj = {
                "city": this.props.city,
                "country": this.props.country,
                "state": this.props.state,
                "categoryid": this.props.categoryid
            }
            this.props.dispatch(getsimilarviewList(obj));
        }

    }

    render() {
      
        return (
            <>
                <div className="sidebar-widget similar-widget">
                    <h3 className="widget-title">
                        {this.state.title}
                    </h3>
                    <div className="title-shape"></div>
                    <div className="similar-list padding-top-30px">

                        {this.props.similarlists && this.props.similarlists.slice(0,5).map((item, i) => {
                            return (
                                <div className="recent-item" key={i}>
                                    <div className="recent-img">
                                        <Link to={`/listing-details/${item.canonicalurl}`}>
                                            <img src={item.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.bannerimg}` : this.state.listimage} className="card__img" alt={item.list_title} />

                                        </Link>
                                    </div>
                                    <div className="recentpost-body">
                                        <h4 className="recent__link">
                                            <Link to={`/listing-details/${item.canonicalurl}`}>
                                                {item.list_title}
                                            </Link>
                                        </h4>

                                        <p className="recent__meta">
                                            <span className="color-text font-weight-bold"></span> <Link to={`/listing-list/${item.categoryid}`}>{item.categoryname}</Link>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="btn-box text-center padding-top-30px">
                        
                    </div>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { listdetail, viewedlists, similarlists } = state.list;
    return {
        isLoggedIn, userdetails, listdetail, viewedlists, similarlists

    };
}
export default connect(mapStateToProps)(WidgetSimilarListing);