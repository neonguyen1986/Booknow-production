import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import '../../HomePage/HomePage.scss'
import { isMobile } from 'react-device-detect';


class About extends Component {

    render() {

        return (
            <>
                <div className='fit-height-width about-background'>
                    <div className={!isMobile ? 'about-section container' : 'about-section-mobile container'}>
                        <div className='about-left-content'>
                            <div className='alc-title'><FormattedMessage id="about.book-now" /></div>
                            <div className='alc-content'>
                                <FormattedMessage id="about.book-now-content" />
                            </div>
                        </div>
                        <div className='about-right-content'>
                            <div className='arc-contact'>
                                <FormattedMessage id="about.contact" />
                            </div>
                            <div className='arc-email-address-phone'>
                                <div className='arceap-left'>
                                    <i className="fa fa-envelope"></i> &nbsp; <FormattedMessage id="about.email" /> <br />
                                    <i className="fa fa-phone"></i>&nbsp; &nbsp;<FormattedMessage id="about.phone" /><br />
                                    <i className="fa fa-home"></i>&nbsp;&nbsp;<FormattedMessage id="about.address" /><br />
                                </div>
                                <div className='arceap-right'>
                                    <FormattedMessage id="about.email-input" /> <br />
                                    <FormattedMessage id="about.phone-input" /><br />
                                    <FormattedMessage id="about.address-input" />
                                </div>
                            </div>
                            <div className='arc-social-media'>
                                <i><a href="#" className="fab fa-twitter"></a></i>
                                <i><a href="#" className="fab fa-facebook-f"></a></i>
                                <i><a href="#" className="fab fa-snapchat-ghost"></a></i>
                                <i><a href="#" className="fab fa-instagram"></a></i>
                                <i><a href="#" className="fab fa-github"></a></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About)

