import React, { Component } from 'react';
import Select from "react-select";
import { addListingother, deleteListingother, getListingother, getListShedule } from '../../services/action/list';
import { connect } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';
import { BsPencil, BsPencilSquare } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

class ListOtherscontent extends Component {
    constructor(props) {
        super(props)
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.state = {
            op: { label: '', value: '' },
            cl: { label: '', value: '' },
            dayname: { label: '', value: '' },
            title: '',
            stitle: 'now open',
            listshedulelist: [],
            loading: true,
            edate: null,
            inputList: [{ description: "" }],
            listother: []

        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    setInputList = (list) => {
        this.setState({
            inputList: list
        })
    }

    removeListother = (sid) => {
        this.props.dispatch(deleteListingother({ id: sid })).then(() => {
            this.fetchlistothers();
        })
    }

    handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.inputList];
        list[index][name] = value;
        this.setInputList(list);
    };

    handleRemoveClick = index => {
        const list = [...this.state.inputList];
        list.splice(index, 1);
        this.setInputList(list);
    };

    // handle click event of the Add button
    handleAddClick = () => {
        this.setInputList([...this.state.inputList, { description: "" }]);
    };

    onChangeDate(e) {

        this.setState({
            edate: e.target.value,
        });
    }

    componentDidMount() {
        this.fetchlistothers()
    }

    fetchlistothers = () => {
        if (this.props.listid && this.props.listid) {
            this.props.dispatch(getListingother({ listing_id: this.props.listid && this.props.listid })).then(() => {
                this.setState({ loading: false })
                if (this.props.listother.length > 0) {
                    this.setState({ listother: this.props.listother })

                }

            })
        }
    }




    handleChangedays = async (dayname) => {
        this.setState({ dayname })
    }




    submit = () => {
        if (this.state.title || this.state.inputList[0].description) {

            const obj = {
                listing_id: this.props.listid && this.props.listid,
                title: this.state.title,
                text: this.state.inputList[0].description ? JSON.stringify(this.state.inputList) : '[]'

            }


            this.props.dispatch(addListingother(obj)).then(() => {
                this.fetchlistothers();
                this.setState({
                    inputList: [{ description: "" }], title: ''
                })
            })
        }

        else {
            alert("please fill the form before submitting")


        }
    }

    render() {
        console.log(this.props.listother)

        return (
            <>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                    text='Loading your content...'
                >
                    <div className="row"> <div className="col-lg-6">
                        <div className="sidebar-widget">
                            <div className="opening-hours">
                                {
                                    this.state.listother.length && this.state.listother.length > 0 ? this.state.listother.map((item, i) => {
                                        return (<div className="listing-description padding-top-20px padding-bottom-15px">
                                            <h2 className="widget-title">
                                           <span>   {item.title}</span> <span>
                                                <button
                                                    className="theme-btn edit-btn dropdown-toggle border-0 after-none"
                                                    type="button" id="editImageMenu"
                                                    aria-haspopup="true"
                                                    aria-expanded="false" onClick={() => this.removeListother(item.id)}>
                                                    <AiFillDelete />
                                                </button></span>
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
                            </div>
                        </div>
                    </div>
                        <div className="col-lg-6">
                            <div className="billing-form-item">
                                <div className="billing-title-wrap">
                                    <h3 className="widget-title pb-0">Add Necessary Information Related to your Listing</h3>
                                    <p>you can add dynamically title and information or lists for your Business Listing </p>

                                    <div className="title-shape margin-top-10px"></div>
                                </div>
                                <div className="billing-content">
                                    <div className="contact-form-action">

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input-box">
                                                    <label className="label-text">Title</label>
                                                    <div className="form-group">
                                                        <span className="la form-icon">
                                                            <BsPencilSquare />
                                                        </span>
                                                        <input className="form-control" value={this.state.title} onChange={this.onChangeTitle} type="text" name="listname" required="required" placeholder="title" />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-lg-12">
                                            {this.state.inputList.map((x, i) => {
                                                return (
                                                    <div className="input-box">
                                                        <label className="label-text">Description</label>
                                                        <div className="form-group">
                                                            <span className="la form-icon">
                                                                <BsPencil />
                                                            </span>
                                                            <textarea className="message-control form-control" value={x.description} onChange={e => this.handleInputChange(e, i)} name="description" required="required" placeholder="Write  description"></textarea>
                                                        </div>


                                                        <div className="btn-box text-right mb-2">
                                                            {this.state.inputList.length !== 1 && (<button className="btn btn-success btn-red mr-3" onClick={() => this.handleRemoveClick(i)}>
                                                                <i className="fas fa-minus"></i>
                                                            </button>)}
                                                            {this.state.inputList.length - 1 === i && (<button className="btn btn-success btn-red" onClick={this.handleAddClick}>
                                                                <i className="fas fa fa-plus"></i>
                                                            </button>)}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {<div className="row">
                                            <div className="col-lg-2 float-left">

                                                <div className="form-group">
                                                    <div className="btn-box">
                                                        <button type="button" onClick={() => this.submit()} className="theme-btn border-0">
                                                            save </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                    </div>
                                </div>
                            </div>
                        </div></div>
                </LoadingOverlay>
            </>
        );
    }
}


function mapStateToProps(state) {

    const { listdetail, shedulelist, listother } = state.list;

    return {
        listdetail, shedulelist, listother

    };

}
export default connect(mapStateToProps)(ListOtherscontent);