import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import { connect } from "react-redux";
import BlogSidebar from "../../components/sidebars/BlogSidebar";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { FetchpostComment, fetcPostDetail, savePost, postDownvote, postUpvote, reportPost, postComment, postCommentvote, postCommentdelete } from '../../services/action/post';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaBuffer, FaCommentAlt, FaEdit, FaShareAltSquare, FaUserCheck } from 'react-icons/fa'
import { BsFillBookmarkFill, BsFillExclamationCircleFill, BsLink45Deg, BsPencil } from 'react-icons/bs';
import { Link } from "react-router-dom";
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert'
import { FiRefreshCw, FiThumbsUp } from 'react-icons/fi';
import { Badge } from 'react-bootstrap';
import SectionDivider from '../../components/common/SectionDivider';
import { Dropdown } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { DeletePosts } from '../../services/action/user';
import LoadingOverlay from 'react-loading-overlay';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EmailShareButton, WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramShareButton, TelegramIcon, EmailIcon } from "react-share";
import { MdDateRange } from 'react-icons/md';

import MetaTag from '../metainfo';

class BlogDetail extends Component {

    constructor(props) {
        super(props)
        this.loadMore = this.loadMore.bind(this);
        this.onChangeReport = this.onChangeReport.bind(this);
        this.handleReview = this.handleReview.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.state = {
            editorState: EditorState.createEmpty(),
            postdetail: null,
            maincomment: [],
            comments: [],
            message: '',
            loading: true,
            upvoted: false,
            downvoted: false,
            cupvote: 'upvote',
            cdownvote: 'downvote',
            reporttext: "",
            authorImg: require('../../assets/images/default.png'),
            userimg: require('../../assets/images/testi-img1.jpg'),
            img: require('../../assets/images/post.png'),
            visible: 2,
            metainfo: null,
            defaultMetaTag: null

        }
    }



