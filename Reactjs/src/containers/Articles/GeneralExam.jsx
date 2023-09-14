import React, { useState } from 'react'
// import './assets/css/main.css'
import { FormattedMessage } from 'react-intl';
import './AdvertisingArticles.scss'
import img10 from './assets/general.jpg'
import { isMobile } from 'react-device-detect';

function GeneralExam(props) {
    const [showHide, setShowHide] = useState(true)
    const [menuBar, setMenuBar] = useState(isMobile ? false : true);

    const handleShowMenu = () => {
        setShowHide(true)
        setMenuBar(true)
    }
    const handleHideMenu = () => {
        setShowHide(false)
        setMenuBar(false)
    }
    let handleClickGetMenu = (e) => {
        props.curSection(e.target.textContent)
    }
    return (
        <div className='ads-article-container'>
            {!isMobile &&
                <div className={menuBar ? 'ads-article-left-content ads-article-left-content--open' : 'ads-article-left-content'}>
                    <div className='ads-article-left-top'>
                        <div className="ads-article-left-search">
                            <input
                                className='aal-search-box'
                                type='text'
                                placeholder='search' />
                            <i className="fas fa-search"></i>
                            <span className='aal-search-show-hide'>
                                {showHide === true
                                    ? <span className='aal-search-show'
                                        onClick={() => handleHideMenu()}
                                    ><i class="fas fa-caret-left"></i></span>
                                    : <span className='aal-search-hide'
                                        onClick={() => handleShowMenu()}
                                    ><i class="fas fa-caret-right"></i></span>
                                }
                            </span>
                        </div>
                        <div className="ads-article-left-menu">
                            <h2>Menu</h2>
                            <p onClick={(e) => handleClickGetMenu(e)}><FormattedMessage id="home-header.specialist-exam" /></p>
                            <p onClick={(e) => handleClickGetMenu(e)}><FormattedMessage id="home-header.remote-exam" /></p>
                            <p onClick={(e) => handleClickGetMenu(e)}><FormattedMessage id="home-header.general-exam" /></p>
                            <p onClick={(e) => handleClickGetMenu(e)}><FormattedMessage id="home-header.medical-test" /></p>
                            <p onClick={(e) => handleClickGetMenu(e)}> <FormattedMessage id="home-header.mental-health" /></p>
                        </div>
                    </div>
                    <div className="ads-article-left-contact">
                        <h2><FormattedMessage id="articles.general.header3" /></h2>
                        <p><FormattedMessage id="articles.general.p6" /></p>
                        <ul className="contact">
                            <span><i className="fa fa-envelope"></i> &nbsp; information@untitled.tld</span>
                            <span><i className="fa fa-phone"></i>&nbsp; (900) 123-1234</span>
                            <span><i className="fa fa-home"></i>&nbsp; 1234 Somewhere Road #8254<br />
                                &nbsp; Nashville, TN 00000-0000</span>
                        </ul>
                    </div>
                </div>
            }
            <div className={menuBar ? 'ads-article-right-content' : 'ads-article-right-content  ads-article-right-content--open'}>
                <div className="ads-article-right-header">
                    <div className='aar-header-content'>
                        <span className='aar-header-text'>
                            <FormattedMessage id="home-header.general-exam" />
                        </span >
                        {!isMobile &&
                            <span className='aar-header-icons'>
                                <i><a href="#" className="fab fa-twitter"></a></i>
                                <i><a href="#" className="fab fa-facebook-f"></a></i>
                                <i><a href="#" className="fab fa-snapchat-ghost"></a></i>
                                <i><a href="#" className="fab fa-instagram"></a></i>
                                <i><a href="#" className="fab fa-medium-m"></a></i>
                            </span>
                        }
                    </div>
                </div>
                <div className={!isMobile ? "ads-article-right-body" : "ads-article-right-body-mobile"}>
                    <div className="aar-body-text">
                        <h1><FormattedMessage id="home-header.general-exam" /></h1>
                        <p className='p1'><FormattedMessage id="articles.general.header" /></p>
                        <p className='p2'><FormattedMessage id="articles.general.p1" /></p>
                    </div>
                    <div className="aar-body-image">
                        <img src={img10} />
                    </div>
                </div>
                <div className={!isMobile ? "ads-article-right-footer" : "ads-article-right-footer-mobile"}>
                    <div className="aar-footer-title">
                        <h1><FormattedMessage id="articles.general.header2" /></h1>
                    </div>
                    <div className="aar-footer-content">
                        <div className="aar-footer-content-icon1"><i className='fa fa-gem'></i></div>
                        <div className="aar-footer-content-icon2"><i className="fa fa-paper-plane"></i></div>
                        <div className="aar-footer-content-icon3"><i className="fa fa-rocket"></i></div>
                        <div className="aar-footer-content-icon4"><i className="fa fa-signal"></i></div>
                        <div className="aar-footer-content-text1">
                            <h3><FormattedMessage id="articles.general.ph2" /></h3>
                            <p><FormattedMessage id="articles.general.p2" /></p>
                        </div>
                        <div className="aar-footer-content-text2">
                            <h3><FormattedMessage id="articles.general.ph3" /></h3>
                            <p><FormattedMessage id="articles.general.p3" /></p>
                        </div>
                        <div className="aar-footer-content-text3">
                            <h3><FormattedMessage id="articles.general.ph4" /></h3>
                            <p><FormattedMessage id="articles.general.p4" /></p>
                        </div>
                        <div className="aar-footer-content-text4">
                            <h3><FormattedMessage id="articles.general.ph5" /></h3>
                            <p><FormattedMessage id="articles.general.p5" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GeneralExam