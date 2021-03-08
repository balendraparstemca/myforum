import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import { GiPositionMarker, GiChickenOven } from 'react-icons/gi'
import { MdStar, MdStarBorder, MdClose } from 'react-icons/md'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineFlag } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaRegEnvelope, FaRegCalendarCheck, FaYoutube } from 'react-icons/fa'
import { RiBookmarkLine, RiExternalLinkLine, RiSendPlane2Line } from 'react-icons/ri';
import { BsCheckCircle } from 'react-icons/bs'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import ModalVideo from 'react-modal-video'
import { Link } from "react-router-dom";
// import GeneralMap from "../../components/contact/GeneralMap";
import Map from "../../components/contact/map";

import ListingDetailsComments from "../../components/contact/ListingDetailsComments";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { getListAmenties, getListDetail, getListFullDetail, getlistimage, getListingother, getlistreview, getListShedule, getpeopleviewList, reportList, saveList, viewList } from '../../services/action/list';
import { connect } from "react-redux";
import $ from 'jquery';
import moment from 'moment';
import ReactStars from "react-rating-stars-component";
import { FiExternalLink, FiHeart, FiPhone, FiUser } from 'react-icons/fi';
import WidgetOpenHours from '../../components/sidebars/widgets/WidgetOpenHours';
import WidgetSimilarListing from '../../components/sidebars/widgets/WidgetSimilarListing';
import { IoIosCheckmarkCircle, IoIosLink } from 'react-icons/io';
import LoadingOverlay from 'react-loading-overlay';
import { Dropdown } from 'react-bootstrap';
import { EmailShareButton, WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon, EmailIcon } from "react-share";
import MetaTag from '../metainfo';
class ListingDetails extends Component {
    constructor(props) {
        super(props)
        this.onChangeReport = this.onChangeReport.bind(this);
        this.state = {
            isloading: false,
            loading: true,
            previcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13 20c-.802 0-1.555-.312-2.122-.879l-7.121-7.121 7.122-7.121c1.133-1.133 3.11-1.133 4.243 0 .566.566.878 1.32.878 2.121s-.312 1.555-.879 2.122l-2.878 2.878 2.878 2.879c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.122c-.566.566-1.319.878-2.121.878zm-6.415-8l5.708 5.707c.378.378 1.037.377 1.414 0 .189-.189.293-.439.293-.707s-.104-.518-.293-.707l-4.292-4.293 4.292-4.293c.189-.189.293-.44.293-.707s-.104-.518-.293-.707c-.378-.379-1.037-.378-1.414-.001l-5.708 5.708z"></path></svg>',
            nextIcon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 20c-.802 0-1.555-.312-2.122-.879-.566-.566-.878-1.32-.878-2.121s.312-1.555.879-2.122l2.878-2.878-2.878-2.879c-.567-.566-.879-1.32-.879-2.121s.312-1.555.879-2.122c1.133-1.132 3.109-1.133 4.243.001l7.121 7.121-7.122 7.121c-.566.567-1.319.879-2.121.879zm0-14c-.268 0-.518.104-.707.292-.189.19-.293.441-.293.708s.104.518.293.707l4.292 4.293-4.292 4.293c-.189.189-.293.439-.293.707s.104.518.293.707c.378.379 1.037.378 1.414.001l5.708-5.708-5.708-5.707c-.189-.189-.439-.293-.707-.293z"></path></svg>',
            authorImg: require('../../assets/images/testi-img2.jpg'),
            file: '',
            authorName: 'Mark Williamson',
            isOpen: false,
            listImg: '',
            listName: '',
            listbio: '',
            address: '',
            city: '',
            country: '',
            listingid: null,
            verifiedtxt: "",
            listimage: [],
            latitude: 0,
            lagnitude: 0,
            ownername: '',
            email: '',
            phone: '',
            website: '',
            facebooklink: '',
            twitterlink: '',
            videolink: '',
            googleplus: '',
            linkedin: '',
            bannerimg: '',
            reporttext: " ",
            tags: '',
            categoryname: '',
            categoryid: null,
            viewlisting: [],
            createddate: '',
            subcatid: '',
            metainfo: null,
            listother: []




        }
        this.openModal = this.openModal.bind(this)
    }

