import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from "react-router-dom";
import { BsListCheck, BsBookmark, BsCheckCircle, BsExclamationCircle, BsFillChatSquareQuoteFill, BsFillBellFill,BsFileCode } from 'react-icons/bs'
import { FaRegCalendarCheck, FaRegEdit, FaRegEnvelope, FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineUser, AiOutlinePlusCircle, AiOutlinePoweroff, AiOutlineExclamationCircle, AiFillQuestionCircle } from 'react-icons/ai'
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { connect } from "react-redux";
import { addImageprofile, userUpdate, userVerify } from '../../services/action/auth';
import { getmylist, getusersavedlist, userUnsaveList } from '../../services/action/list';
import { userdetails } from '../../services/action/user';
import { Badge } from 'react-bootstrap';
import { getNotification, removeNotification } from '../../services/action/common';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import moment from 'moment';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { FiMap } from 'react-icons/fi';

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
        this.state = {
            file: require('../../assets/images/team2.jpg'),
            listimg: require('../../assets/images/img24.jpg'),
            imgCollection: '',
            breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
            savedlist: [],
            userlist: [],
            userImg: require('../../assets/images/team2.jpg'),
            userName: '',
            userbio: '',
            address: '',
            zipcode: '',
            phoneNum: '',
            website: '',
            email: "",
            firstname: "",
            lastname: "",
            active: false,
            show: false,
            userid: null,
            emailVerified: false,
            country: '',
            region: '',
            countryPriorities: ['IN', "US", "CA", "GB", "AU", "NO", "NL", "FR", "CH", "AE", "SG", "KW", "SA", "QA", "MY", "LK"],


        }
    }

    componentDidMount() {
        this.userd()


    }


    onChangeAddress(e) {
        this.setState({
            address: e.target.value,
        });

    }

    onChangeCity(e) {

         this.setState({
                place: e.target.value.toLocaleLowerCase()
            });
        
    }

    onChangeZipcode(e) {
    
            this.setState({
                zipcode: e.target.value
            });
        }
    

    toggle = () => {
        this.setState({ show: !this.state.show })

    }

    userd = () => {
        let obj = { "userName": this.props.userdetails.userName }

        this.props.dispatch(userdetails(obj)).then(() => {
            this.getusersavedlist(this.props.udetails[0].id)
            this.getuserlist(this.props.udetails[0].id)
            this.props.dispatch(getNotification({ notify_to: this.props.udetails[0].id }))
            localStorage.setItem("user", JSON.stringify(this.props.udetails[0]));
            this.setState({
                userdetail: this.props.udetails[0],
                userid: this.props.udetails[0].id,
                userName: this.props.udetails[0].userName,
                email: this.props.udetails[0].emailId,
                firstname: this.props.udetails[0].firstName,
                lastname: this.props.udetails[0].lastName,
                address:this.props.udetails[0].address,
                country:this.props.udetails[0].country,
                region:this.props.udetails[0].state,
                place:this.props.udetails[0].city,
                zipcode:this.props.udetails[0].zipcode,
                active: this.props.udetails[0].active,
                emailVerified: this.props.udetails[0].emailVerified,
                file: this.props.udetails[0].profileimg ? `${process.env.REACT_APP_API_KEY}utilities/${this.props.udetails[0].profileimg}` : require('../../assets/images/team2.jpg')
            })
        })

    }

    getusersavedlist = (userid) => {
        this.props.dispatch((getusersavedlist(userid))).then(() => {
            this.setState({
                savedlist: this.props.usersavedlist
            })
        })
    }




    getuserlist = (userid) => {
        this.props.dispatch((getmylist(userid))).then(() => {
            this.setState({
                userlist: this.props.alluserlist
            })
        })

    }



    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value,
        });

    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value,
        });

    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({
            loading: true,
        });
        const obj = {
            id: this.state.userid,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            address: this.state.address,
            country: this.state.country,
            state: this.state.region,
            city: this.state.place,
            zipcode: this.state.zipcode,
            updatedDate: new Date().getTime().toString()
        }


        this.props.dispatch(userUpdate(obj)).then(() => {
            this.setState({
                loading: false,
            });
            this.userd()


        })

    }

    closeNotification(id) {
        const obj = {
            notify_id: id
        }
        this.props.dispatch(removeNotification(obj)).then(() => {
            this.props.dispatch(getNotification({ notify_to: this.props.udetails[0].id }))
        });

    }


    uploadSingleFile(e) {
        this.setState({
            imgCollection: e.target.files,
            file: URL.createObjectURL(e.target.files[0])

        })
    }

    upload(e) {
        e.preventDefault()
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('image', this.state.imgCollection[key])

        }
        this.props.dispatch(addImageprofile(formData, this.props.userdetails.id)).then(() => {
            this.userd()
        });
        this.setState({ show: false })
    }

    sendVerify = () => {
        this.props.dispatch(userVerify({ emailid: this.state.email }))

    }

    Unsave = (listid) => {
        const obj = {
            listing_id: listid,
            saved_by: this.props.userdetails.id
        }
        this.props.dispatch(userUnsaveList(obj)).then(() => {
            this.getusersavedlist(this.state.userdetail.id)
        })



    }

    render() {
        const { country, region } = this.state;

        return (
            <main className="dashboard-page">
                {/* Header */}
                <GeneralHeader />

                {/* Breadcrumb */}
                <Breadcrumb CurrentPgTitle="Dashboard" MenuPgTitle="pages" img={this.state.breadcrumbimg} />

                <section className="dashboard-area padding-top-40px padding-bottom-90px">
                    <div className="container">
                        <Tabs>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="dashboard-nav d-flex justify-content-between align-items-center mb-4">
                                        <TabList className="nav nav-tabs border-0" id="nav-tab">
                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"> <BsFillChatSquareQuoteFill className="user-icon" /></span> Notification {this.props.notifications && this.props.notifications.length}
                                                </Link>
                                            </Tab>
                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"><AiOutlineUser /></span> Profile
                                                </Link>
                                            </Tab>
                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"><BsListCheck /></span> Listings
                                                </Link>
                                            </Tab>

                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"><BsBookmark /></span> Bookmark List
                                                </Link>
                                            </Tab>

                                        </TabList>
                                        <div className="btn-box">
                                            <Link to={`/forum/user/${this.state.userName}`} className="theme-btn ml-1"><span className="la"><AiOutlinePoweroff /></span>My Forum</Link>

                                            <Link to="/add-listing" className="theme-btn"><span className="la"><AiOutlinePlusCircle /></span> create listing</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="tab-content" id="nav-tabContent">
                                        <TabPanel>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="billing-form-item mb-0">
                                                        <div className="billing-content">
                                                            <div className="card shadow mb-4">
                                                                <div className="card-header py-3">
                                                                    <h6 className="m-0 font-weight-bold text-green">notification</h6>
                                                                </div>
                                                                <div className="card-body">

                                                                    {this.props.notifications && this.props.notifications.length === 0 ? <div className="toast-header"><i className="fas fa-fw fa-bell"></i> <div className="toast-body">
                                                                        there are no notification
                                                                       </div></div> : this.props.notifications && this.props.notifications.map((notification, i) => {
                                                                        return (<div className="card shadow " key={`notification_${notification.notify_id}`}>
                                                                            <div className="toast-header">
                                                                                <Badge>{i + 1}</Badge>
                                                                                <BsFillBellFill />
                                                                                <strong className="mr-auto">{notification.type}</strong>
                                                                                <small>{new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</small>
                                                                                <button type="button"
                                                                                    className="ml-2 mb-1 close"
                                                                                    data-dismiss="toast"
                                                                                    aria-label="Close"
                                                                                    onClick={() => this.closeNotification(notification.notify_id)}>
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="toast-body">
                                                                                {notification.message}
                                                                            </div>
                                                                        </div>)
                                                                    })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="user-profile-action">
                                                        <div className="user-details">
                                                            <h2 className="user__name widget-title pb-2" >
                                                                welcome !{this.state.userName}
                                                            </h2>
                                                        </div>
                                                        <div className="user-edit-form mt-4">
                                                            <div className="author-verified-badge margin-bottom-20px">
                                                                <div className="author__verified-badge" data-toggle="tooltip" data-placement="top" title="Listing has been verified and belongs the business owner or manager">
                                                                    {this.state.active ? <><span className="d-inline-block"> <BsCheckCircle /></span>verified</> : <><span className="d-inline-block"> <BsExclamationCircle /></span>Not verified</>}
                                                                </div>
                                                                <p>    {this.state.active ? <b>Your profile is verified</b> : <b>Your profile is banned due some reason contact us to activate your id</b>} </p>
                                                            </div>
                                                        </div>
                                                        <div className="user-pro-img mb-4">
                                                            <img src={this.state.file} alt='default-list-profile' />
                                                            <button className="theme-btn border-0 w-100 button-success" type="button" onClick={this.toggle} value="submit">
                                                                change your pic
                                                            </button>

                                                        </div>

                                                        {this.state.show ? <div className="mb-5" >
                                                            <div className="upload-btn-box">
                                                                <form>
                                                                    <input type="file" className="form-control" name="files[]" id="filer_input" onChange={this.uploadSingleFile} />
                                                                    <button className="theme-btn border-0 w-100 button-success" type="button" onClick={this.upload} value="submit">
                                                                        Save changes
                                                                            </button>
                                                                </form>
                                                            </div>

                                                        </div> : ''}



                                                    </div>
                                                </div>
                                                <div className="col-lg-8">


                                                    <div className="billing-form-item mb-0">

                                                        <div className="billing-content">
                                                            <div className="contact-form-action">
                                                                <form method="post" onSubmit={this.handleRegister}>
                                                                    <div className="row">

                                                                        <div className="col-lg-12">
                                                                            <div className="input-box">
                                                                                <label className="label-text">First name</label>
                                                                                <div className="form-group">
                                                                                    <span className="form-icon">
                                                                                        <AiOutlineUser />
                                                                                    </span>
                                                                                    <input className="form-control" type="text" placeholder="First name" name="firstname" value={this.state.firstname} onChange={this.onChangeFirstname} required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <div className="input-box">
                                                                                <label className="label-text">Last name</label>
                                                                                <div className="form-group">
                                                                                    <span className="form-icon">
                                                                                        <AiOutlineUser />
                                                                                    </span>
                                                                                    <input className="form-control" type="text" name="lastname" value={this.state.lastname} onChange={this.onChangeLastname} required="required" placeholder="Last name" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-12">
                                                                            <div className="input-box">
                                                                                <label className="label-text">Email</label>
                                                                                <div className="form-group">
                                                                                    <span className="form-icon">
                                                                                        <FaRegEnvelope />
                                                                                    </span>
                                                                                    <input className="form-control" type="email" required="required" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Enter email" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="billing-form-item">
                                                    <div className="billing-title-wrap">
                                                        <h3 className="widget-title pb-0">
                                                            Add Location
                                                       </h3>
                                                        <div className="title-shape margin-top-10px"></div>
                                                    </div>
                                                    <div className="billing-content">
                                                        <div className="contact-form-action">

                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="input-box">
                                                                        <label className="label-text">Address</label>
                                                                        <div className="form-group">
                                                                            <span className="la form-icon">
                                                                                <FiMap />
                                                                            </span>
                                                                            <input className="form-control" value={this.state.address} onChange={this.onChangeAddress} type="text" name="address" required="required" placeholder="full address" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <label className="label-text">Country</label>
                                                                    <div className="form-group">
                                                                        <CountryDropdown
                                                                            priorityOptions={this.state.countryPriorities}
                                                                            value={country}
                                                                            onChange={(val) => this.selectCountry(val)} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="input-box">
                                                                        <label className="label-text">State</label>
                                                                        <div className="form-group">
                                                                            <RegionDropdown
                                                                                country={country}
                                                                                value={region}
                                                                                onChange={(val) => this.selectRegion(val)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="input-box">
                                                                        <label className="label-text">City or (place name)</label>
                                                                        <div className="form-group">
                                                                            <span className="la form-icon">
                                                                                <BsFileCode />
                                                                            </span>
                                                                            <input className="form-control" type="text" value={this.state.place} onChange={this.onChangeCity} name="place" required="required" placeholder="(city or place name)" />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="col-lg-6">
                                                                    <div className="input-box">
                                                                        <label className="label-text">
                                                                            Zip-Code
                                                                       </label>
                                                                        <div className="form-group">
                                                                            <span className="la form-icon">
                                                                                <BsFileCode />
                                                                            </span>
                                                                            <input className="form-control" value={this.state.zipcode} onChange={this.onChangeZipcode} type="text" name="zipcode" required="required" placeholder="Zip-Code" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>



                                                                        <div className="col-lg-12">
                                                                            <div className="btn-box margin-top-20px margin-bottom-20px">
                                                                                <button className="theme-btn border-0" type="submit" disabled={this.state.loading}>
                                                                                    {this.state.loading && (
                                                                                        <span className="spinner-border spinner-border-sm"></span>
                                                                                    )} update account
                                                                           </button>
                                                                                <button className="theme-btn ml-3 button-success" type="button" onClick={this.sendVerify} value="Send verification Link">
                                                                                    Send verification Link
                                                                           </button>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    {this.state.alert}
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="row">

                                                {this.state.userlist.length === 0 ? (<div className="text-center"><h5>there is no list created by you</h5></div>)
                                                    : this.state.userlist.map((item, i) => {
                                                        return (
                                                            <div key={i} className="col-lg-4 column-td-6">
                                                                <div className="card-item">
                                                                    <Link to={`/listing-details/${item.listing.approved ? item.listing.canonicalurl : item.listing.canonicalurl + '/edit'}`} className="card-image-wrap">
                                                                        <div className="card-image">
                                                                            <img src={item.listing.bannerimg ? `${process.env.REACT_APP_API_KEY}utilities/${item.listing.bannerimg}` : this.state.listimg} className="card__img" alt="Card" width="200px" height="200px" />
                                                                        </div>
                                                                    </Link>
                                                                    <div className="card-content-wrap">
                                                                        <div className="card-content">
                                                                            <Link to={`/listing-details/${item.listing.approved ? item.listing.canonicalurl : item.listing.canonicalurl + '/edit'}`}>
                                                                                <h4 className="card-title">{item.listing.list_title}
                                                                                    {item.listing.approved === 1 ? <i><IoIosCheckmarkCircle /></i> : <i><AiFillQuestionCircle /><Link to={`/listing-details/${item.listing.canonicalurl}/edit`}>not verified</Link></i>}
                                                                                </h4>
                                                                                <p className="card-sub">{item.listing.address}</p>
                                                                            </Link>
                                                                        </div>
                                                                        <ul className="info-list padding-top-5px">
                                                                            
                                                                            <li>
                                                                                <span className="la d-inline-block"><FaRegCalendarCheck /></span>Created {moment(Number(item.listing.creating_time)).fromNow()}
                                                                            </li>
                                                                        </ul>
                                                                        <div className="rating-row">
                                                                            <div className="edit-info-box">
                                                                                <button type="button" className="theme-btn button-success border-0 mr-1">
                                                                                    <Link to={`/listing-details/${item.listing.canonicalurl}/edit`}><span className="la"><FaRegEdit /></span> Edit</Link>
                                                                                </button>
                                                                                <button type="button" className="theme-btn delete-btn border-0" data-toggle="modal" data-target=".product-delete-modal">
                                                                                    <span className="la"><FaRegTrashAlt /></span> Delete
                                                                            </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="row">

                                                {this.state.savedlist.length === 0 ? (<div className="card-item center"><h5>there is no list saved by you</h5></div>)
                                                    : this.state.savedlist.map((item, i) => {
                                                        return (
                                                            <div key={i} className="col-lg-4 column-td-6">
                                                                <div className="card-item">
                                                                    <Link to={`/listing-details/${item.canonicalurl}`} className="card-image-wrap">
                                                                        <div className="card-image">
                                                                            <img src={`${process.env.REACT_APP_API_KEY}utilities/${item.bannerimg}`} className="card__img" alt="Card" />
                                                                        </div>
                                                                    </Link>
                                                                    <div className="card-content-wrap">
                                                                        <div className="card-content">
                                                                            <Link to={`/listing-details/${item.canonicalurl}`}>
                                                                                <h4 className="card-title mt-0">{item.list_title}</h4>
                                                                                <p className="card-sub">{item.address}</p>
                                                                            </Link>
                                                                        </div>
                                                                        <ul className="info-list padding-top-5px">
                                                                            
                                                                            <li>
                                                                                <span className="la d-inline-block"><FaRegCalendarCheck /></span>Saved {moment(Number(item.save_time)).fromNow()}
                                                                            </li>
                                                                        </ul>
                                                                        <div className="rating-row">
                                                                            <div className="edit-info-box">

                                                                                <button type="button" className="theme-btn  border-0" onClick={() => this.Unsave(item.listing_id)}>
                                                                                    <span className="la"><FaRegTrashAlt /></span> Remove
                                                                            </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </section>

                {/* Newsletter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />


                {/* Modal */}
                <div className="modal-form text-center">
                    <div className="modal fade account-delete-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                        <div className="modal-bg"></div>
                        <div className="modal-dialog modal-sm" role="document">
                            <div className="modal-content p-4">
                                <div className="modal-top border-0 mb-4 p-0">
                                    <div className="alert-content">
                                        <span className="la warning-icon"><AiOutlineExclamationCircle /></span>
                                        <h4 className="modal-title mt-2 mb-1">Your account will be deleted permanently!</h4>
                                        <p className="modal-sub">Are you sure to proceed.</p>
                                    </div>
                                </div>
                                <div className="btn-box">
                                    <button type="button" className="theme-btn border-0 button-success mr-1" data-dismiss="modal">
                                        Cancel
                                    </button>
                                    <button type="button" className="theme-btn border-0 button-danger">
                                        delete!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </main>


        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { alluserlist, usersavedlist } = state.list;
    const { notifications } = state.notification;
    const { udetails } = state.user;
    return {
        isLoggedIn, userdetails, usersavedlist, alluserlist, udetails, notifications

    };
}
export default connect(mapStateToProps)(Dashboard);