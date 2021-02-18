import React, {Component} from 'react';
import SectionsHeading from "../common/SectionsHeading";
// import Button from "../common/Button";

class About2 extends Component {
    state = {
        content:`
         <p ><span style="font-family: Symbol; color: black; ">·</span> <span >If you are looking for an Immigration help or advice,CASUAL DESI has a huge immigration Q&amp;A forum which is connected by topnotch immigration attorneys in respective countries who will answer yourquestions on the forum and if needed can directly involve to help you with yourissue. </span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >If you are looking for a best Indian restaurant nearby your location in any part of the globe you can find it on CASUAL DESI localbusiness – Desi Restaurants Section </span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >If you are looking for a Desi Roomate or Rent a space to Fellow Indian, Yes you can find one here at CASUAL DESI</span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >To find a Desi Event near you like Cultural, Sports (Cricket), Festive or Near by Students Indian Association in Universities. Wegot everything covered for your entertainment.</span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >Classifieds from Indian Nanny at your country of residence to Cab Rental for your trip in India, we got you covered.</span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >From Movie gossips to movie reviews we got youcovered with our reviews and gossips sections</span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >From an Indian restaurant Deals to Travel deals onflights and stay to Items you need to carry to India deals… we got you coveredat Casual Desi. </span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >From Indian grocery store to an Indian doctor to a Travel Agent we got you covered.</span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >From Indian music lessons to IT trainings we got you covered</span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >From Temple Puja to Finding Pundits to Wedding Organizers we got you covered. </span>&nbsp;</p>
        <p ><span style="font-family: Symbol; color: black;">·</span> <span >Is there anything Indian that you didn’t find it on Casual Desi, let us know if it is a possibility it will be here soon after your suggestion. </span>&nbsp;&nbsp;</p>
        `,
        images: [
            {
                img: require('../../assets/images/img15.jpg'),
                boxClass: 'mt-4'
            },
            {
                img: require('../../assets/images/img16.jpg'),
                boxClass: ''
            },
            {
                img: require('../../assets/images/img16.jpg'),
                boxClass: 'mt-4'
            },
            {
                img: require('../../assets/images/img15.jpg'),
                boxClass: ''
            },
            {
                img: require('../../assets/images/img15.jpg'),
                boxClass: 'mt-4'
            },
            {
                img: require('../../assets/images/img15.jpg'),
                boxClass: ''
            }
        ]
    }

    createMarkup = () => {
        return { __html: this.state.content };
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="about-content">
                            <SectionsHeading
                                title="Welcome to the Casual Desi"
                                desc="Casual Desi is a digital platform for Indians across the globe to find, coordinate, collaborate Indian stuff in and around them. Like  "
                                descClass=" font-size-17 pr-3 mb-3"
                            >
                                <p className="sec__desc font-size-16  pr-3" dangerouslySetInnerHTML={this.createMarkup()}>
                                      </p>
                                {/* <div className="btn-box padding-top-30px">
                                    <Button text="find out more" url="#" />
                                </div> */}
                            </SectionsHeading>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="img-boxes">
                            <div className="row">
                                {this.state.images.map((item, i) => {
                                    return (
                                        <div className="col-lg-6 column-td-6" key={i}>
                                            <div className={'img-box-item ' + item.boxClass}>
                                                <img src={item.img} alt="about" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default About2;