    componentDidMount() {
        $(document).on('click', '.report-list-items .report-modal-btn', function (e) {
            $('body').addClass('modal-open').css({ paddingRight: '17px' });
            $(".report-modal-box").addClass('show')
            e.preventDefault();
        })
        $(document).on('click', '.report-modal-box .modal-bg, .report-modal-box .modal-top .close', function (e) {
            $('body').removeClass('modal-open').css({ paddingRight: '0' });
            $(".report-modal-box").removeClass('show')
            e.preventDefault();
        })
        this.fetchlistDeatil()

    }

    componentDidUpdate() {

        if (this.state.prevurl !== this.props.match.params.listurl) {
            this.setState({
                prevurl: this.props.match.params.listurl, loading: true
            })
            this.fetchlistDeatil()

        }
    }


    fetchlistothers = (listid) => {
        if (listid) {
            this.props.dispatch(getListingother({ listing_id: listid })).then(() => {
                if (this.props.listother.length > 0) {
                    this.setState({ listother: this.props.listother })

                } else {
                    this.setState({
                        listother: []
                    })
                }

            })
        }
    }

    saveUserList = (listid) => {

        if (this.props.isLoggedIn) {
            this.setState({
                loading: true
            })
            const obj = {
                listing_id: listid,
                saved_by: this.props.userdetails.id,
            }

            this.props.dispatch(saveList(obj)).then(() => {
                this.setState({
                    loading: false
                })

            });
        } else {
            alert("please login ")
        }
    }

    UserViewedList = (listid) => {
        if (this.props.isLoggedIn) {
            const obj = {
                listing_id: listid,
                view_by: this.props.userdetails.id,
            }

            this.props.dispatch(viewList(obj));

        }

    }

    peopleviewedList = async (country, state, city) => {
        const obj = {
            "city": city,
            "state": state,
            "country": country,
        }
        await this.props.dispatch(getpeopleviewList(obj)).then(() => {
            this.setState({
                viewlisting: this.props.viewedlists
            })
        })

    }




    onReport = (listid) => {


        if (this.props.isLoggedIn) {
            this.setState({ loading: true })
            const obj = {
                listing_id: listid,
                report_by: this.props.userdetails.id,
                reason: this.state.reporttext
            }

            if (obj.reason.length > 2) {

                this.props.dispatch(reportList(obj)).then(() => {
                    this.setState({ reporttext: '' })
                    this.setState({ loading: false })
                });

            }
            else {
                alert('please write something')

            }


        } else {
            alert('please login')
        }

    }

    onChangeReport(e) {

        this.setState({
            reporttext: e.target.value
        });

    }

