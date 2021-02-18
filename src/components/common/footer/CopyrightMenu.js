import React, {Component} from 'react';

class CopyrightMenu extends Component {
    state = {
        links: [
            {
                path: '/terms-condition',
                title: 'Terms & Conditions'
            },
            {
                path: '/privacy-policy',
                title: 'Privacy Policy'
            },
           
        ]
    }
    render() {
        return (
            <>
                <ul className="list-items">
                    {this.state.links.map((link, index) => {
                        return (
                            <li key={index}>
                                <a href={link.path}>{link.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </>
        );
    }
}

export default CopyrightMenu;