import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { fetchCategory, getAllSubCategory } from '../../services/action/common';
import { Link } from 'react-router-dom';

class BlogGrid extends Component {
    state = {
        breadcrumbimg: require('../../assets/images/bread-bg.jpg'),
        loading: true,
        img: require('../../assets/images/bg.png')
    }

    componentDidMount() {
        this.categorydetail()
    }

    categorydetail = () => {
        this.setState({ loading: true })
        let obj = { canonical_url: this.props.match.params.catname }
        this.props.dispatch(fetchCategory(obj)).then(() => {
            if (this.props.category.length > 0) {
                const obj = { cat_id: this.props.category[0].cat_id }
                this.setState({ loading: false })
                this.props.dispatch(getAllSubCategory(obj)).then(() => {
                    console.log(this.props.subcategory)
                })

            }
            else {
                this.props.history.push("/error");
                window.location.reload();
            }
        })
    }

    handleModalShowHide() {

        this.props.history.push('/categories')

    }
    render() {
       

        return (
            <main className="blog-grid-page">
                {/* Header */}
                <GeneralHeader />
                {/* Breadcrumb */}
                <Breadcrumb CurrentPgTitle="Blog Grid" MenuPgTitle="Blog" img={this.state.breadcrumbimg} />

                <Modal show={true} size="lg">
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.loading ? (
                            <div className="d-flex justify-content-center margin-top-200px margin-bottom-200px text-primary">

                                <span className="spinner-border spinner-border-lg"></span>
                            </div>
                        ) : (<section className="blog-grid padding-bottom-10px">
                            <div className="container">
                                <div className="card shadow">
                                    {this.props.category && (
                                        <>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-12 position-relative" style={{ backgroundColor: "black", color: "#ffffff" }}>

                                                        <h2 className="breadcrumb__title margin-top-10px">
                                                            <span className="la d-inline-block"><i className={this.props.category[0].icon}></i></span>   {this.props.category[0].name}
                                                        </h2>
                                                        <p className="breadcrumb__desc">  <span className="la d-inline-block"></span>     Wikipedia Is A Multilingual Open-Collaborative Online Encyclopedia Created And Maintained By A Community Of Volunteer Editors Using A Wiki-Based Editing ..</p>

                                                    </div>

                                                </div>

                                            </div>
                                            <div className="card-image">
                                                <div>
                                                    <img className="card__img" src={`${process.env.REACT_APP_API_KEY}utilities/${this.props.category[0].imgsrc}`} width="100%" height="300px" alt=""></img>
                                                </div>
                                            </div>
                                            <div className="container card shadow  margin-top-10px " style={{ backgroundColor: "black", color: "#ffffff" }}>
                                                <div className="highlighted-categories">

                                                    <div className="row">
                                                        {this.props.subcategory && this.props.subcategory.length > 0 ? this.props.subcategory.map((item, index) => {
                                                            return (
                                                                <div className="col-lg-3 column-td-6" key={index}>
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

                                        </>

                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">

                                    </div>
                                </div>
                            </div>
                        </section>)
                        }

                    </Modal.Body >
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                       </Button>

                    </Modal.Footer>
                </Modal >
                {/* Newsletter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />
            </main >

        );
    }
}

function mapStateToProps(state) {
    const { category, subcategory } = state.common;
    return {
        category, subcategory
    };
}


export default connect(mapStateToProps)(BlogGrid);