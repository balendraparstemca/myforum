import React, {Component} from 'react';
import { AiOutlineHome } from 'react-icons/ai'
import { FiHeadphones } from 'react-icons/fi'
import { FaRegEnvelope } from 'react-icons/fa'

class FooterContactWidget extends Component {
    state = {
        title: 'Contact With Us',
        lists: [
            {
                icon: <AiOutlineHome />,
                text: '5605 N MacArthur Blvd  suite 740  Irving, TX 75038'
            },
            {
                icon: <FiHeadphones />,
                text: '703-829-5141'
            },
            {
                icon: <FaRegEnvelope />,
                text: 'ears@casualdesi.com'
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
                        <ul className="info-list contact-links">
                            {this.state.lists.map((list, index) => {
                                return (
                                    <li key={index}>
                                        <span className="la">
                                            {list.icon}
                                        </span> {list.text}
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

export default FooterContactWidget;