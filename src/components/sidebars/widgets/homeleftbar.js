import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import { connect } from "react-redux";
import { fetchCommunityList } from '../../../services/action/common';
import { Button } from 'react-bootstrap';
class HomeSidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: require('../../../assets/images/default.png'),
            communitydetails: {},
            title: "All Category Lists",
            communitylist: [],
            catid: null,
            lists: []
        }
    }

    componentDidMount() {
        
        this.props.dispatch(fetchCommunityList({ approved: true })).then(() => {
            this.setState({
                communitylist: this.props.communitylist
            })
        });
    }

    filterList = (originalcommunity) => {

        let updateList = originalcommunity;
        updateList = updateList.filter(item => {
            return item.country.toLowerCase().search(
                this.props.mylocation.country.toLowerCase()
            ) !== -1 || item.place.toLowerCase().search(
                this.props.mylocation.city.toLowerCase()
            ) !== -1 || item.place.toLowerCase().search(
                this.props.mylocation.state.toLowerCase()
            ) !== -1
        });

        return updateList
    }

    render() {

        const { communitylist } = this.props
        const map = new Map();
        let result = []
        communitylist.map(item => {
            if (map.has(item.category)) {
                let objIndex = result.findIndex((obj => obj.cat === item.category));
                result[objIndex].catNum = result[objIndex].catNum + 1;

            } else {
                map.set(item.category, true);    // set any value to Map
                result.push({
                    cat: item.category,
                    canonical_url:item.canonical_url,
                    catNum: 1
                });
            }
        })


        return (
            <>
                <div className="sidebar section-bg">
                    <div className="sidebar-widget">
                        <h3 className="widget-title">
                            Top community
                    </h3>
                        <div className="title-shape"></div>
                        <div className="cat-list padding-top-30px">
                            <ul className="list-items">

                                {this.state.communitylist && this.state.communitylist.length === 0 ?
                                    (
                                        <li className="mb-2 pb-2" >
                                            <Link to="#" className="d-flex justify-content-between align-items-center before-none">
                                                there is no related community
                                         </Link>

                                        </li>
                                    ) : this.state.communitylist.slice(0, 5).map((com, i) => {
                                        return (
                                            <li className="mb-2 pb-2" key={i}>
                                                <div className="author-bio margin-bottom-0px">
                                                    <div className="d-flex align-items-center">
                                                        {i + 1}- <img src={this.state.img} alt="author" />
                                                        <div className="author-inner-bio margin-right-2px">
                                                            <p>
                                                                <Link to={`/forum/r/${com.communityName}`}>{'r/' + com.communityName}</Link>
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                        )
                                    })
                                }

                            </ul>
                            <div className="btn-box text-center  padding-top-30px">
                                <Link to="/forum/community">  <Button className="mw-100 d-block" variant="danger" text="see all listings">
                                    <BsEye /> view All  Community
                                </Button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-widget">
                        <h3 className="widget-title">
                            Categories Community
                    </h3>
                        <div className="title-shape"></div>
                        <div className="cat-list padding-top-30px">
                            <ul className="list-items">

                                {result.length ? result.map((item, i) => {
                                    return (
                                        <li className="mb-2 pb-2" key={i}>
                                            <Link  className="d-flex justify-content-between align-items-center before-none">
                                                {item.cat} <span>{item.catNum}</span>
                                            </Link>
                                        </li>
                                    )
                                }) : ''}

                            </ul>
                        </div>
                               <div className="btn-box text-center  padding-top-30px">
                                <Link to="/forum/community">  <Button className="d-block" variant="danger">
                                <BsEye />  All Category
                                </Button></Link>
                            </div>
                    </div>

                    {
                        this.props.mylocation ? (<>

                            <div className="sidebar-widget">
                                <h3 className="widget-title">
                                    community Near you
                                 </h3>
                                <div className="title-shape"></div>
                                <div className="cat-list padding-top-30px">
                                    <ul className="list-items">

                                        {
                                        this.filterList(this.state.communitylist).map((com, i) => {
                                            return (
                                                <li className="mb-2 pb-2" key={i}>
                                                    <div className="author-bio margin-bottom-0px">
                                                        <div className="d-flex align-items-center">
                                                            {i + 1}- <img src={this.state.img} alt="author" />
                                                            <div className="author-inner-bio margin-right-2px">
                                                                <p>
                                                                    <Link to={`/forum/r/${com.communityName}`}>{'r/' + com.communityName}</Link>
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                            )
                                        })
                                        }

                                    </ul>

                                </div>
                            </div></>) : ''}


                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { communitydetails, communitylist } = state.community;
    const { message } = state.message;
    const { category, mylocation } = state.common;
    const { posts } = state.post;

    return {
        communitydetails, category, communitylist, posts, mylocation,
        message
    };
}
export default connect(mapStateToProps)(HomeSidebar);