import React from 'react';
import { BsEye } from 'react-icons/bs'
import { Link } from "react-router-dom";
import Button from '../common/Button';
import { connect } from "react-redux";
import { fetchCategory, fetchCommunityList } from '../../services/action/common';
import moment from 'moment';
import { Badge } from 'react-bootstrap';
import { FiRefreshCw } from 'react-icons/fi';
import LoadingOverlay from 'react-loading-overlay';
class CommunityList extends React.PureComponent {
    constructor() {
        super();
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            title: "Community Lists",
            community: [],
            isloading: true,
            img: require('../../assets/images/default.png'),
            catlink: '',
            visible: 10,
        }

    }

    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 6 };
        });
    }


    componentDidUpdate() {

        if (this.state.catlink !== this.props.categoryLink) {
               this.setState({ catlink: this.props.categoryLink, isloading: true })
            if (this.props.categoryLink) {
              
                let obj = { canonical_url: this.props.categoryLink }
                this.props.dispatch(fetchCategory(obj)).then(() => {
                    if (this.props.category && this.props.category.length > 0) {
                        const obj = { categoryid: this.props.category[0].cat_id, approved: true }
                        this.props.dispatch(fetchCommunityList(obj)).then(() => {
                            this.setState({
                                community: this.props.communitylist, isloading: false
                            })
                        }, (error) => {
                            this.setState({
                                isloading: false
                            })
                        });
                    }
                })
            }

            else {
                this.props.dispatch(fetchCommunityList({ approved: true })).then(() => {
                    this.setState({
                        community: this.props.communitylist, isloading: false
                    })
                }, (error) => {
                    this.setState({
                        isloading: false
                    })
                });

            }

        } 
    }

    render() {

        return (<>

            <LoadingOverlay
                active={this.state.isloading}
                spinner
                text='Loading your content...'
            >
                <div className="sidebar-widget similar-widget">
                    {this.state.title ? (
                        <h3 className="widget-title">{this.state.title}</h3>
                    ) : ''}
                    <div className="title-shape"></div>
                    <div className="similar-list padding-top-30px">

                        {this.state.community && this.state.community.length === 0 ?
                            (
                                <div className="btn-box text-center padding-top-30px">
                                    <Button url="#" text="no community list " className=" d-block">
                                        <span><BsEye /></span>
                                    </Button>
                                </div>
                            ) : this.state.community.slice(0, this.state.visible).map((com, i) => {
                                return (
                                    <div key={i} className="recent-item mb-3">
                                        <div className="recent-img">
                                            <Link to={`/r/${com.communityName}`}>
                                                <img src={this.state.img} alt="blog" />
                                            </Link>
                                        </div>
                                        <div className="recentpost-body">
                                            <h4 className="recent__link">
                                                <Link to={`/forum/r/${com.communityName}`}>{'r/' + com.communityName}</Link>
                                            </h4>
                                            <p className="recent__meta">{moment(Number(com.Date)).fromNow()}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="button-shared text-center margin-top-30px">
                                    {this.state.visible < this.state.community.length &&
                                        <Badge pill variant="danger" onClick={this.loadMore} className="border-0">
                                            <span className="d-inline-block">
                                                Load More <FiRefreshCw />
                                            </span>
                                        </Badge>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </LoadingOverlay>

        </>
        );
    }
}


function mapStateToProps(state) {
    const { communitylist } = state.community;
    const { category } = state.common;
    const { message } = state.message;

    return {
        communitylist, category,
        message
    };
}
export default connect(mapStateToProps)(CommunityList);