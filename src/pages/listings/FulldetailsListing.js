import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, withRouter } from "react-router-dom";
import {  BsBookmark, } from 'react-icons/bs'
import { AiOutlineUser, AiFillDelete } from 'react-icons/ai'
import $ from 'jquery'
import AddFullDetails from '../../components/addlisting/AddFullDetails';
import PhotoUploader from '../../components/addlisting/PhotoUploader';
import OpeningHours from '../../components/addlisting/OpeningHours';
import Amenities from '../../components/addlisting/Amenities';
import { addImageList, addImageListprofile,  getlistimage, removeImageList } from '../../services/action/list';
import { connect } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';

class FullDetailListing extends Component {
    constructor(props) {
        super(props)
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
        this.state = {
            breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
            listImg: '',
            listName: '',
            listbio: '',
            address: '',
            country: '',
            website: '',
            listingid: null,
            verifiedtxt: " n",
            reason: '',
            listimage: [],
            imgCollection: '',
            file: require('../../assets/images/g-img1.jpg'),
            show: false,
            uniqid: '',
            tabIndex: 0,
            ishide: true,
            loading:false
        }
    }

    componentDidMount() {


        $(document).on('click', '.delete-account-info .delete-account, .card-item .card-content-wrap .delete-btn', function (e) {
            $('body').addClass('modal-open').css({ paddingRight: '17px' });
            $(".account-delete-modal").addClass('show')
            e.preventDefault();
        })
        $(document).on('click', '.account-delete-modal .modal-bg, .account-delete-modal .modal-dialog .btn-box .theme-btn', function (e) {
            $('body').removeClass('modal-open').css({ paddingRight: '0' });
            $(".account-delete-modal").removeClass('show')
            e.preventDefault();
        })
        $(document).on('click', '.user-edit-form .edit-form-btn, .user-edit-form .btn-box .theme-btn', function (e) {
            $(".user-edit-form .dropdown-menu, .user-edit-form .dropdown").toggleClass('show');
            $(".user-edit-form .dropdown-menu").css({ position: 'absolute', transform: 'translate3d(0px, -733px, 0px)', top: '0', left: '0', willChange: 'transform' })
            e.preventDefault();
        });

    }

    uploadSingleFile(e) {
        this.setState({
            imgCollection: e.target.files,
            listImg: <img src={URL.createObjectURL(e.target.files[0])} alt='default-list-profile' />

        })
    }

    toggle = () => {
        this.setState({ show: !this.state.show })

    }

