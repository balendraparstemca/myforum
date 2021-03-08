import React, { Component } from 'react';
import Select from "react-select";
import { addListShedule, deleteListShedule, getListShedule,nextupdate } from '../../services/action/list';
import { connect } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';
import { AiFillDelete } from 'react-icons/ai';
const shortby = [
    {
        value: 'open-24-hours',
        label: 'open-24-hours'
    },
    {
        value: 'closed',
        label: 'closed'
    },
    {
        value: '',
        label: 'none'
    },
    {
        value: '1:00am',
        label: '1:00am'
    },
    {
        value: '2:00am',
        label: '2:00am'
    },
    {
        value: '3:00am',
        label: '3:00am'
    },
    {
        value: '4:00am',
        label: '4:00am'
    },
    {
        value: '5:00am',
        label: '5:00am'
    },
    {
        value: '6:00am',
        label: '6:00am'
    },
    {
        value: '7:00am',
        label: '7:00am'
    },
    {
        value: '8:00am',
        label: '8:00am'
    },
    {
        value: '9:00am',
        label: '9:00am'
    },
    {
        value: '10:00am',
        label: '10:00am'
    },
    {
        value: '11:00am',
        label: '11:00am'
    },
    {
        value: '12:00pm',
        label: '12:00pm'
    },
    {
        value: '1:00pm',
        label: '1:00pm'
    },
    {
        value: '2:00pm',
        label: '2:00pm'
    },
    {
        value: '3:00pm',
        label: '3:00pm'
    },
    {
        value: '4:00pm',
        label: '4:00pm'
    },
    {
        value: '5:00pm',
        label: '5:00pm'
    },
    {
        value: '6:00pm',
        label: '6:00pm'
    },
    {
        value: '7:00pm',
        label: '7:00pm'
    },
    {
        value: '8:00pm',
        label: '8:00pm'
    },
    {
        value: '9:00pm',
        label: '9:00pm'
    },
    {
        value: '10:00pm',
        label: '10:00pm'
    },
    {
        value: '11:00pm',
        label: '11:00pm'
    },
    {
        value: '12:00am',
        label: '12:00am'
    },
]

const days =
    [
        {
            value: '',
            label: 'none'
        }, {
            value: 'everyday',
            label: 'Everydays'
        }, {
            value: 'weekly',
            label: 'Weekly'
        },
        {
            value: 'mon',
            label: 'monday'
        },
        {
            value: 'tue',
            label: 'tuesday'
        },
        {
            value: 'wed',
            label: 'wednesday'
        },
        {
            value: 'thu',
            label: 'thurseday'
        },
        {
            value: 'fri',
            label: 'friday'
        },
        {
            value: 'sat',
            label: 'saturday'
        }
    ]
class OpeningHours extends Component {
    constructor(props) {
        super(props)
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDateTwo = this.onChangeDateTwo.bind(this);
        this.state = {
            op: { label: '', value: '' },
            cl: { label: '', value: '' },
            dayname: { label: '', value: '' },
            title: 'Opening Hours',
            stitle: '',
            listshedulelist: [],
            loading: true,
            edate: null,
            fdate:null

        }
    }

    onChangeDate(e) {

        this.setState({
            edate: e.target.value,dayname: { label: '', value: '' }, op: { label: '', value: '' },cl: { label: '', value: '' },
        });
    }


    onChangeDateTwo(e) {

        this.setState({
            fdate: e.target.value,dayname: { label: '', value: '' }, op: { label: '', value: '' },cl: { label: '', value: '' }
        });
    }

    componentDidMount() {
        this.fetchlistshedule()
    }

    fetchlistshedule = () => {
        if (this.props.listid && this.props.listid) {
            this.props.dispatch(getListShedule({ listing_id: this.props.listid && this.props.listid })).then(() => {
                this.setState({ loading: false })
                if (this.props.shedulelist.length > 0) {
                    this.setState({ listshedulelist: this.props.shedulelist })
                    this.props.dispatch(nextupdate(true))
                   
                }else{
                    this.setState({ listshedulelist: []})
                    this.props.dispatch(nextupdate(false))
                }

            })

        }

    }
       removeListother=(sid)=>{
        this.props.dispatch(deleteListShedule({id:sid})).then(()=>{
            this.fetchlistshedule()
        })
    }


