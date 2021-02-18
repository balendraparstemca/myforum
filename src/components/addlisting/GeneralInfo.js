import React, { Component } from 'react';
import { BsPencilSquare, BsQuestion, BsPencil, BsFileCode } from 'react-icons/bs'
import { AiOutlineTags } from 'react-icons/ai'
import Select from "react-select";
import { FiMap } from 'react-icons/fi';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { connect } from "react-redux";
import { fetchAmenties, fetchCategory, getAllSubCategory } from '../../services/action/common';
import { getListDetail, UpdateListing } from '../../services/action/list';
class GeneralInfo extends Component {
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
            listid: null,
            title: '',
            businessname: '',
            description: '',
            keywords: '',
            address: '',
            selectedCatOp: null,
            breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
            catid: { label: 'select a service', value: null, id:'' },
            subcat: { label: 'select a subcategory', value: '',id:null },
            category: [],
            amenties: [],
            subcategory: [],
            showModal: false,
            country: '',
            region: '',
            place: '',
            zipcode: '',
            ModelContent: '',
            canonicalurl: '',
            loading: false,
            uniqid:''
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
            address: ''

        })
    }


    componentDidMount() {
        this.props.dispatch(fetchCategory()).then(() => {
            this.setState({
                category: this.props.category
            })

        });
        this.fetchlistDetail();


    }

    onChangeSubcat = async (subcat) => {
        this.setState({ subcat })
        await this.props.dispatch(fetchAmenties(subcat.id));
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

    fetchlistDetail = () => {
        let obj = { "canonicalurl": this.props.listurl }
        this.props.dispatch(getListDetail(obj)).then(() => {
            const obj =this.state.category.find((obj)=> obj.id === Number(this.props.listdetail.categoryid));
             this.setState({
                uniqid:this.props.listdetail && this.props.listdetail.listid,
                subcat:{value:this.props.listdetail && this.props.listdetail.subcat_id, label:this.props.listdetail && this.props.listdetail.categoryname},
                businessname: this.props.listdetail && this.props.listdetail.list_title,
                description: this.props.listdetail && this.props.listdetail.description,
                address: this.props.listdetail && this.props.listdetail.address,
                place: this.props.listdetail && this.props.listdetail.city,
                listid: this.props.listdetail && this.props.listdetail.listing_id,
                catid: { value: this.props.listdetail && this.props.listdetail.categoryid,label:obj && obj.name },
                keywords: this.props.listdetail && this.props.listdetail.keywords,
                zipcode: this.props.listdetail && this.props.listdetail.zipcode,
                country: this.props.listdetail && this.props.listdetail.country,
                region: this.props.listdetail && this.props.listdetail.state,
                canonicalurl: this.props.listdetail && this.props.listdetail.canonicalurl
            })

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
        this.setState({
            place: e.target.value,
        });
    }

    onChangeZipcode(e) {
        this.setState({
            zipcode: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
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

    open = () => {
        this.setState({ showModal: true });
    }


    handleChangeCat = (catid) => {
        this.setState({ catid });
        this.getsubcategory(catid.id);
     }

    handleListing(e) {
        e.preventDefault();
        this.setState({
            loading: true,
        });

        const obj = {
            listid:this.state.uniqid,
            listing_id: this.state.listid,
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
            canonicalurl: this.state.canonicalurl,
            created_by: this.props.userdetails.id && this.props.userdetails.id

        }
       

        this.props.dispatch(UpdateListing(obj)).then(() => {
            if (this.props.isCreated) {
                this.fetchlistDetail()
                this.setState({ loading: false })

            }
        })

    }

    render() {

        const { country, region, category, subcategory } = this.state;
        const categories = category && category.length ? category.map(cat => {
            return { value: `${cat.id}`, label: `${cat.name}`, id:`${cat.cat_id}` };
        }) : [{
            value: 0,
            label: 'no category feched'
        }];

      

        const subcategories = subcategory && subcategory.length > 0 ? subcategory.map(cat => {
            return { value: `${cat.subcat_id}`, label: `${cat.name}`, id:`${cat.id}`};
        }) : [{
            value: '',
            label: 'no subcategory feched'
        }];

        return (
            <>
                <div className="billing-form-item">
                    <div className="billing-title-wrap">
                        <h3 className="widget-title pb-0">Tell us your business details</h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="billing-content">
                        <div className="contact-form-action">
                            <form method="post" onSubmit={this.handleListing}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">Business Name</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <BsPencilSquare />
                                                </span>
                                                <input className="form-control" value={this.state.businessname} onChange={this.onChangeBusinessname} type="text" name="listname" required="required" placeholder="Enter your listing title" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">Select Category</label>
                                            <div className="form-group mb-0">
                                                <Select
                                                    value={this.state.catid}
                                                    onChange={this.handleChangeCat}
                                                    placeholder="Select a Category"
                                                    options={categories}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="input-box">
                                            <label className="label-text">Service you Offer</label>
                                            <div className="form-group mb-0">
                                                <Select
                                                    value={this.state.subcat}
                                                    onChange={this.onChangeSubcat}
                                                    placeholder="Select a Category"
                                                    options={subcategories}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="input-box">
                                            <label className="label-text">Description</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <BsPencil />
                                                </span>
                                                <textarea className="message-control form-control" value={this.state.description} onChange={this.onChangeDescription} name="description" required="required" placeholder="Write your Business description"></textarea>
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
                                                            <input className="form-control" value={this.state.address} onChange={this.onChangeAddress} type="text" name="address" required="required" placeholder="Your address" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="label-text">Country</label>
                                                    <div className="form-group">
                                                        <CountryDropdown
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

                                        <div className="btn-box mt-4">
                                            <button type="submit" className="theme-btn border-0" disabled={this.state.loading}>
                                                {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )} save listing</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { isCreated, listdetail } = state.list;
    const { amenties, category,subcategory } = state.common;
    return {
        isLoggedIn, category, amenties, userdetails,subcategory, isCreated, listdetail

    };
}
export default connect(mapStateToProps)(GeneralInfo);
