import React, { Component } from 'react';
import { MdSort, MdStar} from 'react-icons/md'
import { FiRefreshCw } from 'react-icons/fi'
import SectionDivider from "../common/SectionDivider";
import { connect } from "react-redux";
import { Badge } from 'react-bootstrap';
import moment from 'moment';
import ReviewFields from './ReviewFields';
import { FaBuffer, FaRegStar } from 'react-icons/fa';
import { getlistreview } from '../../services/action/list';
import { Dropdown } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
class ListingDetailsComments extends Component {
    constructor(props) {
        super(props)
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            img: require('../../assets/images/testi-img1.jpg'),
            allcomment:[],
            maincomment:[],
            cmid:null,
            visible: 2,
        }

    }

    loadMore() {
        this.setState((prev) => {
          return {visible: prev.visible + 4};
        });
      }

   componentWillReceiveProps()
   {  
        if (this.state.cmid !== this.props.listid) {
            this.setState({ cmid: this.props.listid });
            this.getlistingcomment(this.props.listid)
      
         }
    }

    getlistingcomment=(listid)=>{
        this.props.dispatch(getlistreview({"listing_id":listid})).then(()=>{
            this.setState({
                allcomment:this.props.allreviewlist,maincomment:this.props.allreviewlist
            })
        })
    }

    sortByhighrating = () => {
        let lists = this.state.maincomment;

        let arr = lists.sort(function (a, b) {
            return Number(b.stars) - Number(a.stars);
        });

        this.setState({ allcomment: arr })
    }

    sortByold = () => {
        let lists = this.state.maincomment;

        let arr = lists.sort(function (a, b) {
            return Number(a.date) - Number(b.date);
        });
      
        this.setState({ allcomment: arr })

    }

     percentage=(num, total) =>{
         if(total===0)
         {
             return 0;
         } else{
            let occur=this.props.allreviewlist && this.props.allreviewlist.filter(obj => Number(obj.stars) === num).length;
            return ((occur / total) * 100).toFixed(1)
          }
      }

   

    Sort=(id)=>{
       if(id===3)
       {
        this.sortByhighrating()
       }
       if(id===2)
       {
           this.sortByold()

       }
      
    
    }


    render() {

        var val = this.props.allreviewlist.length > 0 ? this.props.allreviewlist.reduce(function (previousValue, currentValue) {
            return {
                stars: Number(previousValue.stars) + Number(currentValue.stars),
            }
        }) : 0

    

        return (
            <>{/* feedback anlyzation */}
          <div className="review-content-wrap">
                                            <h2 className="widget-title">
                                                {'Feedback'}
                                            </h2>
                                            <div className="title-shape"></div>
                                            <div className="review-content padding-top-45px padding-bottom-40px">
                                                <div className="review-rating-summary">
                                                    <div className="review-rating-summary-inner">
                                                        <div className="stats-average__count">
                                                            <span className="stats-average__count-count">{val && (val.stars / this.props.allreviewlist.length).toFixed(1)}</span>
                                                        </div>
                                                        <div className="stats-average__rating">
                                                            <div className="rating-rating d-flex">
                                                            <div className="rating-rating">
                                                                <span>
                                                                    {
                                                                        this.props.allreviewlist && this.props.allreviewlist.length > 0 ? (
                                                                            <ReactStars
                                                                            count={5}
                                                                            size={18}
                                                                            value={parseFloat(val.stars / this.props.allreviewlist.length).toFixed(1)}
                                                                            isHalf={true} />

                                                                        ) : ''
                                       

                                                                    }
                                                                 </span>
                                                                
                                                            </div>
                                                           
                                                            </div>
                                                          
                                                        </div>
                                                    </div>
                                                    <div className="course-rating-text">
                                                        <p className="course-rating-text__text">Rating</p>
                                                    </div>
                                                </div>
                                                <div className="review-rating-widget">
                                                    <div className="review-rating-rate">
                                                         
                                                  
                                                        <ul>
                                                            <li className="row">
                                                            <div className="col-2">5 stars</div>
                                                               <div className="col-8"><ProgressBar variant="warning" now={this.percentage(5,this.state.allcomment && this.state.allcomment.length) || 0 } />
                                                              </div>
                                                             <div className="col-2">{this.percentage(5,this.state.allcomment && this.state.allcomment.length) || 0 } %</div>
                                                         
                                                           </li>
                                                           <li className="row">
                                                            <div className="col-2">4 stars</div>
                                                               <div className="col-8"><ProgressBar  variant="warning" now={this.percentage(4,this.state.allcomment && this.state.allcomment.length) || 0 } />
                                                              </div>
                                                             <div className="col-2">{this.percentage(4,this.state.allcomment && this.state.allcomment.length) || 0 } %</div>
                                                         
                                                           </li>

                                                           <li className="row">
                                                            <div className="col-2">3 stars</div>
                                                               <div className="col-8"><ProgressBar  variant="warning" now={this.percentage(3,this.state.allcomment && this.state.allcomment.length) || 0 } />
                                                              </div>
                                                             <div className="col-2">{this.percentage(3,this.state.allcomment && this.state.allcomment.length) || 0 } %</div>
                                                         
                                                           </li>

                                                           <li className="row">
                                                            <div className="col-2">2 stars</div>
                                                               <div className="col-8"><ProgressBar variant="warning" now={this.percentage(2,this.state.allcomment && this.state.allcomment.length) || 0 } />
                                                              </div>
                                                             <div className="col-2">{this.percentage(2,this.state.allcomment && this.state.allcomment.length) || 0 } %</div>
                                                         
                                                           </li>
                                                           <li className="row">
                                                            <div className="col-2">1 stars</div>
                                                               <div className="col-8"><ProgressBar variant="warning" now={this.percentage(1,this.state.allcomment && this.state.allcomment.length) || 0 } />
                                                              </div>
                                                             <div className="col-2">{this.percentage(1,this.state.allcomment && this.state.allcomment.length) || 0 } %</div>
                                                         
                                                           </li>
                                                           
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* feedback anlyzation */}
                                        
                                 <ReviewFields listingid={this.props.listid && this.props.listid} fetchlistcomment={this.getlistingcomment}/>
                              <hr></hr>
                             <h2 className="widget-title">
                    {this.state.allcomment && this.state.allcomment.length} Reviews
                        </h2>

             <Dropdown className="float-right">
                 <Dropdown.Toggle variant="default" id="dropdown-basic">
                 Sort By <MdSort />
                   </Dropdown.Toggle>

                        <Dropdown.Menu>
                             <Dropdown.Item onClick={() => this.Sort(2)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Sort By default</Dropdown.Item> 
                             <Dropdown.Item onClick={() => this.Sort(2)}> <FaBuffer/> Sort By Old</Dropdown.Item> 
                             <Dropdown.Item onClick={() => this.Sort(3)}><FaRegStar/> Sort By High Rating</Dropdown.Item> 
                    
                        </Dropdown.Menu>
            </Dropdown>


                <div className="title-shape"></div>
                <ul className="comments-list padding-top-40px">
                    <li>

                        { this.state.allcomment && this.state.allcomment.slice(0, this.state.visible).map((item, i) => {
                            return (
                                <>
                                    <div className="comment" key={i + 1}>
                                        <img className="avatar__img" alt="Comment" src={this.state.img} />
                                        <div className="comment-body">
                                            <div className="meta-data">
                                                  <div className="rating-rating"></div>
                                                <span className="comment__author">
                                                    {item.name}
                                                </span>
                                                <span className="comment__date">
                                                    {moment(Number(item.date)).fromNow()}
                                                </span>
                                                <div className="rating-rating ">
                                                    {[...Array(Number(item.stars))].map((star, index) => {
                                                        return <span key={index} className="la la-star"> <MdStar /></span>
                                                    })}

                                                </div>
                                            </div>
                                            <p className="comment-content mt-5">
                                                {item.review_text}
                                            </p>
                                            <div className="comment-reply d-flex justify-content-between align-items-center">

                                                <p className="feedback-box">
                                                   -----------------------------------------------------------
                                                  

                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        })}
                    </li>
                </ul>
                <SectionDivider />
                <div className="button-shared padding-top-40px text-center">
                { this.state.visible < this.state.allcomment.length &&    <Badge variant="danger" className="border-0" onClick={this.loadMore}>
                       Load more <FiRefreshCw />
                    </Badge>
                 }
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { allreviewlist } = state.list;
    return {
        isLoggedIn, userdetails, allreviewlist

    };
}
export default connect(mapStateToProps)(ListingDetailsComments);