    upload(e) {
        e.preventDefault()
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('image', this.state.imgCollection[key])

        }
        this.props.dispatch(addImageListprofile(formData, this.props.steplist.listid));
    }




    fetchImage = (list_id) => {
       
        this.props.dispatch(getlistimage({ listing_id: list_id })).then(() => {
            this.setState({
                listimage: this.props.listallimage && this.props.listallimage,loading:false
            })
        })
    }

    addimageinlist = (formdata) => {
        this.setState({ loading:true})
        this.props.dispatch(addImageList(formdata, this.props.steplist.listid)).then(() => {
            this.fetchImage(this.props.steplist.listid);
        });

    }

    removeImage = (imgid, imagepath) => {
        this.props.dispatch(removeImageList({ id: imgid, image: imagepath })).then(() => {
            this.fetchImage(this.props.steplist.listid);
        });

    }

    setTabIndex() {

      
        this.setState({
            tabIndex: this.state.tabIndex + 1
        })
    }


    render() {
         console.log(this.state.tabIndex )

        return (

            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'
            >
                <section className="dashboard-area padding-top-40px padding-bottom-90px">
                      <div className="container">
                        <Tabs selectedIndex={this.state.tabIndex}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <b>please Fill the Full detail about your Listing to verify it</b>
                                    <div className="dashboard-nav d-flex justify-content-between align-items-center mb-4">
                                        <TabList className="nav nav-tabs border-0" id="nav-tab">

                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"><BsBookmark /></span> Add Full Details *
                                                </Link>
                                            </Tab>
                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"><BsBookmark /></span> Add shedule *
                                                </Link>
                                            </Tab>
                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"><AiOutlineUser /></span> Add Amenties
                                                </Link>
                                            </Tab>
                                            <Tab>
                                                <Link className="nav-item nav-link theme-btn pt-0 pb-0 mr-1" to="#">
                                                    <span className="la"><BsBookmark /></span> Add Images
                                                </Link>
                                            </Tab>

                                          

                                        </TabList>

                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="tab-content" id="nav-tabContent">
                                        <TabPanel>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="user-profile-action">
                                                        <div className="user-pro-img mb-4">
                                                            {this.state.listImg}
                                                            <button className="theme-btn border-0 w-100 button-success" type="button" onClick={this.toggle} value="submit">
                                                                set list profile image
                                                            </button>
                                                            {
                                                                <div className="mb-5" >
                                                                    <div className="upload-btn-box">
                                                                        <form>
                                                                            <input type="file" className="form-control" name="files[]" id="filer_input" onChange={this.uploadSingleFile} />
                                                                           <b>please press save changes to save
                                                                        </b>
                                                                            <button className="theme-btn border-0 w-100 button-success" type="button" onClick={this.upload} value="submit">
                                                                                Save changes
                                                                            </button>
                                                                        </form>
                                                                    </div>

                                                                </div>}


                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-lg-8">
                                                    <AddFullDetails listid={this.props.steplist.listid} />
                                                    <div className="form-group float-right mt-5">
                                                    <div className="btn-box">
                                                        <button type="button" onClick={() => this.setTabIndex()} className="theme-btn border-0">
                                                            Next
                                                        </button>
                                                    </div>
                                            </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <OpeningHours listid={this.props.steplist.listid} />
                                            <div className="form-group float-right mt-5">
                                                    <div className="btn-box float-left ml-5" >
                                                        <button type="button" onClick={() => this.props.closee()} className="theme-btn border-0">
                                                            close
                                                        </button>
                                                    </div>
                                                    <div className="btn-box float-right ml-5">
                                                        <button type="button" onClick={() => this.setTabIndex()} className="theme-btn border-0">
                                                            Next
                                                        </button>
                                                    </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <Amenities subcategoryid={this.props.steplist.subcat_id} listid={this.props.steplist.listid} />
                                            <div className="form-group float-right mt-5">
                                                    <div className="btn-box float-left ml-5" >
                                                        <button type="button" onClick={() => this.props.closee()} className="theme-btn border-0">
                                                            close
                                                        </button>
                                                    </div>
                                                    <div className="btn-box float-right ml-5">
                                                        <button type="button" onClick={() => this.setTabIndex()} className="theme-btn border-0">
                                                            Next
                                                        </button>
                                                    </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>

                                            <div className="row">


                                                {
                                                    this.state.listimage.length === 0 ? (

                                                        <div className="user-profile-action">
                                                            <div className="user-pro-img mb-2">
                                                                <b>there is no image added please add</b>
                                                            </div>
                                                        </div>
                                                    ) : this.state.listimage.map((img, id) => (
                                                        <div className="col-2" key={id}>
                                                            <div className="user-profile-action">
                                                                <div className="user-pro-img mb-2">
                                                                    <img src={`${process.env.REACT_APP_API_KEY}utilities/${img.imageurl}`} alt="list" />
                                                                    <div className="dropdown">
                                                                        <button
                                                                            className="theme-btn edit-btn dropdown-toggle border-0 after-none"
                                                                            type="button" id="editImageMenu"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false" onClick={() => this.removeImage(img.id, img.imageurl)}>
                                                                            <AiFillDelete />
                                                                        </button></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))

                                                }

                                            </div>

                                            <PhotoUploader listid={this.props.steplist.listid} addimage={this.addimageinlist} />
                                            <div className="form-group float-right mt-5">
                                                    <div className="btn-box float-left ml-5" >
                                                        <button type="button" onClick={() => this.props.closee()} className="theme-btn border-0">
                                                            close
                                                        </button>
                                                    </div>
                                                  
                                            </div>
                                        </TabPanel>

                                    


                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </section>
            </LoadingOverlay>

        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { steplist } = state.common;
    const { listdetail, listing, listallimage } = state.list;
    return {
        isLoggedIn, userdetails, listdetail, listallimage, listing, steplist

    };
}
export default withRouter(connect(mapStateToProps)(FullDetailListing));
