import React, {Component} from 'react';
import {Link} from "react-router-dom";

class FooterCategoryWidget extends Component {
    state = {
        title: 'Categories',
        links: [
            {
                path: '#',
                text: 'Local Desi Shops'
            },
            {
                path: '#',
                text: 'Local Desi Businesses'
            },
            {
                path: '#',
                text: 'Immigration Help'
            },
            {
                path: '#',
                text: 'Desi Events'
            },
            {
                path: '#',
                text: 'Desi Roommates'
            },
            {
                path: '#',
                text: 'Desi Movies'
            }
        ]
    }
    render() {
        return (
            <>
                <div className="col-lg-3 column-td-6">
                    <div className="footer-item">
                        <h4 className="footer__title">
                            {this.state.title}
                        </h4>
                        <ul className="list-items">
                            {this.state.links.map((link, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={link.path}>{link.text}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default FooterCategoryWidget;