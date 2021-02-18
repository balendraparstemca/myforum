import React, { Component } from 'react';
import GeneralHeader from "../components/common/GeneralHeader";
import Banner6 from "../components/banner/banner6/Banner6";
import FaqCategories from "../components/other/categories/FaqCategories";
import SectionsHeading from "../components/common/SectionsHeading";
import AskQuestionField from "../components/contact/AskQuestionField";
import IconBoxThree from "../components/other/iconboxes/IconBoxThree";
import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import { connect } from "react-redux";
import { fetchRules, getDefaultMeta, getPageinfo } from '../services/action/common';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { FaPlus, FaMinus } from 'react-icons/fa'
import MetaTag from './metainfo';


class Faq extends Component {

    constructor(props) {

        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.ref = React.createRef();
        this.state = {
            rule: [],
            plus: <FaPlus />,
            minus: <FaMinus />,
            cardClass: 'mb-3',
            target: null,
            show: false,
            metainfo: null,
            defaultMetaTag: null,
        }

    }



    componentDidMount() {
        this.getpageseo({ page_type: 'faq' })
        this.props.dispatch(fetchRules({ com_id: 5 })).then(() => {
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
                        canonicalURL: `https://www.casualdesi.com/contact || ''}`,
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

            } else {

                this.setState({
                    defaultMetaTag: getDefaultMeta()
                })
            }
        })
    }



    handleClick = (e) => {
        this.setState({
            show: !this.state.show, target: e.target
        })
    }


    render() {
     
        return (<>
         { this.state.metainfo ? <MetaTag metaTag={this.state.metainfo || getDefaultMeta() }></MetaTag> : ''}

            <main className="faq-page">
                {/* Header */}
                <GeneralHeader />

                {/* Banner */}
                <Banner6 title="Hello, How Can We Help You?" />

                {/* Category */}
                <section className="hiw-area section-bg padding-top-80px padding-bottom-50px after-none text-center">
                    <div className="container">

                     


                 

                      
                        <FaqCategories />
                    </div>
                </section>

                <section className="faq-area padding-top-100px padding-bottom-100px">
                    <div className="container">
                        <div className="row section-title-width section-title-ml-mr-0">
                            <div className="col-lg-12">
                                <SectionsHeading title="Listing faqs" desc="Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortors." />
                            </div>

                        </div>
                        <div className="row margin-top-35px">
                            <div className="col-lg-8">
                                <Accordion className="accordion accordion-item pr-4" id="accordionExample">

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
                            <div className="col-lg-4">
                                <AskQuestionField title="Still have question?" />
                            </div>
                        </div>

                        <div className="section-block-2 margin-top-120px"></div>

                        <div className="row padding-top-100px">
                            <IconBoxThree />
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <NewsLetter />

                {/* Footer */}
                <Footer />

                <ScrollTopBtn />

            </main>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { rule,pageinfo } = state.common;
    return {
        rule,pageinfo
    };
}
export default connect(mapStateToProps)(Faq);