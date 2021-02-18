import React, { Component } from 'react'
import { CountryDropdown } from 'react-country-region-selector';
import { FiSearch } from 'react-icons/fi';
import { connect } from "react-redux";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GiPositionMarker } from 'react-icons/gi'
import { withRouter } from "react-router-dom";
import { fetchCategory, getAllSubCategory } from '../../../services/action/common';
import loadjs from 'loadjs';
import { Link } from "react-router-dom";


class BannerOneHeroHeading extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {
            title: 'ear Desi in Videsh ',
            category: [],
            myarr: [1, 2, 3],
            selectedOption: null,
            titleHighlight: [
                {
                    active: true,
                    text: 'Local Desi Deals'
                },
                {
                    active: false,
                    text: 'Local Desi Businesses'
                },
                {
                    active: false,
                    text: 'Immigration Help'
                },
                {
                    active: false,
                    text: 'Desi Events'
                },
                {
                    active: false,
                    text: 'Desi Roommates'
                },
                {
                    active: false,
                    text: 'Desi Movies'
                },
                {
                    active: false,
                    text: 'Desi Movies'
                },

            ],
            country: '',
            catname: '',
            catid: '',
            subcategory: [],
            countryPriorities: ['IN', "US", "CA", "GB", "AU", "NO", "NL", "FR", "CH", "AE", "SG", "KW", "SA", "QA", "MY", "LK"],
            catid: { label: 'select a category', value: '' },
            searchitem: '',
            desc: 'Discover the best places to stay, eat, shop & visit the city nearest to you.'
        }
    }

    componentDidMount() {
         loadjs('/js/jquery-3.5.1.js', function () {
             loadjs('/js/animated-headline.js', function () {

            });
         });

        this.props.dispatch(fetchCategory({ for: 'LISTING', status: true }))
        this.getsubcategory();
    }


    handleSearch(e) {
        e.preventDefault();
        const obj = {
            searchitem: this.state.searchitem ? `searchitem=${this.state.searchitem}` : '',
            country: this.state.country  ? `${this.state.searchitem ? '&' : ''}country=${this.state.country}` : '',
            category: this.state.catname ? `${this.state.country || this.state.searchitem ? '&' : ''}category=${this.state.catname}` : '',
            subcategory: this.state.catid.value ? `${this.state.catname || this.state.searchitem || this.state.country  ? '&' : ''}subcat=${this.state.catid.value}` : ''

        }
        this.props.history.push(`/listing-list/search/?${obj.searchitem}${obj.country}${obj.category}${obj.subcategory}`);
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

    getsubcategory = (catid) => {
        const obj = { cat_id: catid }

        this.props.dispatch(getAllSubCategory(obj)).then(() => {
            if (this.props.subcategory && this.props.subcategory.length > 0) {
                this.setState({
                    subcategory: this.props.subcategory

                })

            } else {
                this.setState({
                    subcategory: []
                })
            }

        })

    }

    opentab = (name, id) => {
     
        this.setState({ catname: name, catid: id })
        this.getsubcategory(id)
    }



    render() {

        let categorytwo = [{ value: "All", label: "All" }];


        categorytwo = this.state.subcategory && this.state.subcategory.length > 0 ? this.state.subcategory.map(cat => {
            return { value: `${cat.name}`, label: `${cat.name}`, text: `Enter ${cat.name} name` };
        }) : [{
            value: '',
            label: 'no subcategory feched'
        }];



        return (

            <>
                <div className="hero-heading 5px">
                    <div className="section-heading">
                        <h2 className="sec__title cd-headline zoom text-center">
                            <span style={{ fontSize: '70px' }}>D</span>ear <span style={{ color: '#ace600' }}>desi </span>In  Videsh
                        </h2>
                        <p className="cd-headline zoom sec__desc" style={{ color: 'white' }}>

                            <span className="cd-words-wrapper" style={{ marginRight: '10px' }}> What are you looking for ?</span>
                            <span className="cd-words-wrapper">
                                {this.state.titleHighlight.map((item, index) => {
                                    return (
                                        <b style={{ color: '#bfff00' }} className={item.active ? 'is-visible' : ' '} key={index}> {item.text}</b>
                                    )
                                })}
                            </span>


                        </p>
                    </div>
                </div>

                <div className="hero-heading mt-5 ">

                    {this.props.category && this.props.category.length > 0 ?
                        <Tabs>
                            <div className="tab-shared">
                                <TabList className="nav nav-tabs" id="myTab">

                                    <Tab  onClick={() => this.opentab('All')}>
                                        <Link className="nav-link theme-btn radius-rounded" to="#">
                                            <span>
                                                <GiPositionMarker />
                                            </span>All
                                        </Link>
                                    </Tab>
                                    {

                                        this.props.category.slice(0, 10).map((item, i) => {
                                            return (
                                                <Tab onClick={() => this.opentab(item.name, item.cat_id)}>
                                                    <Link className="nav-link theme-btn radius-rounded" to="#">
                                                        <span>
                                                            <i className={item.icon}></i>
                                                        </span> {item.name}
                                                    </Link>
                                                </Tab>
                                            )
                                        })
                                    }



                                </TabList>
                            </div>

                            <TabPanel>
                                <div className="main-search-input">
                                   <div className="main-search-input-item category">
                                        <Select
                                            value={this.state.catid}
                                            onChange={this.handleChangeCat}
                                            placeholder={`Select Category for ${this.state.catname}`}
                                            options={categorytwo}
                                        />
                                    </div>
                                 

                                    <div className="main-search-input-item location">
                                        <CountryDropdown
                                            priorityOptions={this.state.countryPriorities}
                                            value={this.state.country}
                                            onChange={(val) => this.selectCountry(val)} />
                                    </div>

                                    <div className="main-search-input-item">
                                        <div className="contact-form-action">
                                            <form action="#">
                                                <div className="form-group mb-0">
                                                    <span className="form-icon">
                                                        <FiSearch />
                                                    </span>
                                                    <input className="form-control" type="text" value={this.state.searchitem} onChange={this.onChangeSearch} placeholder={`What are you looking for `} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    

                                    <div className="main-search-input-btn">
                                        <button className="button theme-btn" onClick={this.handleSearch} type="submit">Search</button>
                                    </div>

                                </div>
                            </TabPanel>

                            {this.props.category.slice(0, 10).map((item, i) => {
                                return (<TabPanel>
                                    <div className="main-search-input">

                                    <div className="main-search-input-item category">
                                            <Select
                                                value={this.state.catid}
                                                onChange={this.handleChangeCat}
                                                placeholder={`Select Category for ${this.state.catname}`}
                                                options={categorytwo}
                                            />
                                        </div>
                                      

                                        <div className="main-search-input-item location">
                                            <CountryDropdown
                                                priorityOptions={this.state.countryPriorities}
                                                value={this.state.country}
                                                onChange={(val) => this.selectCountry(val)} />
                                        </div>

                                        <div className="main-search-input-item">
                                            <div className="contact-form-action">
                                                <form action="#">
                                                    <div className="form-group mb-0">
                                                        <span className="form-icon">
                                                            <FiSearch />
                                                        </span>
                                                        <input className="form-control" type="text" value={this.state.searchitem} onChange={this.onChangeSearch} placeholder={`What are you looking  for `} />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                       

                                        <div className="main-search-input-btn">
                                            <button className="button theme-btn" onClick={this.handleSearch} type="submit">Search</button>
                                        </div>

                                    </div>
                                </TabPanel>)
                            })



                            }



                        </Tabs> : ''}
                </div>

               
            </>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { category, subcategory } = state.common;
    return {
        isLoggedIn, category, userdetails, subcategory

    };
}
export default withRouter(connect(mapStateToProps)(BannerOneHeroHeading));
