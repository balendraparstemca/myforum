import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class BannerOneCategories extends Component {
    state = {
        connector: 'or',
        title: 'browse featured categories:',
      
    };
    render() {
      
        let categorytwo = [];
        categorytwo = this.props.category && this.props.category.length > 0 ? this.props.category.map(cat => {
            return { path: `${cat.canonical_url}`, title: `${cat.name}`, icon: <i class={`${cat.icon}`}></i> };
        }) : [{ path: "", title: "no category" }]

        return (
            <>
                <div className="highlighted-categories">

                    <h5 className="highlighted__title">
                        {this.state.title}
                    </h5>
                    <div className="highlight-lists d-flex justify-content-center mt-4">
                        {categorytwo && categorytwo.length === 0 ? (
                            <div className="category-item float-center">
                                <Link to='' className="d-block">
                                    <span className="icon-element"></span>
                                 no categories fetched
                             </Link>
                            </div>
                        ) : categorytwo && categorytwo.slice(0, 8).map((item, index) => {
                            return (
                                <div className="category-item" key={index}>
                                    <Link to={`/categories/${item.path}`} className="d-block">
                                        <span className="icon-element">{item.icon}</span>
                                        {item.title}
                                    </Link>
                                </div>
                            )
                        })

                        }

                        <div className="category-item float-center">
                            <Link to='/categories' className="d-block">
                                <span className="icon-element">...</span>
                                 more
                             </Link>
                        </div>


                    </div>
                </div>
            </>
        )
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { category } = state.common;
    return {
        isLoggedIn, category, userdetails

    };
}
export default withRouter(connect(mapStateToProps)(BannerOneCategories));
