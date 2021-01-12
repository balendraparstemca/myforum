import React, { Component } from 'react'
import { CountryDropdown } from 'react-country-region-selector';
import { FiSearch } from 'react-icons/fi';
import { connect } from "react-redux";
import Select from "react-select";
import { withRouter } from "react-router-dom";

class BannerOneHeroHeading extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this);
         this.onChangeSearch= this.onChangeSearch.bind(this);
        this.state = {
            title: 'What are you interested in ',
            category: [],
            selectedOption: null,
            titleHighlight: [
                {
                    active: true,
                    text: 'Hotels'
                }

            ],
            country:'',
            catid: { label:'select a category', value: '' },
            searchitem:'',
            desc: 'Discover the best places to stay, eat, shop & visit the city nearest to you.'
        }
    }


    handleSearch(e) {
        e.preventDefault();
        const obj={
            query:this.state.searchitem,
            country:this.state.country,
            category:this.state.catid.value
        }
        this.props.history.push(`/listing-list/search/?q=${obj.query}&country=${obj.country}&category=${obj.category}`);
    }

    onChangeSearch(e) {
        this.setState({
            searchitem: e.target.value,
        });
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    handleChangeCat = async (catid) => {
        this.setState({ catid });
    }




    render() {

        let category = [];
        let categorytwo = [{ value: "All", label: "All" }];
        let titleHighlight = [
            {
                active: true,
                text: 'Hotels'
            }

        ]

        category = titleHighlight.concat(this.props.category && this.props.category.length ? this.props.category.map(cat => {
            return { active: false, text: `${cat.name}` };
        }) : [{
            active: true,
            text: 'category not fetched'
        }])

        categorytwo = categorytwo.concat(this.props.category && this.props.category.length ? this.props.category.map(cat => {
            return { value: `${cat.name}`, label: `${cat.name}` };
        }) : [{ value: "All", label: "All" }])

        return (
            <>
                <div className="hero-heading">
                    <div className="section-heading">
                        <h2 className="sec__title cd-headline zoom">
                            {this.state.title}
                            <span className="cd-words-wrapper">
                                {category.map((item, index) => {
                                    return (
                                        <b className={item.active ? 'is-visible' : ' '} key={index}> {item.text}</b>
                                    )
                                })}
                            </span>
                        </h2>
                        <p className="sec__desc">
                            {this.state.desc}
                        </p>
                    </div>
                </div>'
                <div className="main-search-input">

                    <div className="main-search-input-item">
                        <div className="contact-form-action">
                            <form action="#">
                                <div className="form-group mb-0">
                                    <span className="form-icon">
                                        <FiSearch />
                                    </span>
                                    <input className="form-control" type="text" value={this.state.searchitem} onChange={this.onChangeSearch}  placeholder="What are you looking for?" />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="main-search-input-item location">
                        <CountryDropdown
                            value={this.state.country}
                            onChange={(val) => this.selectCountry(val)} />
                    </div>

                    <div className="main-search-input-item category">
                        <Select
                            value={this.state.catid}
                            onChange={this.handleChangeCat}
                            placeholder="Select a Category"
                            options={categorytwo}
                        />
                    </div>

                    <div className="main-search-input-btn">
                        <button className="button theme-btn"  onClick={this.handleSearch} type="submit">Search</button>
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
export default withRouter(connect(mapStateToProps)(BannerOneHeroHeading));
