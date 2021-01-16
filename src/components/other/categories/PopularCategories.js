import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { GiChickenOven } from 'react-icons/gi'
import { connect } from "react-redux";
import { gethomeList } from '../../../services/action/list';

class PopularCategories extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alllists: [],
            category: [],
            img: require('../../../assets/images/bg.png')
        }
    }
    componentDidMount() {

        this.fetchHomelists();

    }

    fetchHomelists = () => {
        this.props.dispatch(gethomeList()).then(() => {
            this.setState({
                alllists: this.props.lists, mainlists: this.props.lists
            })
            this.category();
        });
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
                <div className="row">
                    {this.props.category && this.props.category.slice(0, 7).map((item, index) => {
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
                    })}

                    <div className="col-lg-3 column-td-6" >
                        <div className="category-item mb-4 mt-0 ml-0 mr-0 p-0">
                            <figure className="category-fig m-0">
                                <img src={this.state.img} alt="" width="200px" height="200px" className="cat-img" />
                                <figcaption className="fig-caption">
                                    <Link to={`/categories`} className="cat-fig-box">
                                        <div className="icon-element mb-3">
                                            <i className={``}></i>...
                                        </div>
                                        <div className="cat-content">
                                            <h4 className="cat__title mb-3">more</h4>

                                        </div>
                                    </Link>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { lists, categorylists } = state.list;
    const { category } = state.common;
    return {
        isLoggedIn, userdetails, lists, categorylists, category

    };
}
export default connect(mapStateToProps)(PopularCategories);
