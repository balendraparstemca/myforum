import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import { BsGrid, BsListUl } from "react-icons/bs";
import Breadcrumb from "../../components/common/Breadcrumb";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactStars from "react-rating-stars-component";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { connect } from "react-redux";
import { fetchCategory, getAllSubCategory } from '../../services/action/common';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoadingOverlay from 'react-loading-overlay';
import { BsEye } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { IoIosCheckmarkCircle, IoIosLink, } from "react-icons/io";
import { FiHeart, FiPhone } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import $ from 'jquery'
import moment from 'moment';
import { gethomeList, getMainCategorylist, likeList } from '../../services/action/list';
import { MdStar } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { Badge } from 'react-bootstrap';
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

class BlogGrid extends Component {
    constructor(props) {
        super(props)
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            catid: null,
            breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
            loading: true,
            img: require('../../assets/images/bg.png'),
            breadimg: require('../../assets/images/bread-bg.jpg'),
            categoryname: '',
            description: '',
            subcategory: [],
            icon: '',
            alllists: [],
            author: require('../../assets/images/testi-img2.jpg'),
            listimage: require('../../assets/images/bread-bg.jpg'),
            bedge: 'New Open',
            category: [],
            amentieslist: [],
            filter: [],
            mainlists: [],
            mediaterlist: [],
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
            selectedRegion: null,
            showregion: false,
            countryname: ''
        }
    }


    componentDidMount() {
        this.categorydetail()



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

        if (this.state.prevurl !== this.props.match.params.catname) {
            this.setState({
                prevurl: this.props.match.params.catname, loading: true
            })
            this.categorydetail()

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

        result.push()

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

    like = (listingid) => {
        if (this.props.userdetails) {
            const obj = {
                listing_id: listingid,
                like_by: this.props.userdetails.id
            }
            this.props.dispatch(likeList(obj)).then(() => {
                this.fetchHomelists(this.state.catid);

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
        let lists = this.state.mediaterlist;

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

    fetchHomelists = (catid) => {
      
        if (catid) {
            this.setState({ loading: true })
            this.props.dispatch(getMainCategorylist(catid)).then(() => {
                if (this.props.maincategorylists && this.props.maincategorylists.length > 0) {
                    this.setState({ loading: false })

                    this.setState({
                        alllists: this.props.maincategorylists, mainlists: this.props.maincategorylists, loading: false
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

    }

    sortByhighrating = () => {
        let lists = this.state.mediaterlist;

        let arr = lists.sort(function (a, b) {
            return parseFloat(b.rating[0].rating) - parseFloat(a.rating[0].rating);
        });

        this.setState({ alllists: arr })
    }


    sortBypopular = () => {

        let lists = this.state.mediaterlist;

        let arr = lists.sort(function (a, b) {
            return Number(b.listing.likes) - Number(a.listing.likes);
        });

        this.setState({ alllists: arr })

    }

    sortBynew = () => {
        let lists = this.state.mediaterlist;

        let arr = lists.sort(function (a, b) {
            return Number(b.listing.creating_time) - Number(a.listing.creating_time);
        });
        this.setState({ alllists: arr })

    }

    sortByold = () => {
        let lists = this.state.mediaterlist;

        let arr = lists.sort(function (a, b) {
            return Number(a.listing.creating_time) - Number(b.listing.creating_time);
        });



        this.setState({ alllists: arr })

    }

    sortBydefault = () => {

        this.setState({ alllists: this.state.mainlists })

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
        this.setState({ selectedCountryby });
        if (selectedCountryby.value === 'All') {

            this.setState({ alllists: this.state.mainlists, mediaterlist: this.state.mainlists, showregion: false, countryname: '' }, () => { this.Region(); this.category() })

        }
        else {
            let lists = this.state.mainlists;
            let arr = lists.filter(function (item) {
                return item.listing.country === selectedCountryby.value;
            });

            this.setState({ alllists: arr, mediaterlist: arr, showregion: true, countryname: selectedCountryby.value }, () => { this.Region(); this.category() })


        }

    }

    handleChangeRegion = async (selectedRegion) => {
        this.setState({ selectedRegion });

        if (selectedRegion.value === 'All') {

            this.setState({ alllists: this.state.mediaterlist })

        }
        else {
            let lists = this.state.mediaterlist;
            let arr = lists.filter(function (item) {
                return item.listing.state === selectedRegion.value;
            });

            this.setState({ alllists: arr })
        }

    }





    createMarkup = (content) => {
        return { __html: content };
    }

    categorydetail = () => {
        this.setState({ loading: true })
        let obj = { canonical_url: this.props.match.params.catname }
        this.props.dispatch(fetchCategory(obj)).then(() => {
            if (this.props.category && this.props.category.length > 0) {
                const obj = { cat_id: this.props.category[0].cat_id }
                this.setState({ loading: false, catid: this.props.category[0].id, icon: this.props.category[0].icon, categoryname: this.props.category[0].name, description: this.props.category[0].description, breadcrumbimg: this.props.category[0].imgsrc ? `${process.env.REACT_APP_API_KEY}utilities/${this.props.category[0].imgsrc}` : this.state.breadimg })
                this.fetchHomelists(this.props.category[0].id)
                this.props.dispatch(getAllSubCategory(obj)).then(() => {
                    if (this.props.subcategory && this.props.subcategory.length > 0) {
                        this.setState({
                            subcategory: this.props.subcategory
                        })
                    }

                })

            }
            else {
                this.props.history.push("/error");
                window.location.reload();
            }
        }, (error) => {
            this.props.history.push("/error");
            window.location.reload();

            this.setState({ loading: false })
        })
    }

    handleModalShowHide() {

        this.props.history.push('/categories')

    }

    render() {


        return (<>
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'
            >
                <Helmet>
                    <title>{this.state.categoryname && this.state.categoryname}</title>
                    <meta name="keywords" content="casual desi,desi yaaro,sitarafoods,discussion forum ,information" />
                </Helmet>
                <main className="blog-grid-page">
                    {/* Header */}
                    <GeneralHeader />
                    {/* Breadcrumb */}
                    <>
                        <Breadcrumb CurrentPgTitle={this.state.categoryname && this.state.categoryname} MenuPgTitle="Category" img={this.state.breadcrumbimg} />
                        <section className="cat-area padding-top-5px padding-bottom-80px">
                            <div className="container">
                                <div className="row">

                                    {
                                        this.state.description && this.state.description ? (<div className="container card shadow  margin-top-10px ">
                                            <div className="col-lg-12 position-relative" >
                                                <div className="highlight-btn mt-4">
                                                    <Button text="view more categories" className="radius-rounded">
                                                        <b className="breadcrumb__title highlight-btn mt-4">
                                                            <span className="la d-inline-block"><i className={this.state.icon}></i></span>   {this.state.categoryname && this.state.categoryname}
                                                        </b>
                                                    </Button>
                                                    <Button variant="danger" text="view more categories" className="radius-rounded ml-2 mt-2">
                                                        <b className="breadcrumb__title highlight-btn mt-4">
                                                            <span className="la d-inline-block"></span><Link to="/categories">  More Categories.. </Link>  </b>
                                                    </Button>
                                                </div>



                                            </div>
                                            <div className="post-author d-flex align-items-center justify-content-between m-3">
                                                <p className="breadcrumb__desc" dangerouslySetInnerHTML={this.createMarkup(this.state.description && this.state.description)}></p>

                                            </div>
                                        </div>) : ''

                                    }

                                    <div className="container card shadow  margin-top-10px ">
                                        <div className="highlighted-categories">

                                            <div className="row">
                                                {this.state.subcategory && this.state.subcategory.length > 0 ? this.state.subcategory.map((item, index) => {
                                                    return (
                                                        <div className="col-lg-2 column-td-6" key={index}>
                                                            <div className="category-item mb-4 mt-0 ml-0 mr-0 p-0">
                                                                <figure className="category-fig m-0">
                                                                    <img src={item.imgsrc ? `${process.env.REACT_APP_API_KEY}utilities/${item.imgsrc}` : this.state.img} alt="" width="200px" height="200px" className="cat-img" />
                                                                    <figcaption className="fig-caption">
                                                                        <Link to={`/listing-list/${item.canonical_url}`} className="cat-fig-box">
                                                                            <div className="icon-element mb-3">
                                                                                <i class={`${item.icon}`}></i>
                                                                            </div>
                                                                            <div className="cat-content">
                                                                                <h4 className="cat__title mb-3">{item.name}</h4>

                                                                            </div>
                                                                        </Link>
                                                                    </figcaption>
                                                                </figure>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : <div className="col-lg-3 column-td-6" >
                                                        <div className="category-item mb-4 mt-0 ml-0 mr-0 p-0">
                                                            <figure className="category-fig m-0">
                                                                <img src={this.state.img} alt="" width="200px" height="200px" className="cat-img" />
                                                                <figcaption className="fig-caption">
                                                                    <Link to={``} className="cat-fig-box">
                                                                        <div className="icon-element mb-3">
                                                                            <i class=''></i>
                                                                        </div>
                                                                        <div className="cat-content">
                                                                            <h4 className="cat__title mb-3">there is no category</h4>

                                                                        </div>
                                                                    </Link>
                                                                </figcaption>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    {
                                        this.state.alllists && this.state.alllists.length > 0 ? (

                                            <div className="container card shadow  margin-top-10px ">
                                                <div className="col-lg-12 position-relative" >
                                                    <div className="highlight-btn mt-4">
                                                        <Button variant="danger" text="view more categories" className="radius-rounded" url="/all-categories">
                                                            <b className="breadcrumb__title highlight-btn mt-4">
                                                                <span className="la d-inline-block"><i className={this.state.icon}></i></span>   {this.state.categoryname && this.state.categoryname} Listings
                                                      </b>
                                                        </Button>
                                                    </div>



                                                </div>
                                                <div className="post-author d-flex align-items-center justify-content-between m-3">
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
                                                                        <p className="showing__text text-right">
                                                                            Sort By Country
                                                                     </p>
                                                                        <div className="short-option mr-3">
                                                                            <Select
                                                                                className="filterbycountry"
                                                                                value={this.state.selectedCountryby}
                                                                                onChange={this.handleChangeCountryby}
                                                                                placeholder="Short by Country"
                                                                                options={this.state.country && this.state.country}
                                                                            />
                                                                        </div>
                                                                        <div className="short-option mr-3">
                                                                            <Select
                                                                                value={this.state.selectedShortby}
                                                                                onChange={this.handleChangeshortby}
                                                                                placeholder="Short by"
                                                                                options={shortby}
                                                                            />
                                                                        </div>
                                                                        <div className="short-option mr-3">
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
                                                                                    <div className="row">
                                                                                        {
                                                                                            this.state.loading ? (
                                                                                                <div className="d-flex justify-content-center text-center margin-top-20px margin-bottom-20px text-primary">

                                                                                                    <span className="spinner-border spinner-border-lg"></span>
                                                                                                </div>
                                                                                            ) : (
                                                                                                    this.state.alllists && this.state.alllists.length === 0 ?
                                                                                                        (
                                                                                                            <div className="button-shared  text-center">
                                                                                                                <Button url="#" text="there is no  list " className="border-o">
                                                                                                                    <span><BsEye /></span>
                                                                                                                </Button>
                                                                                                            </div>
                                                                                                        ) : this.state.alllists.slice(0, this.state.visible).map((item, index) => {
                                                                                                            return (
                                                                                                                <div className="col-lg-6 col-md-6" key={index}>
                                                                                                                    <div className="card-item">
                                                                                                                        <Link to={`/listing-details/${item.listing.canonicalurl}`} className="card-image-wrap">
                                                                                                                            <div className="card-image">
                                                                                                                                <img src={item.listing.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.bannerimg}` : item.listing.listimage} className="card__img" width="200px" height="200px" alt={item.listing.list_title} />
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
                                                                                                                                        <span></span> {item.listing.categoryname}
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
                                                                                                                </div>
                                                                                                            )
                                                                                                        }))}
                                                                                    </div>
                                                                                    <div className="row">

                                                                                        <div className="col-lg-12">
                                                                                            <div className="button-shared  text-center ">
                                                                                                {this.state.visible < this.state.alllists.length &&
                                                                                                    <Badge pill variant="danger" onClick={this.loadMore} className="border-0">
                                                                                                        <h5> load more <span className="d-inline-block">
                                                                                                            <FiRefreshCw />
                                                                                                        </span></h5>
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
                                                                                                        <input className="form-control" type="text" placeholder="What are you looking for?" onChange={(e) => this.filterList(e)} />
                                                                                                    </div>
                                                                                                </form>
                                                                                            </div>



                                                                                        </div>

                                                                                        {this.state.showregion ? <div className="sidebar-widget">
                                                                                            <h3 className="widget-title">
                                                                                                Filter By  Region In {this.state.countryname}
                                                                                            </h3>
                                                                                            <Select
                                                                                                value={this.selectedRegion}
                                                                                                onChange={this.handleChangeRegion}
                                                                                                placeholder="sort by region"
                                                                                                options={this.state.region && this.state.region}
                                                                                            />
                                                                                        </div> : ''}
                                                                                        {<div className="sidebar-widget">
                                                                                            <h3 className="widget-title">
                                                                                                Filter By  Category
                                                                                        </h3>
                                                                                            <div className="title-shape"></div>
                                                                                            <div className="check-box-list show-more-item filter-by-category mt-4 mb-4">

                                                                                                {this.state.category && this.state.category.map(item => {
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

                                                                                        </div>}

                                                                                        {/* <WidgetFilterPrice />*/}

                                                                                        {/* {this.props.match.params.category ? (<div className="sidebar-widget">
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
                                                                                            <Link to="#" id="showfilterbyfeature" className="showmore-btn font-weight-semi-bold text-capitalize d-block ml-auto mr-auto text-center  radius-rounded p-0">
                                                                                                <span className="showmore-txt ">Show More</span>
                                                                                                <span className="lessmore-txt d-none">Show Less</span>
                                                                                            </Link>
                                                                                        </div>) : ''} */}

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
                                                                                        <div className="btn-box text-left padding-top-30px">
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
                                                                                                                    <span></span> {item.listing.categoryname}
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
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <div className="button-shared mt-4 text-center">
                                                                                        {this.state.visible < this.state.alllists.length &&
                                                                                            <Badge pill variant="danger" onClick={this.loadMore} className="border-0">
                                                                                                <h5> <span className="d-inline-block">
                                                                                                    Load More <FiRefreshCw />
                                                                                                </span></h5>
                                                                                            </Badge>
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

                                                </div>
                                            </div>) : ''

                                    }

                                </div>
                            </div>
                        </section>
                    </>
                    {/* Newsletter */}
                    <NewsLetter />

                    {/* Footer */}
                    <Footer />

                    <ScrollTopBtn />
                </main > </LoadingOverlay>
        </>

        );
    }
}

function mapStateToProps(state) {
    const { category, subcategory, amenties } = state.common;
    const { isLoggedIn, userdetails } = state.auth;
    const { lists, searchlists, categorylists, maincategorylists } = state.list;

    return {
        category, subcategory, amenties, isLoggedIn, userdetails, lists, searchlists, categorylists, maincategorylists
    };
}


export default connect(mapStateToProps)(BlogGrid);