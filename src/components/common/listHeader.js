import React, { Component } from 'react';
import { BsGrid, BsListUl } from "react-icons/bs";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import GeneralHeader from './GeneralHeader';
import Breadcrumb from './Breadcrumb';
import Footer from './footer/Footer';
import ScrollTopBtn from './ScrollTopBtn';
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { IoIosCheckmarkCircle, IoIosLink, } from "react-icons/io";
import { FiHeart, FiPhone } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import $ from 'jquery'
import Button from "../../components/common/Button";
import moment from 'moment';
import { fetchAmenties, fetchCategory, getAllSubCategory, getDefaultMeta, getPageinfo } from '../../services/action/common';
import { getCategorylist, gethomeList, likeList } from '../../services/action/list';
import { connect } from "react-redux";
import { BsEye } from 'react-icons/bs';
import { MdStar } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import LoadingOverlay from 'react-loading-overlay';
import MetaTag from '../../pages/metainfo';
import HighlightedCategory from '../other/categories/HighlightedCategory';

const shortby = [
    {
        value: 1,
        label: 'Sort by default'
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

class ListHeader extends Component {
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
            showsubcat: false,
            searchitem:''
         
        }


    }

    componentDidMount() {
        this.props.dispatch(fetchCategory({ status: true }))
        if (this.props.match.params.category) {
            this.setState({ paramid: this.props.match.params.category });
            this.fetchsubcategorydetail()

        } else {
            this.fetchHomelists();
            this.getpageseo({ page_type: 'listing' })

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

        if (this.state.paramid !== this.props.match.params.category) {
            this.props.dispatch(fetchCategory({ status: true }))
            this.setState({ paramid: this.props.match.params.category });
            if (this.props.match.params.category) {
                this.fetchsubcategorydetail()

            } else {
                this.fetchHomelists();
                this.getpageseo({ page_type: 'listing' })

            }
        }

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
    }


    getpageseo = (obj) => {
        this.props.dispatch(getPageinfo(obj)).then(() => {
            if (this.props.pageinfo.length > 0) {
                this.setState({
                    metainfo: {
                        title: this.props.pageinfo[0].meta_title,
                        canonicalURL: `https://www.casualdesi.com/contact || ''}`,
                        meta: [{
                            attribute: 'name',
                            value: 'description',
                            content: this.props.pageinfo[0].meta_description
                        },
                        {
                            attribute: 'name',
                            value: 'keywords',
                            content: this.props.pageinfo[0].meta_keywords
                        }]
                    }
                })

            } else {

                this.setState({
                    defaultMetaTag: getDefaultMeta()
                })
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
            country: [{
                value: 'All',
                label: 'All'
            }]
        })
        const map = new Map();

        for (const item of array) {

            if (!map.has(item.listing.country)) {
                map.set(item.listing.country, true);    // set any value to Map
                this.state.country.push({
                    value: item.listing.country,
                    label: item.listing.country
                });
            }
        }
    }

    filterList = (e) => {

        let updateList = this.state.mainlists;
        this.setState({searchitem:e.target.value})
        updateList = updateList.filter(item => {
            return item.listing.list_title.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.categoryname.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.username.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.city.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.country.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1 || item.listing.state.toLowerCase().search(
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

        if (e.currentTarget.checked) {
            this.state.filter.push(e.currentTarget.value)
        }
        else {
            let index = this.state.filter.indexOf(e.currentTarget.value);
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
                return filterarr.includes(item.listing.categoryname);
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

    fetchsubcategorydetail() {
        this.setState({ loading: true })
        let obj = { canonical_url: this.props.match.params.category }
        this.props.dispatch(getAllSubCategory(obj)).then(() => {
            this.setState({ loading: false })
            if (this.props.subcategory && this.props.subcategory.length > 0) {
                this.fetchSubCategorylists(this.props.subcategory[0].subcat_id, this.props.subcategory[0].id)
                this.setState({ loading: false, subcatdetail: this.props.subcategory, icon: this.props.subcategory[0].icon, subcatname: this.props.subcategory[0].name, subcatdescription: this.props.subcategory[0].description, breadcrumbimg: this.props.subcategory[0].imgsrc ? `${process.env.REACT_APP_API_KEY}utilities/${this.props.subcategory[0].imgsrc}` : this.state.breadcrumbimg })
            }
            else {
                this.props.history.push("/error");
                window.location.reload();
            }
        }, (error) => {

            this.setState({ loading: false })
        })

    }

    fetchSubCategorylists = (subcatid, sid) => {
        this.setState({ loading: true })
        this.props.dispatch(getCategorylist(subcatid)).then(() => {


            if (this.props.categorylists && this.props.categorylists.length > 0) {
                this.setState({
                    loading: false, alllists: this.props.categorylists, mainlists: this.props.categorylists, loading: false
                })
                this.props.dispatch(fetchAmenties(sid)).then(() => {
                    this.setState({ amentieslist: this.props.amenties })
                    this.allfeatures();
                })
                this.country()
                this.handleChangeCountryby({ value: "All", label: 'All' })

            }
            else {
                this.setState({ loading: false })
            }

        }, (error) => {

            this.setState({ loading: false })
        });

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
                this.handleChangeCountryby({ value: "All", label: 'All' })

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

        this.setState({ alllists: this.state.mainlists,selectedMaincategory:null,selectedCountryby:null })

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
        this.setState({ selectedCountryby:selectedCountryby, searchitem:'',selectedShortby:null });
        this.handleChangeMaincategory({value:'All',label:'All'})
        this.handleChangeRegion({value:'All',label:'All'})
        if (selectedCountryby.value === 'All') {

            this.setState({ alllists: this.state.mainlists, mediaterlist: this.state.mainlists, showregion: false, countryname: '' }, () => { this.Region(); this.category(); this.maincategory() })

        }
        else {
            let lists = this.state.mainlists;
            let arr = lists.filter(function (item) {
                return item.listing.country === selectedCountryby.value;
            });

            this.setState({ alllists: arr, mediaterlist: arr, showregion: true, countryname: selectedCountryby.value }, () => { this.Region(); this.category(); this.maincategory() })


        }

    }

    handleChangeRegion = async (selectedRegion) => {
        this.setState({ selectedRegion });
        this.handleChangeMaincategory({value:'All',label:'All'})

        if (selectedRegion.value === 'All') {

            this.setState({ alllists: this.state.mediaterlist },()=>{ this.maincategory()})

        }
        else {
            let lists = this.state.mediaterlist;
            let arr = lists.filter(function (item) {
                return item.listing.state === selectedRegion.value;
            });

            this.setState({ alllists: arr,mediatersecondlist:arr },()=>{ this.maincategory()})
        }

    }

    handleChangeMaincategory = async (selectedMaincategory) => {
        this.setState({ selectedMaincategory });

        if (selectedMaincategory.value === 'All') {

            this.setState({ alllists: this.state.mediaterlist, showsubcat: false },()=> {this.category()})

        }
        else {
            let lists = this.state.mediaterlist;
            let arr = lists.filter(function (item) {
                return item.listing.categoryid === selectedMaincategory.value;
            });

            this.setState({ alllists: arr,mediatersecondlist:arr, showsubcat: true },()=> { this.category()})
        }

    }

    createMarkup = (content) => {
        return { __html: content };
    }

    render() {

        return (
            <>  <LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'
            >
                {this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || getDefaultMeta()}></MetaTag> : ''}


                <main className="listing-list">
                    {/* Header */}
                    <GeneralHeader />

                    {/* Breadcrumb */}
                    <Breadcrumb CurrentPgTitle={this.state.subcatname} MenuPgTitle="Listings" img={this.state.breadcrumbimg} />

                    <div className="container">
                        <div className="shadow mb-2">
                            <HighlightedCategory />
                             {this.props.match.params.category ? (
                                <div className="col-lg-12 mb-10">

                                    { this.state.subcatdescription && this.state.subcatdescription ? (
                                        <div className="container card shadow  margin-top-10px  margin-bottom-10px ">
                                       
                                            <Button  className="margin-top-10px">
                                                <b className="breadcrumb__title highlight-btn mt-4">
                                                    <span className="la d-inline-block"><i className={this.state.icon}></i></span>   {this.state.subcatname && this.state.subcatname}
                                                </b>
                                            </Button>
                                            <div className="post-author d-flex align-items-center justify-content-between m-2">

                                                <div>
                                                    <p className="breadcrumb__desc" dangerouslySetInnerHTML={this.createMarkup(this.state.subcatdescription && this.state.subcatdescription)}></p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''}

                                </div>

                            ) : ''} 

                        </div>
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
                                                                            <span className='badge'>{item.listing.badge_status ? item.listing.badge_status : '' }</span>
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
                                                                        <input className="form-control" type="text" value={this.state.searchitem} placeholder="What are you looking for?" onChange={(e) => this.filterList(e)} />
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

                                                        { this.state.maincategory && this.state.maincategory.length > 0 ? (<div className="sidebar-widget">
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
                                                         this.state.showsubcat ?  this.state.category && this.state.category.length > 0 ? (<div className="sidebar-widget">
                                                            <h3 className="widget-title">
                                                                Filter By  Sub Category
                                                            </h3>
                                                            <div className="title-shape"></div>
                                                            <div className="check-box-list show-more-item filter-by-category mt-4 mb-4">

                                                                {this.state.category.map(item => {
                                                                    return (
                                                                        <div className="custom-checkbox" key={item.id}>
                                                                            <input type="checkbox" id={'chb' + item.id} value={item.cat} onChange={(e) => this.handleChange(e)} />
                                                                            <label htmlFor={'chb' + item.id}>
                                                                                {item.cat} <span>{item.catNum}</span>
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            {this.state.category && this.state.category.length > 3 ? (<Link to="#" id="showfilterbycategory" className="showmore-btn font-weight-semi-bold text-capitalize d-block ml-auto mr-auto text-center radius-rounded p-0 lessfilterbyfeature categorylessfilterbyfeature ">
                                                                <span className="showmore-txt ">Show More</span>
                                                                <span className="lessmore-txt d-none">Show Less</span>
                                                            </Link>) : ''}

                                                        </div>) : '' : ''}
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
            </LoadingOverlay>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { lists, categorylists } = state.list;
    const { amenties, subcategory, category, pageinfo } = state.common;

    return {
        isLoggedIn, userdetails, lists, category, categorylists, amenties, subcategory, pageinfo

    };
}
export default connect(mapStateToProps)(ListHeader);