    componentDidMount() {

        this.postdetail();
      

    }


    

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState, message: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    }

    onChangeReport(e) {

        this.setState({
            reporttext: e.target.value
        });

        alert(this.state.reporttext)
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value,
        });
    }


    handleReview(e) {
        e.preventDefault();
        this.posttComment()
        this.setState({ message: '' })


    }

    postdetail = () => {
        this.setState({ loading: true })
        let obj = { canonicalurl: this.props.match.params.url }
        this.props.dispatch(fetcPostDetail(obj)).then(() => {
            if (this.props.postsdetail.length > 0) {
                this.setState({
                    postdetail: this.props.postsdetail[0], loading: false
                })

                if (this.props.postsdetail[0].meta) 
                {
                    this.setState({
                        metainfo: {
                            title: this.props.postsdetail[0].seo_title ? this.props.postsdetail[0].seo_title:this.props.postsdetail[0].title,
                            canonicalURL: `https://www.casualdesi.com${this.props.location.pathname || ''}`,
                            meta: JSON.parse(this.props.postsdetail[0].meta) 
                        }
                    })

                }
                else{
                    this.setState({
                        metainfo: {
                            title: this.props.postsdetail[0].seo_title ? this.props.postsdetail[0].seo_title:this.props.postsdetail[0].title,
                            canonicalURL: `https://www.casualdesi.com${this.props.location.pathname || ''}`,
                            meta: [{
                                attribute: 'name',
                                value: 'description',
                                content: this.createMarkup(this.props.postsdetail[0].description)
                            }]
                        }
                    })
                }

  
                this.fetchcomment(this.props.postsdetail[0].post_id);
            }
            else {
                this.props.history.push("/error");
                window.location.reload();
            }
        })
    }

    fetchcomment = (postid) => {
        this.props.dispatch(FetchpostComment(postid)).then(() => {
            if (this.props.postcomment.length > 0) {
                this.setState({ comments: this.props.postcomment, maincomment: this.props.postcomment, loading: false })
            }
        })
    }


    upvote = async (postid) => {
        if (this.props.isLoggedIn) {
            const obj = { 'post_id': postid, 'upvote_by': this.props.userdetails.id };
            await this.props.dispatch(postUpvote(obj));
            await this.postdetail();
        }
        else {
            alert('login')
        }


    }

    downvote = async (postid) => {
        if (this.props.isLoggedIn) {
            const obj = { 'post_id': postid, 'downvote_by': this.props.userdetails.id };
            await this.props.dispatch(postDownvote(obj));
            await this.postdetail();
        } else {
            alert('login')
        }

    }

    posttComment() {
        if (this.props.isLoggedIn) {
            this.setState({ loading: true })
            let obj = {
                comment_by: this.props.userdetails.id, textcomment: this.state.message,
                post_id: this.state.postdetail.post_id
            }
            this.props.dispatch(postComment(obj)).then(() => {
                this.fetchcomment(this.props.postsdetail[0].post_id);
                this.setState({
                    editorState: EditorState.createEmpty(), loading: false
                })

            })
        }
        else {
            alert('login')
        }

    }



    deleteAlert = (postid) => (
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() => this.onDelete(postid)}
            onCancel={this.onCancel}
            focusCancelBtn
        >
            You will not be able to recover all data related to this post!
        </SweetAlert>
    )

    getAlert = (postid) => (
        <SweetAlert
            custom
            showCancel
            confirmBtnText="Report"
            placeHolder="Write something"
            onCancel={this.onCancel}
            btnSize="sm"
            onConfirm={() => this.onReport(postid)}
            type={'controlled'}
            dependencies={[this.state.reporttext]}
        >
            {(renderProps) => (
                <div className="central-meta">
                    <div className="new-postbox">
                        <figure>
                            <img src="/assets/images/resources/admin2.jpg" alt="" />
                        </figure>
                        <div className="newpst-input">
                            <form>
                                <textarea
                                    type={'text'}
                                    rows="4"
                                    ref={renderProps.setAutoFocusInputRef}
                                    className="form-control"
                                    value={this.state.firstName}
                                    onKeyDown={renderProps.onEnterKeyDownConfirm}
                                    onChange={(e) => this.setState({ reporttext: e.target.value })}
                                    placeholder={'write something'}
                                ></textarea>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </SweetAlert>
    );

    onReport = (postid) => {
        if (this.state.reporttext) {
            const obj = {
                post_id: postid,
                report_by: this.props.userdetails.id,
                reason: this.state.reporttext
            }

            this.props.dispatch(reportPost(obj));
            this.setState({ alert: null })
        }
        else {
            alert("please write something before submit")
        }

    }

    deleteAlert = (postid) => (
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() => this.onDelete(postid)}
            onCancel={this.onCancel}
            focusCancelBtn
        >
            You will not be able to recover all data related to this post!
        </SweetAlert>
    )

    DeletePost = (postid) => {
        this.setState({ alert: this.deleteAlert(postid) })

    }

    onDelete(postid) {
        this.props.dispatch(DeletePosts(postid)).then(() => {
            this.props.history.push('/forum/home')
        });
        this.setState({ alert: null });
    }

    report = (postid) => {
        if (this.props.isLoggedIn) {
            this.setState({ alert: this.getAlert(postid) })
        }
        else {
            alert('login')
        }

    }


    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 4 };
        });
    }





    savePost = (postid) => {
        if (this.props.isLoggedIn) {
            const obj = {
                post_id: postid,
                saved_by: this.props.userdetails.id,
            }
            this.props.dispatch(savePost(obj)).then(() => {
                this.postdetail();
            });
        } else {
            alert('login')
        }
    }

    removeComment = (id) => {
        this.setState({ loading: true })
        this.props.dispatch(postCommentdelete(id)).then(() => {
            this.fetchcomment(this.props.postsdetail[0].post_id);
        })
    }

    vote = (id) => {
        if (this.props.isLoggedIn) {
            const obj = {
                post_id: this.state.postdetail && this.state.postdetail.post_id,
                comment_by: this.props.userdetails.id,
                comment_id: id
            }
            this.props.dispatch(postCommentvote(obj)).then(() => {
                this.fetchcomment(this.props.postsdetail[0].post_id);
            })

        } else {
            alert('please login first')
        }

    }


    onCancel = () => {
        this.setState({
            alert: null
        });
    }

    sortByold() {
        let lists = this.state.maincomment;
        let arr = lists.sort(function (a, b) {
            return Number(a.comment_time) - Number(b.comment_time);
        });

        this.setState({ comments: arr })

    }


    sortByhighvoting() {
        let lists = this.state.maincomment;
        let arr = lists.sort(function (a, b) {
            return b.vote - a.vote;
        });

        this.setState({ comments: arr })

    }



    Sort = (id) => {
        if (id === 3) {
            this.sortByhighvoting()
        }
        else if (id === 2) {
            this.sortByold()

        }
        else {
            this.setState({ comments: this.state.maincomment })
        }


    }

    createMarkup = (content) => {
        return { __html: content };
    }


    render() {
    
        const { editorState } = this.state;
        const userid = this.state.postdetail && this.state.postdetail.user
        return (<>
          { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || this.state.defaultMetaTag}></MetaTag> : ''}


            <main className="List-map-view2">

                {/* Header */}
               

                <GeneralHeader />
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                    text='Loading your content...'
                >

                    <section className="blog-single-area  margin-top-80px padding-top-140px padding-bottom-70px">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card-item blog-card border-bottom-0">

                                        <Dropdown className="float-right">
                                            <Dropdown.Toggle variant="default" id="dropdown-basic">

                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {this.props.isLoggedIn ? (this.props.userdetails.id === userid ? <Dropdown.Item><Link to={`/forum/post/edit/${this.state.postdetail && this.state.postdetail.canonicalurl}`} > <FaEdit /> Edit </Link></Dropdown.Item> : '') : ''}
                                                {this.props.isLoggedIn ? (this.props.userdetails.id === userid ? <Dropdown.Item onClick={() => this.DeletePost(this.state.postdetail && this.state.postdetail.post_id)}><AiFillDelete /> Delete</Dropdown.Item> : '') : ''}
                                                <Dropdown.Item onClick={() => this.report(this.state.postdetail && this.state.postdetail.post_id)}><BsFillExclamationCircleFill /> Report</Dropdown.Item>
                                                <Dropdown.Item onClick={() => this.savePost(this.state.postdetail && this.state.postdetail.post_id)}><BsFillBookmarkFill /> save</Dropdown.Item>


                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="row">
                                            <div className="col-2">
                                                <p className="upvote" onClick={() => this.upvote(this.state.postdetail && this.state.postdetail.post_id)}>  <span className="la"><b><FaArrowAltCircleUp /></b></span> </p><p>{this.state.postdetail && this.state.postdetail.vote}</p><p className="downvote" onClick={() => this.downvote(this.state.postdetail.post_id)}> <span className="la"><b><FaArrowAltCircleDown /></b></span> </p>

                                            </div>
                                            <div className="col-10">

                                                <div>
                                                    <ul className="post-author ">
                                                        <li>
                                                            <img src={this.state.authorImg} alt="" />

                                                            <span><Link to={`/forum/r/${this.state.postdetail && this.state.postdetail.com_name}`}>  r/{this.state.postdetail && this.state.postdetail.com_name} </Link></span>
                                                            <span className="by__text"> <FaUserCheck /> By </span>
                                                            <span className="by__text"> <Link to={`/forum/user/${this.state.postdetail && this.state.postdetail.username}`}> u/{this.state.postdetail && this.state.postdetail.username} </Link></span>
                                                            <span>{this.state.postdetail && moment(Number(this.state.postdetail.post_time)).fromNow()} - </span>
                                                        </li>

                                                    </ul>
                                                    <h5 className="card-title font-size-2">
                                                        {this.state.postdetail && this.state.postdetail.title}
                                                    </h5>
                                                    <p>
                                                        <a target="_blank" rel="noopener noreferrer" href={this.state.postdetail && this.state.postdetail.url}> {this.state.postdetail && this.state.postdetail.url.replace(/^https?\:\/\/www\./i, "").split('/')[0]}... <BsLink45Deg /></a> <span className="badge badge-secondary badge-pill">{this.state.postdetail && this.state.postdetail.flare_tag}</span>

                                                    </p>
                                                    <div className="card-image">
                                                        {this.state.postdetail && this.state.postdetail.imgSrc ? <img src={`${process.env.REACT_APP_API_KEY}utilities/${this.state.postdetail.imgSrc}`} alt="Blog Full Width" className="card__img" /> : ''}
                                                    </div>
                                                    <div className="card-sub mt-3" dangerouslySetInnerHTML={this.createMarkup(this.state.postdetail && this.state.postdetail.description)}>

                                                    </div>
                                                    <div className="margin-top-35px margin-bottom-35px">
                                                        <ul className="social-profile margin-bottom-35px text-right">

                                                            <li className="margin-left-10px">
                                                                <Dropdown className="dropdown share-dropmenu">
                                                                    <Dropdown.Toggle className="dropdown-toggle border-0 after-none" variant="default" id="dropdown-basic">
                                                                        <b className="d-inline-block">
                                                                            <FaShareAltSquare />share</b>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="dropdown-menu">

                                                                        <Dropdown.Item className={'dropdown-item'}>
                                                                            <i><WhatsappShareButton
                                                                                url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                                title={this.state.postdetail && this.state.postdetail.title}
                                                                                separator=":: "

                                                                            >
                                                                                <WhatsappIcon size={32} round />
                                                                            </WhatsappShareButton></i>  {'Whatsapp'}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className={'dropdown-item'}>
                                                                            <i><FacebookShareButton
                                                                                url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                                title={this.state.postdetail && this.state.postdetail.title}
                                                                                className="Demo__some-network__share-button"
                                                                            >
                                                                                <FacebookIcon size={32} round />
                                                                            </FacebookShareButton> </i>  {'Facebook'}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className={'dropdown-item'}>
                                                                            <i> <TwitterShareButton
                                                                                url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                                title={this.state.postdetail && this.state.postdetail.title}
                                                                                className="Demo__some-network__share-button"
                                                                            >
                                                                                <TwitterIcon size={32} round />
                                                                            </TwitterShareButton></i> {'Twitter'}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className={'dropdown-item'}>
                                                                            <i>  <TelegramShareButton
                                                                                url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                                title={this.state.postdetail && this.state.postdetail.title}

                                                                                className="Demo__some-network__share-button"
                                                                            >
                                                                                <TelegramIcon size={32} round />
                                                                            </TelegramShareButton></i>  {'Telegram'}
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item className={'dropdown-item'}>
                                                                            <i> <EmailShareButton
                                                                                url={`https://www.casualdesi.com${this.props.location.pathname}`}
                                                                                title={this.state.postdetail && this.state.postdetail.title}
                                                                                body="body"
                                                                                className="Demo__some-network__share-button"
                                                                            >
                                                                                <EmailIcon size={32} round />
                                                                            </EmailShareButton></i>{'Email'}
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>


                                                            </li>
                                                            <li className="margin-left-10px">


                                                                <button type="button" class="btn btn-light">
                                                                    <b className="d-inline-block margin-left-10px">
                                                                        <MdDateRange /> {this.state.postdetail && moment(Number(this.state.postdetail.post_time)).fromNow()}
                                                                    </b></button>

                                                            </li>
                                                            <li className="margin-left-10px">

                                                                <button type="button" class="btn btn-light">
                                                                    <b className="d-inline-block">
                                                                        |   <FaCommentAlt /> Discussion   <span class="badge badge-light">  {
                                                                            this.state.comments && this.state.comments.length > 0 ? (this.state.comments.length) : ''
                                                                        }</span>|
                                                                    </b></button>


                                                            </li>


                                                        </ul>

                                                    </div>


                                                    <div className="comments-wrap">

                                                        <div className="title-shape"></div>
                                                        <div className="add-review-listing padding-top-20px">
                                                            <h2 className="widget-title">Add a Comment</h2>
                                                            <div className="title-shape"></div>
                                                            <div className="section-heading padding-top-1px">
                                                                <p className="sec__desc font-size-16">Please Login before commenting *</p>
                                                            </div>
                                                            <div className="add-review-listing padding-top-0px" id="review">


                                                                <div className="contact-form-action mt-5">
                                                                    <form method="post" onSubmit={this.handleReview}>
                                                                        <div className="row">


                                                                            {/* <div className="col-lg-12">
                                                                                <div className="input-box">
                                                                                    <label className="label-text">discussion</label>
                                                                                    <div className="form-group">
                                                                                        <span className="la form-icon"><BsPencil /></span>
                                                                                        <textarea className="message-control form-control" name="message" value={this.state.message} onChange={this.onChangeMessage} required="required" placeholder="Write Message"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div> */}

                                                                            <div className="col-lg-12">
                                                                                <div className="input-box">

                                                                                    <div className="form-group">
                                                                                        <span className="la form-icon"><BsPencil /></span>
                                                                                        <Editor
                                                                                            editorState={editorState}
                                                                                            wrapperclassName="demo-wrapper"
                                                                                            editorclassName="demo-editor form-control "
                                                                                            onEditorStateChange={this.onEditorStateChange}

                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-12">
                                                                                <div className="upload-btn-box">

                                                                                    <button className="theme-btn border-0 margin-top-20px" type="submit" value="submit">
                                                                                        Submit review
                                                                                 </button>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>

                                                            <Dropdown className="float-right">
                                                                <Dropdown.Toggle variant="primary" id="dropdown-basic2">
                                                                    sort
                                                        </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => this.Sort(1)}>  Sort By High voted</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => this.Sort(2)}> <FaBuffer /> Sort By Old</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => this.Sort(3)}> <FaBuffer /> Sort By High voted</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>

                                                            <SectionDivider />
                                                        </div>


                                                        <b>
                                                            {
                                                                this.state.comments && this.state.comments.length > 0 ? (
                                                                    `showing 1 to ${this.state.visible > this.state.comments.length ? this.state.comments.length : this.state.visible} out of ${this.state.comments.length}`

                                                                ) : ''
                                                            }</b>

                                                        <ul className="comments-list padding-top-20px">
                                                            <li>

                                                                {this.state.comments && this.state.comments.slice(0, this.state.visible).map((comment, i) => {
                                                                    return (


                                                                        <div className="comment" key={i}>

                                                                            <img className="avatar__img" alt="Comment" src={this.state.userimg} />



                                                                            <div className="comment-body">

                                                                                <div className="meta-data">
                                                                                    <span>
                                                                                        <Link to={`/forum/user/${comment.username}`}><b>{comment.username}</b></Link>
                                                                                    </span>
                                                                                    <Dropdown className="float-right">
                                                                                        <Dropdown.Toggle variant="default" id="dropdown-basic">

                                                                                        </Dropdown.Toggle>

                                                                                        <Dropdown.Menu>
                                                                                            {this.props.isLoggedIn ? (this.props.userdetails.id === comment.comment_by ? <Dropdown.Item onClick={() => this.removeComment(comment.comment_id)}><AiFillDelete /> Delete</Dropdown.Item> : '') : ''}
                                                                                        </Dropdown.Menu>
                                                                                    </Dropdown>
                                                                                    <span className="comment__date">
                                                                                        {moment(Number(comment.comment_time)).fromNow()}
                                                                                    </span>



                                                                                </div>

                                                                                <p className="comment-content" dangerouslySetInnerHTML={this.createMarkup(comment.text)}>

                                                                                </p>
                                                                                <div className="comment-reply d-flex justify-content-between align-items-center">

                                                                                    <p className="feedback-box">
                                                                                        Was this comment?
                                                                                    <button type="button" className="theme-btn" onClick={() => this.vote(comment.comment_id)}>
                                                                                            <i className="la d-inline-block"><FiThumbsUp /></i> Helpfull <Badge variant="success">{comment.vote}</Badge>
                                                                                        </button>

                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    )
                                                                })}


                                                            </li>

                                                            <SectionDivider />
                                                            <div className="button-shared padding-top-40px text-center">
                                                                {this.state.visible < this.state.comments.length && <Badge variant="danger" className="border-0" onClick={this.loadMore}>
                                                                    Load more <FiRefreshCw />
                                                                </Badge>
                                                                }
                                                            </div>
                                                        </ul>
                                                        <SectionDivider />

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.alert}
                                <div className="col-lg-4">
                                    <BlogSidebar comid={this.state.postdetail && this.state.postdetail.com_id} />
                                </div>
                            </div>
                        </div>
                    </section>
                </LoadingOverlay>

                {/* Newsletter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />


            </main ></>

        );
    }
}


function mapStateToProps(state) {
    const { postsdetail, postcomment } = state.post;
    const { userdetails, isLoggedIn } = state.auth;
    const { pageinfo } = state.common;

    return {
        postsdetail, userdetails, postcomment, isLoggedIn,pageinfo

    };
}
export default connect(mapStateToProps)(BlogDetail);