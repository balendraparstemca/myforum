import React, { Component } from 'react';
import { BsGrid, BsListUl } from "react-icons/bs";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import GeneralHeader from './GeneralHeader';
import Footer from './footer/Footer';
import ScrollTopBtn from './ScrollTopBtn';
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { IoIosCheckmarkCircle, IoIosLink, } from "react-icons/io";
import { FiHeart, FiPhone } from "react-icons/fi";
import { FaFilter, FaRegCalendarCheck } from "react-icons/fa";
import $ from 'jquery'
import Button from "../../components/common/Button";
import moment from 'moment';
import { fetchCategory, getGeoInfo } from '../../services/action/common';
import { gethomeList, likeList } from '../../services/action/list';
import { connect } from "react-redux";
import { BsEye } from 'react-icons/bs';
import { MdStar } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import queryString from 'query-string';
import { Badge } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
const shortby = [
    {
        value: 1,
        label: 'Short by default'
    },
    {
        value: 2,
        label: 'High Rated',

    },
    {
        value: 3,
        label: 'Popular Listing'
    },
    {
        value: 4,
        label: 'Newest Listing'
    },
    {
        value: 5,
        label: 'Older Listing'
    },


]

class ListHeaderTwo extends Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            isloading: false,
            loading: true,
            alllists: [],
            author: require('../../assets/images/testi-img2.jpg'),
            listimage: require('../../assets/images/bread-bg.jpg'),
            breadcrumbimgsecond: require('../../assets/images/bread-bg.jpg'),
            breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
            bedge: 'New Open',
            category: [],
            maincategory: [],
            amentieslist: [],
            filter: [],
            mainlists: [],
            mediaterlist: [],
            mediatersecondlist: [],
            paramid: null,
            features: [],
            country: [{
                value: 'All',
                label: 'All'
            }],
            region: [{
                value: 'All',
                label: 'All'
            }],
            place: [],
            featurefilter: [],
            visible: 2,
            selectedShortby: null,
            selectedCountryby: null,
            selectedMaincategory: null,
            selectedRegion: null,
            showregion: false,
            countryname: '',
            subcatdetail: [],
            subcatname: '',
            subcatdescription: '',
            icon: '',
            metainfo: null,
            defaultMetaTag: null,
            showsubcat: true,
            searchitem: '',
            searchcountry: 'All',
            searchcat: 'All',
            searchsubcat: ''


        }


    }

    componentDidMount() {
        this.props.dispatch(fetchCategory({ status: true }))

        let myVariable = queryString.parse(this.props.location.search)
        if (myVariable) {
            if (myVariable.searchitem) {
                this.setState({
                    searchitem: myVariable.searchitem.replace(/[^a-zA-Z ]/g, "")
                })
            }
            if (myVariable.country) {
                this.setState({
                    searchcountry: myVariable.country
                })

            }
            if (myVariable.category) {
                this.setState({
                    searchcat: myVariable.category
                })
            }

            if (myVariable.subcat) {
                this.setState({
                    searchsubcat: myVariable.subcat, filter: [myVariable.subcat.replace(/\s/g, "").toLocaleLowerCase()]
                })

            }

            if (myVariable.q) {
                this.setState({
                    searchcountry: myVariable.q
                })

            }

            this.fetchHomelists()

        } else {
            this.setState({
                loading: false
            })

        }

        $(document).ready(function () {
            //let catbox = document.querySelector('.sidebar-widget .filter-by-category');
            let height = ''


            $(document).on('click', '#showfilterbycategory', function () {
                $(".sidebar-widget .filter-by-category").css({ height: height, overflow: 'hidden' })
                $(this).addClass('categorylessfilterbyfeature');
                $(this).addClass('lessfilterbyfeature');
            })


            $(document).on('click', '.categorylessfilterbyfeature', function () {
                height = document.querySelector('.sidebar-widget .filter-by-category').offsetHeight;
                $(".sidebar-widget .filter-by-category").css({ height: '104px', overflow: 'hidden' })
                $(this).removeClass('categorylessfilterbyfeature');
                $(this).removeClass('lessfilterbyfeature');
            })


            $(document).on('click', '#showfilterbyfeature', function () {
                $(".sidebar-widget .filter-by-feature").css({ height: height, overflow: 'hidden' })
                $(this).addClass('featurelessfilterbyfeature');
                $(this).addClass('lessfilterbyfeature');
            })


            $(document).on('click', '.featurelessfilterbyfeature', function () {
                height = document.querySelector('.sidebar-widget .filter-by-category').offsetHeight;
                $(".sidebar-widget .filter-by-feature").css({ height: '104px', overflow: 'hidden' })
                $(this).removeClass('featurelessfilterbyfeature');
                $(this).removeClass('lessfilterbyfeature');
            })

            $(document).on('click', '.filterbycountry', function () {
                $('input:checkbox').prop('checked', false);
                $('input:radio').prop('checked', false);
            })


        })



    }

    componentDidUpdate() {
        // this.props.dispatch(fetchCategory({ status: true }))
        // let myVariable = queryString.parse(this.props.location.search)
        // if (this.state.paramid !== myVariable.country) {
        //     this.setState({ paramid: myVariable.country });
        //     if (!myVariable.q && !myVariable.country && !myVariable.category) {
        //         this.setState({
        //             loading: false
        //         })

        //     }
        //     else {
        //         const obj = {
        //             searchitem: myVariable.q.replace(/[^a-zA-Z ]/g, ""),
        //             country: myVariable.country,
        //             category: myVariable.category
        //         }
        //         this.fetchHomelists()

        //     }


        // }

        $(document).ready(function () {
            //let catbox = document.querySelector('.sidebar-widget .filter-by-category');
            let height = ''


            $(document).on('click', '#showfilterbycategory', function () {
                $(".sidebar-widget .filter-by-category").css({ height: height, overflow: 'hidden' })
                $(this).addClass('categorylessfilterbyfeature');
                $(this).addClass('lessfilterbyfeature');
            })


            $(document).on('click', '.categorylessfilterbyfeature', function () {
                height = document.querySelector('.sidebar-widget .filter-by-category').offsetHeight;
                $(".sidebar-widget .filter-by-category").css({ height: '104px', overflow: 'hidden' })
                $(this).removeClass('categorylessfilterbyfeature');
                $(this).removeClass('lessfilterbyfeature');
            })


            $(document).on('click', '#showfilterbyfeature', function () {
                $(".sidebar-widget .filter-by-feature").css({ height: height, overflow: 'hidden' })
                $(this).addClass('featurelessfilterbyfeature');
                $(this).addClass('lessfilterbyfeature');
            })


            $(document).on('click', '.featurelessfilterbyfeature', function () {
                height = document.querySelector('.sidebar-widget .filter-by-category').offsetHeight;
                $(".sidebar-widget .filter-by-feature").css({ height: '104px', overflow: 'hidden' })
                $(this).removeClass('featurelessfilterbyfeature');
                $(this).removeClass('lessfilterbyfeature');
            })

            $(document).on('click', '.filterbycountry', function () {
                $('input:checkbox').prop('checked', false);
                $('input:radio').prop('checked', false);
            })


        })

    }

    fetchlocationbyipaddress = () => {
        getGeoInfo()

    }

    searchlistnearyou() {
        getGeoInfo().then(() => {
            if (this.props.mylocation) {
                let obj = this.props.mylocation;
                let updateList = this.state.mainlists;

                updateList = updateList.filter(item => {
                    return item.listing.city.toLowerCase().search(
                        obj.city.toLowerCase()
                    ) !== -1 || item.listing.state.toLowerCase().search(
                        obj.state.toLowerCase()
                    ) !== -1 || item.listing.country.toLowerCase().search(
                        obj.country.toLowerCase()
                    ) !== -1
                });

                this.setState({ alllists: updateList, mediaterlist: updateList, mediatersecondlist: updateList, showregion: true }, () => { this.Region(); this.maincategory(); this.category(); this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat) ? this.handleChangeMaincategory({ value: this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat).id, label: this.state.searchcat && this.state.searchcat }) : this.handleChangeMaincategory({ value: 'All', label: 'All' }) })


            } else {
                this.setState({ alllists: [] })

            }
        })

    }



    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 4 };
        });
    }


    category = () => {
        const array = this.state.alllists;
        this.setState({ category: [] })
        const result = [];
        const map = new Map();

        for (const item of array) {
            if (map.has(item.listing.categoryname)) {
                let objIndex = result.findIndex((obj => obj.cat === item.listing.categoryname));
                result[objIndex].catNum = result[objIndex].catNum + 1;

            }

            else {
                map.set(item.listing.categoryname, true);
                result.push({
                    id: item.listing.categoryname,
                    cat: item.listing.categoryname,
                    catNum: 1

                });
            }
        }
        this.setState({ category: result })

    }

    maincategory = () => {
        const array = this.state.alllists;
        this.setState({ maincategory: [] })
        const result = [{
            value: 'All',
            label: 'All',

        }];
        const map = new Map();
        for (const item of array) {

            if (!map.has(item.listing.categoryid)) {
                map.set(item.listing.categoryid, true);
                result.push({
                    value: item.listing.categoryid,
                    label: this.props.category.find(o => o.id === item.listing.categoryid).name,
                });
            }
        }

        this.setState({ maincategory: result })

    }


    Region = () => {
        const array = this.state.mediaterlist;
        this.setState({ region: [] })
        const result = [{
            value: 'All',
            label: 'All'
        }];
        const map = new Map();

        for (const item of array) {

            if (!map.has(item.listing.state)) {
                map.set(item.listing.state, true);
                result.push({
                    value: item.listing.state,
                    label: item.listing.state
                });
            }
        }

        // result.push()

        this.setState({ region: result })


    }

    country = () => {
        const array = this.state.alllists;
        this.setState({
            country: []
        })
        let result = [{
            value: 'All',
            label: 'All'
        }, {
            value: 'nearme',
            label: 'nearme'
        }];
        const map = new Map();

        for (const item of array) {

            if (!map.has(item.listing.country)) {
                map.set(item.listing.country, true);    // set any value to Map
                result.push({
                    value: item.listing.country,
                    label: item.listing.country
                });
            }
        }


        this.setState({
            country: result
        })
    }

    filterList = (e) => {

        let updateList = this.state.mainlists;
        this.setState({ searchitem: e.target.value })
        updateList = updateList.filter(item => {
            return item.listing.badge_status.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 ||item.listing.phone.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 ||item.listing.list_title.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.categoryname.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.name.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 ||item.listing.username.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.city.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.country.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.state.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.address.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.zipcode.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.keywords.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.description.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 
        });

        this.setState({
            alllists: updateList
        });
    }

    allfeatures() {

        const array = this.state.amentieslist && this.state.amentieslist;
        const result = [];
        const map = new Map();
        for (const item of array) {
            if (!map.has(item.amenties_name)) {
                map.set(item.amenties_name, true);
                result.push({
                    id: item.amenties_id,
                    text: item.amenties_name
                });
            }
        }


        this.setState({ features: result })
    }




    like = (listingid) => {
        if (this.props.userdetails) {
            const obj = {
                listing_id: listingid,
                like_by: this.props.userdetails.id
            }
            this.props.dispatch(likeList(obj)).then(() => {
                if (this.props.match.params.category) {
                    this.fetchsubcategorydetail()
                } else {
                    this.fetchHomelists();

                }

            }, (error) => {

                this.setState({ loading: false })
            })
        }
        else {
            alert("login first")
        }
    }



    handleChange = (e) => {
        if (this.state.searchsubcat) {
            this.setState({
                searchsubcat: '', filter: []
            })
        }

        if (e.currentTarget.checked) {
            this.state.filter.push(e.currentTarget.value.replace(/\s/g, "").toLocaleLowerCase())
        }
        else {
            let index = this.state.filter.indexOf(e.currentTarget.value.replace(/\s/g, "").toLocaleLowerCase());
            if (index > -1) {
                this.state.filter.splice(index, 1);
            }
        }

        this.filter()
    }

    handleFeatureChange = (e) => {
        if (e.currentTarget.checked) {
            this.state.featurefilter.push(e.currentTarget.value)
        }
        else {
            let index = this.state.featurefilter.indexOf(e.currentTarget.value);
            if (index > -1) {
                this.state.featurefilter.splice(index, 1);
            }
        }

        this.featurefilter()

    }



    handleRatingFilter = async (e) => {
        let lists = this.state.mediaterlist;


        if (e.currentTarget.checked) {
            let arr = lists.filter(function (item) {
                return parseFloat(item.rating[0].rating) >= e.target.value;
            });



            this.setState({ alllists: arr })
        }

    }

    filter() {
        let lists = this.state.mediatersecondlist;

        let filterarr = this.state.filter;


        if (filterarr.length > 0) {

            let arr = lists.filter(function (item) {
                return filterarr.includes(item.listing.categoryname.replace(/\s/g, "").toLocaleLowerCase());
            });

            this.setState({ alllists: arr })
        }

        else {
            this.setState({ alllists: lists })

        }
    }

    featurefilter() {
        let lists = this.state.mediaterlist;

        let filterarr = this.state.featurefilter;
        if (filterarr.length > 0) {

            let arr = lists.filter(function (item) {
                return item.amenties.some(g => filterarr.includes(g.amenties_name))
            });
            this.setState({ alllists: arr })
        }
        else {
            this.setState({ alllists: lists })

        }
    }



    fetchSearchlists = (obj) => {
        let updateList = this.props.lists;

        updateList = updateList.filter(item => {
            return item.listing.list_title.toLowerCase().search(
                obj.searchitem.toLowerCase()
            ) !== -1 || item.listing.categoryname.toLowerCase().search(
                obj.searchitem.toLowerCase()
            ) !== -1 || item.listing.username.toLowerCase().search(
                obj.searchitem.toLowerCase()
            ) !== -1 || item.listing.city.toLowerCase().search(
                obj.searchitem.toLowerCase()
            ) !== -1 || item.listing.country.toLowerCase().search(
                obj.searchitem.toLowerCase()
            ) !== -1 || item.listing.state.toLowerCase().search(
                obj.searchitem.toLowerCase()
            ) !== -1
        });

        this.setState({
            alllists: updateList
        });

    }

    handleglobalsearch = (selectedCountryby) => {
        this.setState({ selectedCountryby: selectedCountryby });

        if (selectedCountryby.value === 'All') {

            this.setState({ alllists: this.state.mainlists, mediaterlist: this.state.mainlists, mediatersecondlist: this.state.mainlists, showregion: false, countryname: '' }, () => { this.Region(); this.maincategory(); this.category(); this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat) ? this.handleChangeMaincategory({ value: this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat).id, label: this.state.searchcat && this.state.searchcat }) : this.handleChangeMaincategory({ value: 'All', label: 'All' }) })

        }
        else {

            let lists = this.state.mainlists;

            let arr = lists.filter(function (item) {
                return item.listing.country === selectedCountryby.value;
            });

            this.setState({ alllists: arr, mediaterlist: arr, mediatersecondlist: arr, showregion: true, countryname: selectedCountryby.value }, () => { this.Region(); this.maincategory(); this.category(); this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat) ? this.handleChangeMaincategory({ value: this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat).id, label: this.state.searchcat && this.state.searchcat }) : this.handleChangeMaincategory({ value: 'All', label: 'All' }) })


        }

    }

    fetchHomelists = () => {
        this.setState({ loading: true })
        this.props.dispatch(gethomeList()).then(() => {
            if (this.props.lists && this.props.lists.length > 0) {
                this.setState({ loading: false, subcatdetail: '', subcatname: 'All Listing', subcatdescription: '', breadcrumbimg: this.state.breadcrumbimgsecond })

                this.setState({
                    alllists: this.props.lists, mainlists: this.props.lists, loading: false
                })

                this.country()
                if (this.state.searchcountry === 'nearme') {
                    this.handleChangeCountryby({ value: this.state.searchcountry && this.state.searchcountry, label: this.state.searchcountry && this.state.searchcountry })


                } else {
                    this.handleglobalsearch({ value: this.state.searchcountry && this.state.searchcountry, label: this.state.searchcountry && this.state.searchcountry })

                }
            }
            else {
                this.setState({ loading: false })
            }

        }, (error) => {

            this.setState({ loading: false })
        });
    }


    sortByhighrating = () => {
        let lists = this.state.alllists;

        let arr = lists.sort(function (a, b) {
            return parseFloat(b.rating[0].rating) - parseFloat(a.rating[0].rating);
        });

        this.setState({ alllists: arr })
    }


    sortBypopular = () => {

        let lists = this.state.alllists;

        let arr = lists.sort(function (a, b) {
            return Number(b.listing.likes) - Number(a.listing.likes);
        });

        this.setState({ alllists: arr })

    }

    sortBynew = () => {
        let lists = this.state.alllists;

        let arr = lists.sort(function (a, b) {
            return Number(b.listing.creating_time) - Number(a.listing.creating_time);
        });
        this.setState({ alllists: arr })

    }

    sortByold = () => {
        let lists = this.state.alllists;

        let arr = lists.sort(function (a, b) {
            return Number(a.listing.creating_time) - Number(b.listing.creating_time);
        });



        this.setState({ alllists: arr })

    }

    sortBydefault = () => {

        this.setState({ alllists: this.state.mainlists, selectedMaincategory: null, selectedCountryby: null })

    }

    handleChangeshortby = (selectedShortby) => {

        this.setState({ selectedShortby });

        if (selectedShortby.value === 1) {

            this.sortBydefault();

        }

        else if (selectedShortby.value === 2) {

            this.sortByhighrating();

        }

        else if (selectedShortby.value === 3) {

            this.sortBypopular();

        }



        else if (selectedShortby.value === 4) {

            this.sortBynew();

        }

        else if (selectedShortby.value === 5) {

            this.sortByold();

        }
    }

    handleChangeCountryby = async (selectedCountryby) => {
        this.setState({ selectedCountryby: selectedCountryby, searchitem: '', searchcountry: selectedCountryby.value, filter: [], searchsubcat: '', selectedShortby: null });

        if (selectedCountryby.value === 'All') {

            this.setState({ alllists: this.state.mainlists, mediaterlist: this.state.mainlists, mediatersecondlist: this.state.mainlists, showregion: false, countryname: '' }, () => { this.Region(); this.maincategory(); this.category(); this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat) ? this.handleChangeMaincategory({ value: this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat).id, label: this.state.searchcat && this.state.searchcat }) : this.handleChangeMaincategory({ value: 'All', label: 'All' }) })

        }

        else if (selectedCountryby.value === 'nearme') {
            this.searchlistnearyou()
        }
        else {
            let lists = this.state.mainlists;
            let arr = lists.filter(function (item) {
                return item.listing.country === selectedCountryby.value;
            });

            this.setState({ alllists: arr, mediaterlist: arr, mediatersecondlist: arr, showregion: true, countryname: selectedCountryby.value }, () => { this.Region(); this.maincategory(); this.category(); this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat) ? this.handleChangeMaincategory({ value: this.props.category.find(o => o.name === this.state.searchcat && this.state.searchcat).id, label: this.state.searchcat && this.state.searchcat }) : this.handleChangeMaincategory({ value: 'All', label: 'All' }) })


        }


    }

    handleChangeRegion = async (selectedRegion) => {
        this.setState({ selectedRegion });
        this.handleChangeMaincategory({ value: this.state.searchcat && this.state.searchcat, label: this.state.searchcat && this.state.searchcat })

        if (selectedRegion.value === 'All') {

            this.setState({ alllists: this.state.mediaterlist }, () => { this.maincategory() })

        }
        else {
            let lists = this.state.mediaterlist;
            let arr = lists.filter(function (item) {
                return item.listing.state === selectedRegion.value;
            });

            this.setState({ alllists: arr, mediatersecondlist: arr }, () => { this.maincategory() })
        }

    }

    handleChangeMaincategory = async (selectedMaincategory) => {
        this.setState({ selectedMaincategory: selectedMaincategory, searchcat: selectedMaincategory.label });

        if (selectedMaincategory.value === 'All') {


            this.setState({ alllists: this.state.mediaterlist, mediatersecondlist: this.state.mediaterlist }, () => { this.category(); this.filter() })

        }
        else {
            let lists = this.state.mediaterlist;

            let arr = lists.filter(function (item) {
                return item.listing.categoryid === selectedMaincategory.value;
            });


            this.setState({ alllists: arr, mediatersecondlist: arr, showsubcat: true }, () => { this.category(); this.filter() })
        }

    }




    render() {
    console.log(this.props.lists)
        return (
            <><LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'
               >
                <main className="listing-list">
                    {/* Header */}
                    <GeneralHeader />

                    {/* Breadcrumb */}
                    <section className="breadcrumb-area faq-breadcrumb margin-bottom-30px">
                        <div className="breadcrumb-wrap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="breadcrumb-content">
                                            <h2 className="breadcrumb__title">
                                                Search anything
                                          </h2>
                                            <div className="contact-form-action">
                                                <form method="post">
                                                    <div className="row">
                                                        <div className="col-lg-7 mx-auto">
                                                            <div className="input-box">
                                                                <div className="form-group mb-0">
                                                                    <button type="button" className="theme-btn submit-btn border-0">
                                                                        <span className="d-inline-block"><FiSearch /></span>
                                                                    </button>
                                                                    <input className="form-control" type="text" name="name" value={this.state.searchitem} placeholder="What are you looking for?" onChange={(e) => this.filterList(e)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <Breadcrumb CurrentPgTitle="Search Item" MenuPgTitle="Listings" img={this.state.breadcrumbimg} /> */}


                    <div className="container">
                        <Tabs>
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="generic-header margin-bottom-30px">
                                        <p className="showing__text text-left">
                                            {
                                                this.state.alllists && this.state.alllists.length > 0 ? (
                                                    `showing 1 to ${this.state.visible > this.state.alllists.length ? this.state.alllists.length : this.state.visible} out of ${this.state.alllists.length}`

                                                ) : ''
                                            }
                                        </p>


                                        <p className="showing__text text-right mr-1">
                                            Sort By Country
                                        </p>

                                        <div className="short-option mr-3">
                                            <Select
                                                className="filterbycountry"
                                                value={this.state.selectedCountryby}
                                                onChange={this.handleChangeCountryby}
                                                placeholder="Sort by Country"
                                                options={this.state.country && this.state.country}
                                            />
                                        </div>
                                        <div className="short-option mr-1">
                                            <Select
                                                value={this.state.selectedShortby}
                                                onChange={this.handleChangeshortby}
                                                placeholder="Sort by"
                                                options={shortby}
                                            />
                                        </div>
                                        <div className="short-option mr-1">
                                            <TabList className="nav nav-tabs border-0" id="nav-tab">


                                                <Tab>
                                                    <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                        <span className="la"><BsListUl /></span>
                                                    </Link>
                                                </Tab>

                                                <Tab>
                                                    <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                        <span className="la"><BsGrid /></span>
                                                    </Link>
                                                </Tab>



                                            </TabList>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-12 mb-4 ">
                                    <span className="showing__text text-left mr-2">
                                        <FaFilter /> <b> Filter By:</b>
                                    </span>
                                    <span className="showing__text text-right mb-5 mr-1">
                                        {this.state.searchcountry} /
                                        </span>
                                    <span className="showing__text text-right mb-5 mr-1">
                                        {this.state.searchcat} /
                                        </span>

                                    <span className="showing__text text-right mb-5 mr-1">
                                        {this.state.searchsubcat}
                                    </span>
                                </div>
                                <div className="col-lg-12">
                                    <div className="tab-content" id="nav-tabContent">
                                        <TabPanel>

                                            <div className="row">


                                                <div className="col-lg-8">
                                                    {this.state.alllists && this.state.alllists.length === 0 ?
                                                        (
                                                            <div className="btn-box text-center padding-top-30px">
                                                                <Button url="#" text="there is no  list " className=" d-block">
                                                                    <span><BsEye /></span>
                                                                </Button>
                                                            </div>
                                                        ) : this.state.alllists.slice(0, this.state.visible).map((item, index) => {
                                                            return (
                                                                <div className="card-item card-listing d-flex" key={index}>
                                                                    <Link to={`/listing-details/${item.listing.canonicalurl}`} className="card-image-wrap">
                                                                        <div className="card-image">
                                                                            <img src={item.listing.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.bannerimg}` : this.state.listimage} className="card__img" width="200px" height="200px" alt={item.listing.list_title} />
                                                                            <span className='badge'>{item.listing.badge_status ? item.listing.badge_status : ''}</span>
                                                                            <span className="badge-toggle" data-toggle="tooltip" data-placement="bottom" title="22 Likes">
                                                                                <FiHeart />
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                    <div className="card-content-wrap">
                                                                        <div className="card-content">
                                                                            <Link to={`/listing-list/${item.listing.canonical_url}`}>
                                                                                <h5 className="card-meta">
                                                                                    <span><i className={item.listing.icon}></i></span> {item.listing.categoryname}
                                                                                </h5>
                                                                            </Link>
                                                                            <Link to={`/listing-details/${item.listing.canonicalurl}`}>

                                                                                <h4 className="card-title">{item.listing.list_title}
                                                                                    <i><IoIosCheckmarkCircle /></i>
                                                                                </h4>
                                                                                <p className="card-sub">
                                                                                    {item.listing.address}
                                                                                </p>
                                                                            </Link>
                                                                            <Link to={`/user-profile/${item.listing.username}`} className="author-img" >
                                                                                <img src={item.listing.profileimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.profileimg}` : this.state.author} alt="author-img" />
                                                                            </Link>
                                                                            <ul className="info-list padding-top-20px">
                                                                                <li><span className="la d-inline-block"><FiPhone /></span> {item.listing.phone}</li>
                                                                                <li><span className="la d-inline-block"><IoIosLink /></span>  <a target="_blanc" href={item.listing.website}>
                                                                                    {item.listing.website.replace(/^https:\/\//, '')}
                                                                                </a>
                                                                                </li>
                                                                                <li>
                                                                                    <span className="la d-inline-block"><FaRegCalendarCheck /></span>posted {moment(Number(item.listing.creating_time)).fromNow()}
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="rating-row">
                                                                            <div className="rating-rating">
                                                                                <span> <ReactStars
                                                                                    count={5}
                                                                                    size={24}
                                                                                    value={item.rating[0].rating ? parseFloat(item.rating[0].rating).toFixed(1) : 0}
                                                                                    isHalf={true} /> </span><span> - </span>
                                                                                <span className="rating-count"> {parseFloat(item.rating[0].rating).toFixed(1)}</span>


                                                                            </div>
                                                                            <div className="listing-info">
                                                                                <ul>
                                                                                    <li><span className="info__count"><AiOutlineEye /></span> {item.listing.view}</li>

                                                                                    <li onClick={() => this.like(item.listing.listing_id)}>
                                                                                        <span className="info__count">   <FiHeart /></span> {item.listing.likes}
                                                                                    </li>

                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    < div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="button-shared text-center">
                                                                {this.state.visible < this.state.alllists.length &&
                                                                    <Badge pill variant="danger" onClick={this.loadMore} className="border-0">
                                                                        <span className="d-inline-block">
                                                                            load more  <FiRefreshCw />
                                                                        </span>
                                                                    </Badge>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4">
                                                    <div className="sidebar">
                                                        <div className="sidebar-widget">
                                                            <div className="btn-box">
                                                                <Button text="apply filter" url="#" className="d-block w-100 text-center">
                                                                    search<span className="d-inline-block"></span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="sidebar-widget">
                                                            <div className="contact-form-action">
                                                                <form>
                                                                    <div className="form-group">
                                                                        <span className="d-inline-block form-icon">
                                                                            <FiSearch />
                                                                        </span>
                                                                        <input className="form-control" type="text" value={this.state.searchitem} placeholder="quick search" onChange={(e) => this.filterList(e)} />
                                                                    </div>
                                                                </form>
                                                            </div>



                                                        </div>

                                                        {this.state.showregion ? <div className="sidebar-widget">
                                                            <h3 className="widget-title">
                                                                Filter By  Region In {this.state.countryname}
                                                            </h3>
                                                            <Select
                                                                value={this.state.selectedRegion}
                                                                onChange={this.handleChangeRegion}
                                                                placeholder="sort by region"
                                                                options={this.state.region && this.state.region}
                                                            />
                                                        </div> : ''}

                                                        {this.state.maincategory && this.state.maincategory.length > 0 ? (<div className="sidebar-widget">
                                                            <h3 className="widget-title">
                                                                Filter By  Category
                                                            </h3>
                                                            <div className="title-shape"></div>
                                                            <div className="check-box-list show-more-item filter-by-category mt-4 mb-4">
                                                                <Select
                                                                    value={this.state.selectedMaincategory}
                                                                    onChange={this.handleChangeMaincategory}
                                                                    placeholder="select category"
                                                                    options={this.state.maincategory && this.state.maincategory}
                                                                />
                                                            </div>


                                                        </div>) : ''}

                                                        {/* { filter by subcategory} */}

                                                        {
                                                            // this.state.showsubcat &&  this.state.showsubcat  ? 
                                                            this.state.category && this.state.category.length > 0 ? (
                                                                <div className="sidebar-widget">
                                                                    <h3 className="widget-title">
                                                                        Filter By  Sub Category
                                                            </h3>
                                                                    <div className="title-shape"></div>
                                                                    <div className="check-box-list show-more-item filter-by-category mt-4 mb-4">

                                                                        {this.state.category.map(item => {
                                                                            return (
                                                                                this.state.searchsubcat.replace(/\s/g, "").toLocaleLowerCase() === item.cat.replace(/\s/g, "").toLocaleLowerCase() ? (
                                                                                    <div className="custom-checkbox" key={item.id}>
                                                                                        <input type="checkbox" id={'chb' + item.id} value={item.cat} onChange={(e) => this.handleChange(e)} checked />
                                                                                        <label htmlFor={'chb' + item.id}>
                                                                                            {item.cat} <span>{item.catNum}</span>
                                                                                        </label>
                                                                                    </div>

                                                                                ) : (<div className="custom-checkbox" key={item.id}>
                                                                                    <input type="checkbox" id={'chb' + item.id} value={item.cat} onChange={(e) => this.handleChange(e)} />
                                                                                    <label htmlFor={'chb' + item.id}>
                                                                                        {item.cat} <span>{item.catNum}</span>
                                                                                    </label>
                                                                                </div>)

                                                                            )
                                                                        })}
                                                                    </div>
                                                                    { this.state.category && this.state.category.length > 3 ? (<Link to="#" id="showfilterbycategory" className="showmore-btn font-weight-semi-bold text-capitalize d-block ml-auto mr-auto text-center radius-rounded p-0 lessfilterbyfeature categorylessfilterbyfeature ">
                                                                        <span className="showmore-txt ">Show More</span>
                                                                        <span className="lessmore-txt d-none">Show Less</span>
                                                                    </Link>) : ''}

                                                                </div>) : ''
                                                            // : ''
                                                        }
                                                        {/* <WidgetFilterPrice />*/}

                                                        {this.props.match.params.category ? (<div className="sidebar-widget">
                                                            <h3 className="widget-title">
                                                                Filter By Feature
                                                            </h3>
                                                            <div className="title-shape"></div>
                                                            <div className="check-box-list show-more-item filter-by-feature mt-4 mb-4">
                                                                {this.state.features && this.state.features.map(item => {
                                                                    return (
                                                                        <div className="custom-checkbox" key={item.id}>
                                                                            <input type="checkbox" id={'chb2-' + item.id} value={item.text} onChange={(e) => this.handleFeatureChange(e)} />
                                                                            <label htmlFor={'chb2-' + item.id}>
                                                                                {item.text}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            {this.state.features && this.state.features.length > 3 ? (<Link to="#" id="showfilterbyfeature" className="showmore-btn font-weight-semi-bold text-capitalize d-block ml-auto mr-auto text-center  radius-rounded p-0 lessfilterbyfeature lessfilterbyfeature featurelessfilterbyfeature ">
                                                                <span className="showmore-txt ">Show More</span>
                                                                <span className="lessmore-txt d-none">Show Less</span>
                                                            </Link>) : ''}

                                                        </div>) : ''}

                                                        <div className="sidebar-widget">
                                                            <h3 className="widget-title">
                                                                Filter by Ratings
                                                            </h3>
                                                            <div className="title-shape"></div>
                                                            <ul className="rating-list mt-4">


                                                                <li>
                                                                    <span className="la-star"><MdStar /> <MdStar /> <MdStar /> <MdStar /> <MdStar /></span>
                                                                    <label className="review-label">
                                                                        <input type="radio" name="review-radio" value='5' onChange={this.handleRatingFilter} />
                                                                        <span className="review-mark"></span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <span className="la-star"><MdStar /> <MdStar />  <MdStar /> <MdStar /></span>
                                                                    <label className="review-label">
                                                                        <input type="radio" name="review-radio" value='4' onChange={this.handleRatingFilter} />
                                                                        <span className="review-mark"></span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <span className="la-star"><MdStar />  <MdStar /> <MdStar /></span>
                                                                    <label className="review-label">
                                                                        <input type="radio" name="review-radio" value='3' onChange={this.handleRatingFilter} />
                                                                        <span className="review-mark"></span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <span className="la-star"><MdStar />  <MdStar /></span>
                                                                    <label className="review-label">
                                                                        <input type="radio" name="review-radio" value='2' onChange={this.handleRatingFilter} />
                                                                        <span className="review-mark"></span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <span className="la-star"> <MdStar /></span>
                                                                    <label className="review-label">
                                                                        <input type="radio" name="review-radio" value='1' onChange={this.handleRatingFilter} />
                                                                        <span className="review-mark"></span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <span className="la-star">default</span>
                                                                    <label className="review-label">
                                                                        <input type="radio" name="review-radio" value='0' onChange={this.handleRatingFilter} />
                                                                        <span className="review-mark"></span>
                                                                    </label>
                                                                </li>

                                                            </ul>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>

                                            <div className="row">
                                                {this.state.alllists && this.state.alllists.length === 0 ?
                                                    (
                                                        <div className="btn-box text-center padding-top-30px">
                                                            <Button url="#" text="there is no  list " className=" d-block">
                                                                <span><BsEye /></span>
                                                            </Button>
                                                        </div>
                                                    ) : this.state.alllists.slice(0, this.state.visible).map((item, index) => {
                                                        return (
                                                            <div className="col-lg-4 column-td-6" key={index}>
                                                                <div className="card-item">
                                                                    <Link to={`/listing-details/${item.listing.canonicalurl}`} className="card-image-wrap">
                                                                        <div className="card-image">
                                                                            <img src={item.listing.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.bannerimg}` : item.listing.listimage} className="card__img" width="200px" height="200px" alt={item.listing.list_title} />
                                                                            <span className='badge'>{this.state.bedge}</span>
                                                                            <span className="badge-toggle" data-toggle="tooltip" data-placement="bottom" title="22 Likes">
                                                                                <FiHeart />
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                    <div className="card-content-wrap">
                                                                        <div className="card-content">
                                                                            <Link to={`/listing-list/${item.listing.canonical_url}`}>
                                                                                <h5 className="card-meta">
                                                                                    <span><i className={item.listing.icon}></i></span> {item.listing.categoryname}
                                                                                </h5>
                                                                            </Link>

                                                                            <Link to={`/listing-details/${item.listing.canonicalurl}`}>

                                                                                <h4 className="card-title">{item.listing.list_title}
                                                                                    <i><IoIosCheckmarkCircle /></i>
                                                                                </h4>
                                                                                <p className="card-sub">
                                                                                    {item.listing.address}
                                                                                </p>
                                                                            </Link>
                                                                            <Link to={`/user-profile/${item.listing.username}`} className="author-img" >
                                                                                <img src={item.listing.profileimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.profileimg}` : this.state.author} alt="author-img" />
                                                                            </Link>
                                                                            <ul className="info-list padding-top-20px">
                                                                                <li><span className="la d-inline-block"><FiPhone /></span> {item.listing.phone}</li>
                                                                                <li><span className="la d-inline-block"><IoIosLink /></span>  <a target="_blanc" href={item.listing.website} rel="noopener noreferrer">
                                                                                    {item.listing.website.replace(/^https:\/\//, '')}
                                                                                </a>
                                                                                </li>
                                                                                <li>
                                                                                    <span className="la d-inline-block"><FaRegCalendarCheck /></span>posted {moment(Number(item.listing.creating_time)).fromNow()}
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="rating-row">
                                                                            <div className="rating-rating">

                                                                                <span> <ReactStars
                                                                                    count={5}
                                                                                    size={24}
                                                                                    value={item.rating[0].rating ? parseFloat(item.rating[0].rating).toFixed(1) : 0}
                                                                                    isHalf={true} /> </span><span> - </span>
                                                                                <span className="rating-count"> {parseFloat(item.rating[0].rating).toFixed(1)}</span>


                                                                            </div>
                                                                            <div className="listing-info">
                                                                                <ul>
                                                                                    <li><span className="info__count"><AiOutlineEye /></span> {item.listing.view}</li>

                                                                                    <li onClick={() => this.like(item.listing.listing_id)}>
                                                                                        <span className="info__count">   <FiHeart /></span> {item.listing.likes}
                                                                                    </li>

                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="button-shared text-center">
                                                        {this.state.visible < this.state.alllists.length &&
                                                            <button text="load more" onClick={this.loadMore} className="border-0">
                                                                <span className="d-inline-block">
                                                                    <FiRefreshCw />
                                                                </span>
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </div>
                                </div>


                            </div>
                        </Tabs>
                    </div>
                </main>
                {/* Newsletter */}


                {/* Footer */}
                <Footer />

                <ScrollTopBtn />

            </LoadingOverlay> </>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { lists, categorylists } = state.list;
    const { amenties, subcategory, category, mylocation, pageinfo } = state.common;

    return {
        isLoggedIn, userdetails, lists, category, categorylists, mylocation, amenties, subcategory, pageinfo

    };
}
export default connect(mapStateToProps)(ListHeaderTwo);