    handleChangedays = async (dayname) => {
        this.setState({ dayname })
    }
    handleChangeopening = async (op) => {
        this.setState({ op })
    }

    handleChangeclosing = async (cl) => {
        this.setState({ cl })
    }

    submit = () => {
        if(this.state.edate ||  this.state.dayname.value)
        {
            const obj = {
                open: this.state.op.value,
                close: this.state.cl.value,
                day: this.state.dayname.value ? this.state.dayname.value : (this.state.fdate ? `${this.state.edate} To ${this.state.fdate}` : this.state.edate) ,
                listing_id: this.props.listid && this.props.listid
            }
           
    
            this.props.dispatch(addListShedule(obj)).then(() => {
                this.fetchlistshedule();
            })
          }
        else{
            alert("please fill the form correctly")
           }
    }
    render() {

        return (
            <>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                    text='Loading your content...'
                >
                    <div className="row"> <div className="col-lg-3">
                        <div className="sidebar-widget">
                            <div className="opening-hours">
                                <div className="listing-badge d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className="widget-title">
                                            {this.state.title}
                                        </h3>
                                        <div className="title-shape"></div>
                                    </div>
                                    <p><span className="theme-btn button-success">
                                        {this.state.stitle}
                                    </span></p>
                                </div>
                                <ul className="list-items padding-top-30px">
                                    { this.state.listshedulelist.length > 0 ? this.state.listshedulelist.map((item, i) => {
                                        return (
                                            <li key={i} className="d-flex justify-content-between">
                                               {item.day} <strong>{item.open}-{item.close}</strong> <span>
                                                <button
                                                    type="button" id="editImageMenu"
                                                    aria-haspopup="true"
                                                    aria-expanded="false" onClick={() => this.removeListother(item.id)}>
                                                    <AiFillDelete />
                                                </button></span>
                                            </li>
                                        )
                                    }):''}
                                </ul>
                            </div>
                        </div>
                    </div>
                        <div className="col-lg-9">
                            <div className="billing-form-item">
                                <div className="billing-title-wrap">
                                    <h3 className="widget-title pb-0">{this.state.title}</h3>
                                    <p>you can add update opening or closing time by selecting below </p>

                                    <div className="title-shape margin-top-10px"></div>
                                </div>
                                <div className="billing-content">
                                    <div className="contact-form-action">
                                        <form method="post">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="form-group"> Days
                                                      <Select
                                                            value={this.state.dayname}
                                                            onChange={this.handleChangedays}
                                                            placeholder="days"
                                                            options={days}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-lg-1"> <div className="form-group">Or</div></div>

                                                <div className="col-lg-3">
                                                    <div className="form-group"> Date
                                               <input className="form-control" value={this.state.edate} onChange={this.onChangeDate} type="date"></input>

                                                    </div>
                                                </div>
                                                <div className="col-lg-1"> <div className="form-group">To</div></div>

                                                <div className="col-lg-3">
                                                    <div className="form-group"> Date
                                               <input className="form-control" value={this.state.fdate} onChange={this.onChangeDateTwo} type="date"></input>

                                                    </div>
                                                </div>

                                                

                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <p>opening Time</p>
                                                    <div className="form-group">
                                                        <Select
                                                            id='moop'
                                                            value={this.state.op}
                                                            onChange={this.handleChangeopening}
                                                            placeholder="Opening Time"
                                                            options={shortby}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <p>closing Time</p>
                                                    <div className="form-group">
                                                        <Select
                                                            value={this.state.cl}
                                                            onChange={this.handleChangeclosing}
                                                            placeholder="Closing Time"
                                                            options={shortby}
                                                        />
                                                    </div>
                                                </div>
             
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-2 float-left">

                                                    <div className="form-group">
                                                        <div className="btn-box">
                                                            <button type="button" onClick={() => this.submit()} className="theme-btn border-0">
                                                                save </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
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

    const { listdetail, shedulelist } = state.list;

    return {
        listdetail, shedulelist

    };

}
export default connect(mapStateToProps)(OpeningHours);