import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GiPositionMarker } from 'react-icons/gi'
import { IoMdMusicalNotes } from 'react-icons/io'
import { AiOutlineHome } from 'react-icons/ai'
import { FaSearchPlus } from 'react-icons/fa'
import { Link } from "react-router-dom";
import BannerOneSearchInput from "../banner1/BannerOneSearchInput";
import BannerThreeSearchInput2 from "./BannerThreeSearchInput2";
import BannerThreeSearchInput3 from "./BannerThreeSearchInput3";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Banner3Tab extends Component {
    state = {
        myarr: [1, 2, 3]
    }
    render() {
        return (
            <>
                <Tabs>
                    <div className="tab-shared">
                        <TabList className="nav nav-tabs" id="myTab">
                            {
                                this.state.myarr.map((item, i) => {
                                    return (
                                        <Tab>
                                            <Link className="nav-link theme-btn radius-rounded" to="#">
                                                <span>
                                                    <GiPositionMarker />
                                                </span> Desi Businesses
                                        </Link>
                                        </Tab>
                                    )
                                })

                            }



                        </TabList>
                    </div>
                    {
                        this.state.myarr.map((item, i) => {
                            return (<TabPanel>
                                <BannerOneSearchInput placeholder=" Desi Businesses" id="1MTlLyrcHs3Hc1dNDs8NWRR4" />
                            </TabPanel>)
                        })


                    }



                </Tabs>
            </>
        );
    }
}


function mapStateToProps(state) {
    const { isLoggedIn, userdetails } = state.auth;
    const { category } = state.common;
    return {
        isLoggedIn, category, userdetails

    };
}
export default withRouter(connect(mapStateToProps)(Banner3Tab));