import React, {Component} from 'react';
import CopyrightMenu from "./CopyrightMenu";


class Copyright extends Component {
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copy-right margin-top-50px padding-top-60px">
                            <p className="copy__desc">
                                &copy; Copyright Casual Desi 2020 </p>

                            <CopyrightMenu />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Copyright;