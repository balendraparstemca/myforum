import React, { Component } from 'react'
import { RiBuilding4Line} from 'react-icons/ri';
import { GiChickenOven } from 'react-icons/gi';
import { Link } from 'react-router-dom';


export default class BannerOneCategories extends Component {
    state = {
        connector: 'or',
        title: 'browse featured categories:',
        items: [
            {
                path: "/listing-list",
                title: "Listing",
                icon: <RiBuilding4Line />
            },
            {
                path: "forum/home",
                title: "Forums",
                icon: <GiChickenOven />
            },
           
        ]
    };
    render() {
        return (
            <>
                <div className="highlighted-categories">
                 
                    <h5 className="highlighted__title">
                        {this.state.title}
                    </h5>
                    <div className="highlight-lists d-flex justify-content-center mt-4">
                        {this.state.items.map((item, index) => {
                            return (
                                <div className="category-item" key={index}>
                                    <Link to={item.path} className="d-block">
                                        <span className="icon-element">{item.icon}</span>
                                        {item.title}
                                    </Link>
                                </div>
                            )
                        })}


                    </div>
                </div>
            </>
        )
    }
}
