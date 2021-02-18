import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BsPencilSquare, BsQuestion, BsPencil, BsFileCode } from 'react-icons/bs'
import { AiOutlineTags } from 'react-icons/ai'
import Select from "react-select";
import { fetchCategory, fetchRules, getAllSubCategory, getDefaultMeta, getPageinfo } from '../../services/action/common';
import { Modal } from 'react-bootstrap';
import { FiMap } from 'react-icons/fi';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CreateListing } from '../../services/action/list';
import { withRouter } from 'react-router';
import FullDetailListing from '../listings/FulldetailsListing';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { FaPlus, FaMinus } from 'react-icons/fa'
import MetaTag from '../metainfo';

class AddListing extends Component {
    constructor(props) {
        super(props)
        this.handleListing = this.handleListing.bind(this);
        //this.onReset = this.onReset.bind(this);
        this.onChangeBusinessname = this.onChangeBusinessname.bind(this);
        this.onChangeKeywords = this.onChangeKeywords.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeSubcat = this.onChangeSubcat.bind(this);

        this.state = {
            title: '',
            businessname: '',
            description: '',
            keywords: '',
            address: '',
            selectedCatOp: null,
            breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
            catid: { label: 'select a service', value: null, id: '' },
            subcat: { label: 'select a subcategory', value: '', text: '' },
            category: [],
            subcategory: [],
            amenties: [],
            showModal: false,
            country: '',
            region: '',
            place: '',
            zipcode: '',
            ModelContent: '',
            loading: false,
            privacychecked: false,
            termschecked: false,
            msg: '',
            ischecked: false,
            rule: [],
            plus: <FaPlus />,
            minus: <FaMinus />,
            cardClass: 'mb-3',
            showFulldetail: false,
            countryPriorities: ['IN', "US", "CA", "GB", "AU", "NO", "NL", "FR", "CH", "AE", "SG", "KW", "SA", "QA", "MY", "LK"],

        }
    }

    onReset = () => {
        this.setState({
            country: '',
            region: '',
            place: '',
            zipcode: '',
            businessname: '',
            description: '',
            keywords: '',
            address: '',
            metainfo: null,
            defaultMetaTag: null,

        })
    }


    componentDidMount() {
        this.getpageseo({ page_type: 'listing' })
        this.props.dispatch(fetchCategory({ for: 'LISTING', status: true })).then(() => {
            this.setState({
                category: this.props.category
            })
        });

        this.props.dispatch(fetchRules({ com_id: 2 })).then(() => {
            this.setState({
                rule: this.props.rule
            })
        })
    }

