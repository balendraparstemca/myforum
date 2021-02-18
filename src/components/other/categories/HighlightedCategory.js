import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchCategory } from '../../../services/action/common';

class  HighlightedCategory extends Component {
    state = {
        connector: 'or',
        title: 'browse featured categories:',
     
      
    };

    componentDidMount()
    {

        this.props.dispatch(fetchCategory({for:'LISTING',status:true}))
    }
    


    render() {
        
      
        let categorytwo = [];
        categorytwo = this.props.category && this.props.category.length > 0 ? this.props.category.map(cat => {
            return { path: `${cat.canonical_url}`, title: `${cat.name}`, icon: <i className={`${cat.icon}`}></i> };
        }) : [{ path: "", title: "no category" }]

        return (
            <>
                <div className="highlighted-categories my-wrapper card">

                  
                    <div className="highlight-lists d-flex  mt-4">
                        {  categorytwo  &&  categorytwo.length === 0 ? (
                            <div className="category-item float-center">
                                <Link to='' className="d-block">
                                    <span className="icon-element"></span>
                                 no categories fetched
                             </Link>
                            </div>
                        ) :  categorytwo.slice(0, 9).map((item, index) => {
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
export default withRouter(connect(mapStateToProps)(HighlightedCategory));


