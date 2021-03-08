import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { Link } from "react-router-dom";
import $ from 'jquery';
import { connect } from "react-redux";

function Navbar(props) {
    const [navOpen, setNavOpen] = useState(false)

    $(document).on('click', '.side-menu-ul li', function () {
        $(".side-menu-ul li").removeClass('active');
        $(this).toggleClass("active")
    })
    $(document).on('click', '.side-menu-ul li.active', function () {
        $(".side-menu-ul li.active").removeClass('active');
    })

    return (
     
        <>
            <div className="main-menu-content">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">home</Link>

                        </li>

                        <li>
                            <Link to="/listing-list">listings <FiChevronDown /></Link>
                            <ul className="dropdown-menu-item">
                                <li><Link to="/listing-list">listing</Link></li>
                                <li><Link to="/add-listing">add listing</Link></li>
                                <li><Link to="/categories">listing categories</Link></li>
                               
                            </ul>
                        </li>
                      

                        <li>
                            <Link to="/forum">Forums <FiChevronDown /></Link>
                            <ul className="dropdown-menu-item">
                                <li><Link to="/forum">Home</Link></li>
                                <li><Link to="/forum/popular">Popular</Link></li>
                                <li><Link to="/forum/community">All Community</Link></li>
                                <li><Link to="/forum/newcommunity">New Community</Link></li>

                            </ul>
                        </li>
                        <li>
                            <Link to="/about">about <FiChevronDown /></Link>
                            <ul className="dropdown-menu-item">
                                <li><Link to="/about">about</Link></li>
                                <li><Link to="/faq">faq</Link></li>
                                <li><Link to="/contact">contact</Link></li>
                                </ul>
                        </li>

                    </ul>
                </nav>
            </div>
            <div className="side-menu-open" onClick={() => setNavOpen(!navOpen)}>
                <span className="menu__bar"></span>
                <span className="menu__bar"></span>
                <span className="menu__bar"></span>
            </div>
            <div className={navOpen ? 'side-nav-container active' : 'side-nav-container'}>
                <div className="humburger-menu">
                    <div className="humburger-menu-lines side-menu-close" onClick={() => setNavOpen(!navOpen)}></div>
                </div>
                <div className="side-menu-wrap">
                    <ul className="side-menu-ul">
                        <li>
                            <Link to="/">home</Link> <span className="la-angle-down"><FiChevronDown /></span>
                           
                        </li>
                        <li>
                            <Link>listings <FiChevronDown /></Link>
                            <ul className="dropdown-menu-item">
                               <li><Link to="/listing-list">listing</Link></li>
                                <li><Link to="/add-listing">add listing</Link></li>
                                <li><Link to="/categories">listing categories</Link></li>
                               
                            </ul>
                        </li>
                        <li>
                            <Link>Forums <FiChevronDown /></Link>
                            <ul className="dropdown-menu-item">
                               <li><Link to="/forum">Home</Link></li>
                                <li><Link to="/forum/popular">Popular</Link></li>
                                <li><Link to="/forum/community">All Community</Link></li>
                                <li><Link to="/forum/newcommunity">New Community</Link></li>

                            </ul>
                        </li>
                        <li>
                            <Link>about <FiChevronDown /></Link>
                            <ul className="dropdown-menu-item">
                            <li><Link to="/about">about</Link></li>
                                <li><Link to="/faq">faq</Link></li>
                                <li><Link to="/contact">contact</Link></li>   </ul>
                        </li>
                      
                    </ul>
                    {
                        props.isLoggedIn ?  '' : <div className="side-nav-button">
                        <Link to="/login" className="theme-btn">login</Link>
                        <Link to="/sign-up" className="theme-btn">Sign up</Link>
                    </div>
                    }
                   
                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
      isLoggedIn,
      message
    };
  }
  export default connect(mapStateToProps)(Navbar);