    getpageseo = (obj) => {
        this.props.dispatch(getPageinfo(obj)).then(() => {
            if (this.props.pageinfo.length > 0) {
                this.setState({
                    metainfo: {
                        title: this.props.pageinfo[0].meta_title,
                        canonicalURL: `https://www.casualdesi.com/add-listing || ''}`,
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

            }
        })
    }


    handlePrivacyCheck = () => {
        this.setState({ privacychecked: !this.state.privacychecked });

    }

    /* handleTermsCheck = () => {
         this.setState({ termschecked: !this.state.termschecked });
 
     }*/

    onChangeSubcat = (subcat) => {
        this.setState({ subcat })

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


    onChangeBusinessname(e) {
        this.setState({
            businessname: e.target.value,
        });
    }

    onChangeKeywords(e) {
        this.setState({
            keywords: e.target.value,
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value,
        });

    }

    onChangeCity(e) {
        if (!this.state.country || !this.state.region) {
            alert("please  select country and region first")
            this.setState({ ischecked: true })
        } else {
            this.setState({
                place: e.target.value.toLocaleLowerCase(), ischecked: false
            });
        }
    }

    onChangeZipcode(e) {
        if (!this.state.country || !this.state.region) {
            alert("please  select country and region first")
            this.setState({ ischecked: true })
        } else {
            this.setState({
                zipcode: e.target.value, ischecked: false, msg: 'please check privacy policy and terms condition before submitting'
            });
        }
    }

    onChangeDescription(e) {
        if (!this.state.catid.value || !this.state.subcat.value) {
            alert("please  select category and services first")
            this.setState({ ischecked: true })
        } else {
            this.setState({
                description: e.target.value, ischecked: false
            });
        }
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }


    close = () => {
        this.setState({ showModal: false });
    }

    closetwo = () => {
        this.setState({ showFulldetail: !this.state.showFulldetail });
        this.props.history.push("/dashboard");
    }

    open = () => {
        this.setState({ showModal: true });
    }


    handleChangeCat = async (catid) => {
        this.setState({ catid });
        this.getsubcategory(catid.id);

    }

    handleListing(e) {
        e.preventDefault();

        if (!this.state.privacychecked) {
            alert("please  select category")
        }
        else {
            this.setState({
                loading: true,
            });

            const obj = {
                list_title: this.state.businessname,
                description: this.state.description,
                keywords: this.state.keywords,
                categoryid: this.state.catid.value,
                subcat_id: this.state.subcat.value,
                categoryname: this.state.subcat.label,
                address: this.state.address,
                country: this.state.country,
                state: this.state.region,
                city: this.state.place,
                zipcode: this.state.zipcode,
                canonicalurl: this.state.businessname.split(' ', 6).join(' ').toLowerCase().replace(/ /g, '_').replace(/[^\w-]+/g, ''),
                created_by: this.props.userdetails.id && this.props.userdetails.id,
                useremail: this.props.userdetails.emailId && this.props.userdetails.emailId,
                username: this.props.userdetails.userName && this.props.userdetails.userName


            }

            this.props.dispatch(CreateListing(obj)).then(() => {
                if (this.props.isCreated) {
                    this.setState({ loading: false, showFulldetail: true })
                    this.onReset();

                }
                this.setState({ loading: false })

            }, () => {
                this.setState({ loading: false })

            })
        }

    }

    render() {


        const { country, region, category, subcategory } = this.state;
        const categories = category && category.length > 0 ? category.map(cat => {
            return { value: `${cat.id}`, label: `${cat.name}`, id: `${cat.cat_id}` };
        }) : [{
            value: 0,
            label: 'no category feched'
        }];

        const subcategories = subcategory && subcategory.length > 0 ? subcategory.map(cat => {
            return { value: `${cat.subcat_id}`, label: `${cat.name}`, text: `Enter ${cat.name} name` };
        }) : [{
            value: '',
            label: 'no subcategory feched'
        }];

        return (<>
            { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || getDefaultMeta()}></MetaTag> : ''}


            <main className="add-listing">
                {/* Header */}
                <GeneralHeader />

                {/* Breadcrumb */}
                <Breadcrumb CurrentPgTitle="Add Listing" MenuPgTitle="Listings" img={this.state.breadcrumbimg} />

                {/* Add Listing */}
                <section className="add-listing-area padding-top-40px padding-bottom-100px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 mx-auto">

                                <div className="billing-form-item">
                                    <div className="billing-title-wrap">
                                        <h3 className="widget-title pb-0">Tell us your Listing details</h3>
                                        <div className="title-shape margin-top-10px"></div>
                                    </div>
                                    <div className="billing-content">
                                        <div className="contact-form-action">
                                            <form method="post" onSubmit={this.handleListing}>
                                                <div className="row">

                                                    <div className="col-lg-6">
                                                        <div className="input-box">
                                                            <label className="label-text">Select Category</label>
                                                            <div className="form-group mb-2">
                                                                <Select
                                                                    value={this.state.catid}
                                                                    onChange={this.handleChangeCat}
                                                                    placeholder="Select a Category"
                                                                    options={categories}
                                                                    required={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="input-box">
                                                            <label className="label-text">Service you Offer</label>
                                                            <div className="form-group mb-2">
                                                                <Select
                                                                    value={this.state.subcat}
                                                                    onChange={this.onChangeSubcat}
                                                                    placeholder="Select a Category"
                                                                    options={subcategories}
                                                                    required={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <div className="input-box">
                                                            <label className="label-text">{this.state.subcat.text}</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon">
                                                                    <BsPencilSquare />
                                                                </span>
                                                                <input className="form-control" value={this.state.businessname} onChange={this.onChangeBusinessname} type="text" name="listname" required="required" placeholder="Enter your listing title" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text">Description (Enter All Details that you feel are necessary)</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon">
                                                                    <BsPencil />
                                                                </span>
                                                                <textarea className="message-control form-control" value={this.state.description} onChange={this.onChangeDescription} name="description" required="required" placeholder="Write  description"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input-box">
                                                            <label className="label-text d-flex align-items-center ">Keywords
                                                             <i className="la tip ml-1" data-toggle="tooltip" data-placement="top" title="keywords related with your business it may">
                                                                    <BsQuestion />
                                                                </i>
                                                            </label>
                                                            <div className="form-group">
                                                                <span className="la form-icon">
                                                                    <AiOutlineTags />
                                                                </span>
                                                                <input className="form-control" type="text" name="name" value={this.state.keywords} onChange={this.onChangeKeywords} required="required" placeholder="Keywords should be separated by commas" />
                                                            </div>
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
                                                <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
                                                    <div className="billing-content p-0">
                                                        <div className="custom-checkbox d-block mr-0">
                                                            <div className="form-group">
                                                                <input className="form-control" type="checkbox" id="privacy" onChange={this.handlePrivacyCheck} defaultChecked={this.state.privacychecked} required="required" />
                                                                <label htmlFor="privacy">I Agree to Casual Desi  <Link to="#" onClick={this.open} className="color-text">Privacy Policy</Link></label>
                                                            </div>
                                                        </div>
                                                        {/* {<div className="custom-checkbox d-block mr-0">
                                                            <div className="form-group">
                                                                <input type="checkbox" className="form-control" id="terms" onChange={this.handleTermsCheck} defaultChecked={this.state.termschecked} required="required" />
                                                                <label htmlFor="terms">I Agree to Casual Desi <Link to="#" onClick={this.open} className="color-text">Terms of Services</Link>
                                                                </label>
                                                            </div>
                                                        </div> */}
                                                        <div className="custom-checkbox d-block mr-0">
                                                            <div className="form-group">
                                                                <label className="label-text">  {this.state.msg} </label>
                                                            </div>
                                                        </div>
                                                        <div className="btn-box mt-4">
                                                            <button type="submit" className="theme-btn border-0" disabled={this.state.loading || this.state.ischecked}>
                                                                {this.state.loading && (
                                                                    <span className="spinner-border spinner-border-sm"></span>
                                                                )} submit listing</button>
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

                <Modal show={this.state.showModal} onHide={this.close} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="billing-form-item ">
                            <div className="billing-title-wrap">
                                <h3 className="widget-title pb-0">
                                    Privacy Policy
                                            </h3>
                                <div className="title-shape margin-top-10px"></div>
                            </div>

                            <Accordion className="accordion accordion-item pr-4  margin-top-10px" id="accordionExample">

                                {this.state.rule && this.state.rule.map((item, i) => {
                                    return (
                                        <div className={'card ' + this.state.cardClass} key={i}>
                                            <AccordionItem>
                                                <AccordionItemHeading className="card-header">
                                                    <AccordionItemButton className="btn btn-link d-flex align-items-center justify-content-between">
                                                        {item.title}
                                                        <i className="minus">{this.state.minus}</i>
                                                        <i className="plus">{this.state.plus}</i>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <div className="card-body">
                                                        {item.description}
                                                    </div>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        </div>
                                    )
                                })}

                            </Accordion>

                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <span onClick={this.close}>Close</span>
                    </Modal.Footer>
                </Modal>



                {/* Newsletter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />

            </main>
            <Modal show={this.state.showFulldetail} onHide={this.closetwo} dialogClassName="modal-90w">
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <FullDetailListing closee={this.closetwo} />

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { isCreated } = state.list;
    const { amenties, steplist, category, subcategory, rule,pageinfo } = state.common;

    return {
        isLoggedIn,pageinfo, category, steplist, subcategory, amenties, userdetails, isCreated, rule

    };
}
export default withRouter(connect(mapStateToProps)(AddListing));