    fetchlistDeatil = async () => {
        if (this.props.match.params.listurl) {
            let obj = { "canonicalurl": this.props.match.params.listurl }
            this.props.dispatch(getListDetail(obj)).then(() => {
                this.setState({ loading: false })
                if (this.props.listdetail) {
                    if (this.props.listdetail.meta) {
                        this.setState({
                            metainfo: {
                                title: this.props.listdetail.seo_title ? this.props.listdetail.seo_title : this.props.listdetail.list_title,
                                canonicalURL: `https://www.casualdesi.com${this.props.location.pathname || ''}`,
                                meta: JSON.parse(this.props.listdetail.meta)
                            }
                        })

                    }
                    else {
                        this.setState({
                            metainfo: {
                                title: this.props.listdetail.list_title,
                                canonicalURL: `https://www.casualdesi.com${this.props.location.pathname || ''}`,
                                meta: [{
                                    attribute: 'name',
                                    value: 'description',
                                    content: this.props.listdetail.description
                                }]
                            }
                        })
                    }



                    this.UserViewedList(this.props.listdetail.listing_id)
                    this.setState({
                        listName: this.props.listdetail && this.props.listdetail.list_title,
                        listbio: this.props.listdetail && this.props.listdetail.description,
                        address: this.props.listdetail && this.props.listdetail.address,
                        state: this.props.listdetail && this.props.listdetail.state,
                        city: this.props.listdetail && this.props.listdetail.city,
                        listImg: this.props.listdetail && this.props.listdetail.bannerimg ? <img src={`${process.env.REACT_APP_API_KEY}utilities/${this.props.listdetail.bannerimg}`} alt='list-profile' /> : <img src={require('../../assets/images/bread-bg.jpg')} alt='default-list-profile' />,
                        file: this.props.listdetail && this.props.listdetail.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${this.props.listdetail.bannerimg}` : require('../../assets/images/bread-bg.jpg'),
                        listingid: this.props.listdetail && this.props.listdetail.listing_id,
                        verifiedtxt: this.props.listdetail && this.props.listdetail.approved ? 'Verified list' : 'Not Verified Yet',
                        country: this.props.listdetail && this.props.listdetail.country,
                        lagnitude: this.props.listdetail.lagnitude ? parseFloat(this.props.listdetail.lagnitude) : '',
                        latitude: this.props.listdetail.latitude ? parseFloat(this.props.listdetail.latitude) : '',
                        tags: this.props.listdetail && this.props.listdetail.keywords.replace(/,/g, ' '),
                        categoryname: this.props.listdetail && this.props.listdetail.categoryname,
                        categoryid: this.props.listdetail && this.props.listdetail.categoryid,
                        createddate: this.props.listdetail && this.props.listdetail.creating_time,
                        subcatid: this.props.listdetail && this.props.listdetail.subcat_id


                    })

                    this.fetchlistfullDeatil();
                    this.props.dispatch(getListAmenties({ "listing_id": this.props.listdetail && this.props.listdetail.listing_id }));
                    this.fetchImage(this.props.listdetail && this.props.listdetail.listing_id);
                    this.fetchlistothers(this.props.listdetail && this.props.listdetail.listing_id);
                    this.fetchlistshedule(this.props.listdetail && this.props.listdetail.listing_id);
                    this.props.dispatch(getlistreview({ "listing_id": this.props.listdetail && this.props.listdetail.listing_id }))
                    this.peopleviewedList(this.props.listdetail.country, this.props.listdetail.state, this.props.listdetail.city)

                } else {
                    this.props.history.push("/error");
                    window.location.reload();
                }
            });



        } else {
            this.props.history.push("/error");
            window.location.reload();
        }



    }

    fetchlistfullDeatil = async () => {
        let obj = { "listing_id": this.props.listdetail && this.props.listdetail.listing_id }
        this.props.dispatch(getListFullDetail(obj)).then(() => {
            let match = this.props.listfulldetail && this.props.listfulldetail.video_link ? this.props.listfulldetail.video_link.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/) : '';
            this.setState({
                ownername: this.props.listfulldetail && this.props.listfulldetail.owner_name,
                email: this.props.listfulldetail && this.props.listfulldetail.email,
                phone: this.props.listfulldetail && this.props.listfulldetail.phone,
                website: this.props.listfulldetail && this.props.listfulldetail.website,
                facebooklink: this.props.listfulldetail && this.props.listfulldetail.facebooklink,
                twitterlink: this.props.listfulldetail && this.props.listfulldetail.twitterlink,
                googleplus: this.props.listfulldetail && this.props.listfulldetail.googleplus,
                linkedin: this.props.listfulldetail && this.props.listfulldetail.linkedin,
                videolink: this.props.listfulldetail && this.props.listfulldetail.video_link ? match && match[2].length === 11 ? match[2] : '' : ''


            })

        });

    }

    fetchlistshedule = (listid) => {
        this.props.dispatch(getListShedule({ listing_id: listid }))
    }


    fetchImage = (list_id) => {
        this.props.dispatch(getlistimage({ listing_id: list_id })).then(() => {
            this.setState({
                listimage: this.props.listallimage && this.props.listallimage
            })
        })
    }


    responsive = {
        // breakpoint from 0 up
        0: {
            items: 1
        },
        // breakpoint from 480 up
        480: {
            items: 2
        },
        // breakpoint from 768 up
        768: {
            items: 3
        }
    }

    openModal() {
        this.setState({ isOpen: true })
    }

    contentstate = {
        featureTitle: 'Amenties',
        videoTitle: 'Video',
        buttonText: 'Watch Video',
        mapTitle: 'Location',
        peopleViewtitle: 'People Also Viewed'
    }
    render() {


        var val = this.props.allreviewlist.length > 0 ? this.props.allreviewlist.reduce(function (previousValue, currentValue) {
            return {
                stars: Number(previousValue.stars) + Number(currentValue.stars),
            }
        }) : 0


        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'
            >
                { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo && this.state.metainfo}></MetaTag> : ''}


                <main className="listing-details">
                    {/* Header */}
                    <GeneralHeader />

                    {/* Breadcrumb */}
                    <> <section className="breadcrumb-area listing-detail-breadcrumb" style={{ backgroundImage: `url('${this.state.file}')` }}>
                        <div className="breadcrumb-wrap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 position-relative">
                                        <div className="breadcrumb-content">
                                            <h2 className="breadcrumb__title">
                                                {this.state.listName}
                                            </h2>
                                            <p className="breadcrumb__desc">
                                                <span className="la d-inline-block"><GiPositionMarker /></span> {this.state.address} , {this.state.city}, {this.state.state},  {this.state.country}
                                            </p>
                                            <ul className="listing-info mt-3 mb-3">
                                                <li>
                                                    <div className="theme-btn average-symble" data-toggle="tooltip" data-placement="top" title="Pricey">
                                                        <span className="average-active"></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="average-ratings">
                                                        <span className="theme-btn button-success mr-1">
                                                            <GiChickenOven />{this.state.categoryname}
                                                        </span>
                                                        <span className="theme-btn button-success mr-1">
                                                            {val && (val.stars / this.props.allreviewlist.length).toFixed(1)}<i className="d-inline-block"><MdStar /></i>
                                                        </span>

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="theme-btn listing-tag">
                                                        <i className="d-inline-block"><GiChickenOven /></i> {this.state.tags}
                                                    </span>
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="report-list-items">
                                            <ul className="listing-info">
                                                <li>
                                                    <a href="#review" className="theme-btn">
                                                        <i className="d-inline-block"><MdStarBorder /></i> write a review
                                                </a>
                                                </li>
                                                <li>
                                                    <Link to="#" className="theme-btn report-modal-btn">
                                                        <i className="d-inline-block"><AiOutlineFlag /></i> report
                                                </Link>
                                                </li>
                                                <li>
                                                    <button type="button" className="theme-btn" onClick={() => this.saveUserList(this.state.listingid)}>
                                                        <i className="d-inline-block"><RiBookmarkLine /></i> save
                                                </button>
                                                </li>

                                                <li>
                                                    <Dropdown className="dropdown share-dropmenu">
                                                        <Dropdown.Toggle className="theme-btn dropdown-toggle border-0 after-none" id="dropdown-basic">
                                                            <i className="d-inline-block"><RiExternalLinkLine /></i> share
                                                    </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu">

                                                            <Dropdown.Item className={'dropdown-item'}>
                                                                <i><WhatsappShareButton
                                                                    url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                    image={this.state.file}
                                                                    title={this.state.listName}
                                                                    separator=":: "

                                                                >
                                                                    <WhatsappIcon size={32} round />
                                                                </WhatsappShareButton></i>  {'Whatsapp'}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className={'dropdown-item'}>
                                                                <i><FacebookShareButton
                                                                    url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                    title={this.state.listName}
                                                                    image={this.state.file}
                                                                    className="Demo__some-network__share-button"
                                                                >
                                                                    <FacebookIcon size={32} round />
                                                                </FacebookShareButton> </i>  {'Facebook'}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className={'dropdown-item'}>
                                                                <i> <TwitterShareButton
                                                                    url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                    title={this.state.listName}
                                                                    image={this.state.file}
                                                                    className="Demo__some-network__share-button"
                                                                >
                                                                    <TwitterIcon size={32} round />
                                                                </TwitterShareButton></i> {'Twitter'}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className={'dropdown-item'}>
                                                                <i>  <TelegramShareButton
                                                                    url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                    title={this.state.listName}
                                                                    image={this.state.file}
                                                                    className="Demo__some-network__share-button"
                                                                >
                                                                    <TelegramIcon size={32} round />
                                                                </TelegramShareButton></i>  {'Telegram'}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className={'dropdown-item'}>
                                                                <i> <EmailShareButton
                                                                    url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                    title={this.state.listName}
                                                                    body="body"
                                                                    className="Demo__some-network__share-button"
                                                                >
                                                                    <EmailIcon size={32} round />
                                                                </EmailShareButton></i>{'Email'}
                                                            </Dropdown.Item>



                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bread-svg">
                            <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                                <path d="M-4.22,89.30 C280.19,26.14 324.21,125.81 511.00,41.94 L500.00,150.00 L0.00,150.00 Z" />
                            </svg>
                        </div>
                    </section>

                        <div className="modal-form">
                            <div className="modal fade report-modal-box bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                                <div className="modal-bg"></div>
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-top">
                                            <button type="button" className="close close-arrow" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true" className="mb-0"><MdClose /></span>
                                            </button>
                                            <h4 className="modal-title"><span className="mb-0"><AiOutlineFlag /></span> Report this Listing</h4>
                                        </div>
                                        <div className="contact-form-action">
                                            <form method="post">
                                                <div className="msg-box">
                                                    <label className="label-text">Write Message</label>
                                                    <div className="form-group">
                                                        <i className="form-icon"><BsPencil /></i>
                                                        <textarea className="message-control form-control" value={this.state.reporttext} onChange={this.onChangeReport} name="message" placeholder="What's wrong with this listing?" required></textarea>
                                                    </div>
                                                </div>
                                                <div className="btn-box text-right">
                                                    <button type="button" onClick={() => this.onReport(this.state.listingid)} className="theme-btn button-success border-0"><i><RiSendPlane2Line /></i> Send message
                                            </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  video */}

                        {
                            this.state.videolink ? (<ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={this.state.videolink} onClose={() => this.setState({ isOpen: false })} />
                            ) : ''
                        }

                        <section className="single-listing-area padding-top-35px">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="single-listing-wrap">
                                            {this.state.listimage && this.state.listimage.length > 0 ?
                                                <div>
                                                    <h2 className="widget-title">
                                                        {'Gallery'}
                                                    </h2>
                                                    <div className="title-shape"></div>
                                                    <OwlCarousel
                                                        className="gallery-carousel padding-top-35px"
                                                        loop
                                                        margin={10}
                                                        autoplay={true}
                                                        nav={true}
                                                        navText={[this.state.previcon, this.state.nextIcon]}
                                                        dots={true}
                                                        smartSpeed={1000}
                                                        items={1}
                                                        dotsContainer={'#gallery-carousel'}
                                                    >
                                                        {this.state.listimage && this.state.listimage.map((img, i) => {
                                                            return (
                                                                <div key={i} className="gallery-item">
                                                                    <img src={`${process.env.REACT_APP_API_KEY}utilities/${img.imageurl}`} alt="list" width="400px" height="400px" />
                                                                </div>
                                                            )
                                                        })}
                                                    </OwlCarousel>
                                                </div> : ''}

                                            <div className="listing-description padding-top-40px padding-bottom-35px">
                                                <h2 className="widget-title">
                                                    {'Description'}
                                                </h2>
                                                <div className="title-shape"></div>
                                                <div className="section-heading mt-4">
                                                    <p className="sec__desc font-size-16">
                                                        {this.state.listbio}
                                                    </p>
                                                </div>
                                            </div>
                                            {this.props.listamenties && this.props.listamenties.length > 0 ?
                                                <div className="feature-listing padding-bottom-20px">
                                                    <h2 className="widget-title">
                                                        {this.contentstate.featureTitle}
                                                    </h2>
                                                    <div className="title-shape"></div>
                                                    <ul className="list-items mt-4">
                                                        {this.props.listamenties.length === 0 ?
                                                            (<li>
                                                                <i className="color-text font-size-18"><BsCheckCircle /></i> there is no amenties
                                                            </li>)
                                                            : this.props.listamenties.map(item => {
                                                                return (

                                                                    <li key={item.id}>
                                                                        <i className="color-text font-size-18"><BsCheckCircle /></i> {item.amenties_name}
                                                                    </li>

                                                                )
                                                            })}
                                                    </ul>

                                                </div> : ''}

                                            {this.state.videolink ? (
                                                <div className="video-listing padding-bottom-40px">
                                                    <h2 className="widget-title">
                                                        {this.contentstate.videoTitle}
                                                    </h2>
                                                    <div className="title-shape"></div>
                                                    <div className="video__box margin-top-35px text-center">
                                                        {this.state.listImg}
                                                        <div className="video__box-content">
                                                            <Link className="mfp-iframe video-popup-btn video-play-btn"
                                                                to="#"
                                                                onClick={this.openModal}
                                                                title="Play Video">
                                                                <span className="d-inline-block">
                                                                    <AiOutlinePlayCircle />
                                                                </span>
                                                            </Link>
                                                            <p className="video__desc">
                                                                {this.contentstate.buttonText}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : ''}



                                            {
                                                this.state.latitude > 0 ? (
                                                    <> <div className="listing-map gmaps">
                                                        <h2 className="widget-title">
                                                            {this.contentstate.mapTitle}
                                                        </h2>
                                                        <div className="title-shape margin-bottom-35px"></div>

                                                        {/* <GeneralMap lang={this.state.lagnitude} lat={this.state.latitude} /> */}

                                                        <Map
                                                            google={this.props.google}
                                                            center={{ lat: parseFloat(this.state.latitude), lng: parseFloat(this.state.lagnitude) }}
                                                            height='600px'
                                                            zoom={19}
                                                        />
                                                    </div>

                                                    </>

                                                ) : ''
                                            }
                                            {/* other info */}

                                            {
                                                this.state.listother.length && this.state.listother.length > 0 ? this.state.listother.map((item, i) => {
                                                    return (<div className="listing-description padding-top-20px padding-bottom-15px">
                                                        <h2 className="widget-title">
                                                            <span>   {item.title}</span>
                                                        </h2>
                                                        {
                                                            item.title ? <div className="title-shape"></div> : ''
                                                        }


                                                        { JSON.parse(item.text).map((x, i) => {
                                                            return (<div className="section-heading mt-2">
                                                                <span className="mr-2" style={{ color: 'black' }}><strong>{JSON.parse(item.text).length > 1 ? i + 1 : ''}</strong> </span>
                                                                <span className="sec__desc font-size-16">
                                                                    {x.description}    </span>
                                                            </div>
                                                            );
                                                        })}</div>)
                                                }) : ''

                                            }



                                            {/* contact info*/}
                                            <div className="contact-listing padding-top-40px padding-bottom-40px">
                                                <h2 className="widget-title">
                                                    Contact Information
                                             </h2>
                                                <div className="title-shape"></div>
                                                <div className="info-list margin-top-35px padding-bottom-35px">
                                                    <ul>
                                                        {this.state.address ? (
                                                            <li className="mb-2"><span><i className="la d-inline-block"><GiPositionMarker /></i> Address:</span>
                                                                {this.state.address}
                                                            </li>
                                                        ) : ''}
                                                        {this.state.email ? (
                                                            <li className="mb-2"><span><i className="la d-inline-block"><FaRegEnvelope /></i> Email:</span>
                                                                <a href={'mailto:' + this.state.email}>{this.state.email}</a>
                                                            </li>
                                                        ) : ''}

                                                        <li className="mb-2"><span><i className="la d-inline-block"><FiPhone /></i> Phone:</span>
                                                            {'9999999'}
                                                        </li>

                                                        {this.state.website ? (
                                                            <li><span><i className="la d-inline-block"><FiExternalLink /></i> Website:</span>
                                                                <a target="blanc_" href={this.state.websiteUrl}>{this.state.website}</a>
                                                            </li>
                                                        ) : ''}
                                                    </ul>
                                                </div>

                                                <div className="section-block"></div>
                                                <div className="social-contact padding-top-40px">
                                                    {
                                                        this.state.facebooklink ? (<a target='blanc_' href={this.state.facebooklink} className={'theme-btn facebook-link'}>
                                                            <i className="d-inline-block"><FaFacebookF /></i> Facebook
                                                        </a>) : ''

                                                    }

                                                    {
                                                        this.state.twitterlink ? (<a target='blanc_' href={this.state.twitterlink} className={'theme-btn twitter-link'}>
                                                            <i className="d-inline-block"><FaTwitter /></i> Twitter
                                                        </a>) : ''

                                                    }

                                                    {
                                                        this.state.linkedin ? (<a target='blanc_' href={this.state.linkedin} className={'theme-btn instagram-link'}>
                                                            <i className="d-inline-block">
                                                                <FaLinkedinIn />
                                                            </i> Linked In
                                                        </a>) : ''
                                                    }

                                                    {
                                                        this.state.videolink ? (<a target='blanc_' href={this.state.videolink} className={'theme-btn youtube-link'}>
                                                            <i className="d-inline-block"><FaYoutube /></i> Youtube
                                                        </a>) : ''

                                                    }
                                                </div>
                                            </div>
                                            {/* contact info*/}


                                            <div className="comments-wrap">

                                                <ListingDetailsComments listid={this.state.listingid} />
                                            </div>



                                        </div>
                                    </div>
                                    <div className="col-lg-4">

                                        <div className="author-verified-badge margin-bottom-20px">
                                            <div className="author__verified-badge" data-toggle="tooltip" data-placement="top" title="Listing has been verified and belongs the business owner or manager">
                                                <span className="d-inline-block">{this.state.verifiedtxt}</span> {this.state.btnText}
                                            </div>
                                        </div>
                                        <div className="sidebar section-bg">
                                            <div className="sidebar-widget">
                                                <div className="author-bio margin-bottom-30px">
                                                    <div className="d-flex align-items-center">
                                                        <img src={this.state.authorImg} alt="author" />
                                                        <div className="author-inner-bio">
                                                            <h4 className="author__title font-weight-bold pb-0 mb-1">
                                                                {this.state.ownername}
                                                            </h4>

                                                            <p className="author__meta">
                                                                Posted on {moment(Number(this.state.createddate)).fromNow()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="section-block-2 margin-top-35px margin-bottom-35px"></div>

                                                <div className="info-list">
                                                    <ul>
                                                        <li className="mb-2">
                                                            <i className="la"><FiUser /></i><b>Owner name: </b>  {this.state.ownername}
                                                        </li>
                                                        <li className="mb-2">
                                                            <i className="la"><GiPositionMarker /></i><b>Address: </b>  {this.state.address}
                                                        </li>
                                                        <li className="mb-2">
                                                            <i className="la"><FaRegEnvelope /></i> <a href={'mailto:' + this.state.email}>
                                                                {this.state.email}
                                                            </a>
                                                        </li>
                                                        <li className="mb-2">
                                                            <i className="la"><FiPhone /></i> {this.state.phone}
                                                        </li>
                                                        <li className="mb-2">
                                                            <i className="la"><FiExternalLink /></i> <a href={this.state.websiteUrl}>{this.state.website}</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="section-block-2 margin-top-35px margin-bottom-35px"></div>
                                                <ul className="social-profile margin-bottom-35px text-center">


                                                    <li>
                                                        <a target='blanc_' href={this.state.facebooklink}>
                                                            <i className="d-inline-block">
                                                                <FaFacebookF />
                                                            </i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a target='blanc_' href={this.state.twitterlink}>
                                                            <i className="d-inline-block">
                                                                <FaTwitter />
                                                            </i>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a target='blanc_' href={this.state.linkedin}>
                                                            <i className="d-inline-block">
                                                                <FaLinkedinIn />
                                                            </i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a target='blanc_' href={this.state.googleplus}>
                                                            <i className="d-inline-block">
                                                                <FaGooglePlusG />
                                                            </i>
                                                        </a>
                                                    </li>

                                                </ul>



                                                <WidgetOpenHours />
                                                <WidgetSimilarListing subcatid={this.state.subcatid && this.state.subcatid} categoryid={this.state.categoryid && this.state.categoryid} country={this.state.country && this.state.country} city={this.state.city && this.state.city} state={this.state.state && this.state.state} />


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* people also viewed list */}

                        <section className="card-area padding-top-80px padding-bottom-100px">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-heading">
                                            <h2 className="widget-title">
                                                {this.contentstate.peopleViewtitle}
                                            </h2>
                                            <div className="title-shape"></div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-lg-12">

                                        <OwlCarousel
                                            className="card-carousel mt-5"
                                            loop={false}
                                            center={false}
                                            margin={10}
                                            autoplay={true}
                                            nav={true}
                                            navText={[
                                                "<i class='icon icon-left'></i>",
                                                "<i class='icon icon-right'></i>"
                                            ]}
                                            rewind={true}
                                            items={3}
                                            smartSpeed={10000}

                                            responsive={this.responsive}
                                        >
                                            {this.props.viewedlists && this.props.viewedlists.map((item, index) => {
                                                return (
                                                    <div className="card-item" key={index}>
                                                        <Link to={`/listing-details/${item.listing.canonicalurl}`} className="card-image-wrap">
                                                            <div className="card-image">
                                                                <img src={item.listing.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.bannerimg}` : this.state.listimage} className="card__img" alt={item.listing.list_title} width="200px" height="200px" />
                                                                <span className='badge'>{this.state.bedge}</span>
                                                                <span className="badge-toggle" data-toggle="tooltip" data-placement="bottom" title={item.listing.likes}>
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
                                                                    <img src={item.listing.profileimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.profileimg}` : this.state.authorImg} alt="author-img" />
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
                                                                <div className="listing-info">
                                                                    <ul>

                                                                        <li><span> <ReactStars
                                                                            count={5}
                                                                            size={24}
                                                                            value={item.rating[0].rating ? parseFloat(item.rating[0].rating).toFixed(1) : 0}
                                                                            isHalf={true} /> </span> </li>
                                                                        <li> <span className="info__count"> {parseFloat(item.rating[0].rating).toFixed(1)}</span></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="listing-info">
                                                                    <ul>
                                                                        <li><span className="info__count"><AiOutlineEye /></span> {item.listing.view}</li>

                                                                        <li>
                                                                            <span className="info__count">   <FiHeart /></span> {item.listing.likes}
                                                                        </li>

                                                                    </ul>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })}


                                        </OwlCarousel>

                                    </div>
                                </div>
                            </div>
                        </section></>


                    {/* Newsletter */}
                    <NewsLetter />

                    {/* Footer */}
                    <Footer />

                    <ScrollTopBtn />
                </main>
            </LoadingOverlay>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { listdetail, listamenties, listother, viewedlists, similarlists, listallimage, allreviewlist, listfulldetail } = state.list;
    return {
        isLoggedIn, userdetails, listdetail, listother, listallimage, viewedlists, allreviewlist, listamenties, listfulldetail, similarlists

    };
}
export default connect(mapStateToProps)(ListingDetails);