import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils'
import { changeLanguageApp } from './../../../store/actions/appActions';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import * as actions from "../../../store/actions"
import logoImg from '../../../assets/book now.png'
import logoImgMobile from '../../../assets/book_now_mobile.png'
import Select from 'react-select';
import { isMobile } from 'react-device-detect'


class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctor: '',
            selectedDoctor: ''
        }
    }

    async componentDidMount() {
        await this.props.fetchAllDoctorsRedux();
        // console.log('---------allDoctores:', this.props.allDoctorsRedux)
        this.setState({ listDoctor: this.props.allDoctorsRedux })
    }

    buildDataSelect = (arrInput) => {
        let language = this.props.language;
        let result = [];
        if (arrInput?.length > 0) {
            for (let i = 0; i < arrInput.length; i++) {
                let tempObj = arrInput[i]
                result.push({
                    value: tempObj.id,
                    label: `${tempObj.firstName} ${tempObj.lastName}`,
                })
            }
        }
        return result
    }

    handleChangeSelect = async (key, selectedValue) => {
        this.setState({ [key]: selectedValue });
        console.log('---check selected:', key, selectedValue)
        this.props.history.push(`/detail-doctor/${selectedValue.value}`)
    };


    handleOnClickChangeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)

    }
    handleClickBackHome = () => {
        if (this.props.history) this.props.history.push('/home')
    }
    render() {
        // console.log('>>>check redux props:', this.props);
        let language = this.props.language;
        let optionsListDoctor = this.buildDataSelect(this.state.listDoctor)
        let { selectedDoctor } = this.state;
        return (
            <>
                <div className='home-header-container'>
                    {isMobile
                        ?
                        <div className='home-header-content-mobile'>
                            <div className='left-content-mobile'
                                onClick={() => this.handleClickBackHome()}>
                                <img src={logoImgMobile} className='header-logo' />
                            </div>
                            <div className='center-content-mobile'>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.facilities" /></b></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.package" /></b></div>
                                </div>
                            </div>
                            <div className='right-content-mobile'>
                                <div className='language'>
                                    <i class="fas fa-language"></i><br />
                                    <FormattedMessage id="home-header.language" />
                                </div>
                                <div>
                                    <div
                                        className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}
                                        onClick={() => this.handleOnClickChangeLanguage(LANGUAGE.EN)}
                                    ><b>EN</b></div>
                                    <div
                                        className={language === LANGUAGE.FR ? 'language-fr active' : 'language-fr'}
                                        onClick={() => this.handleOnClickChangeLanguage(LANGUAGE.FR)}
                                    ><b>FR</b></div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='home-header-content'>
                            <div className='left-content'
                                onClick={() => this.handleClickBackHome()}>
                                <img src={logoImg} className='header-logo' />
                            </div>
                            <div className='center-content'>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.search-doctor" /></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.facilities" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.choose-facilities" /></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.find-doctor" /></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.package" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.health-check" /></div>
                                </div>
                            </div>
                            <div className='right-content'>
                                <i class="fas fa-language"></i>
                                <div className='language'><FormattedMessage id="home-header.language" /></div>
                                <div>
                                    <div
                                        className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}
                                        onClick={() => this.handleOnClickChangeLanguage(LANGUAGE.EN)}
                                    ><b>EN</b></div>
                                    <div
                                        className={language === LANGUAGE.FR ? 'language-fr active' : 'language-fr'}
                                        onClick={() => this.handleOnClickChangeLanguage(LANGUAGE.FR)}
                                    ><b>FR</b></div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner container'>
                        {isMobile
                            ?
                            <div className='content-up-mobile'>
                                <div className='icon-block-up'>
                                    <div className='icon-block'>
                                        <div className='icon'>
                                            <img className='img' src={require('../../../assets/icon1-specialist-examination.png').default} />
                                        </div>
                                        <Link to='/introduction-articles?name=specialist' style={{ textDecoration: 'none', color: 'inherit', }}>
                                            <div className='text'><FormattedMessage id="home-header.specialist-exam" /></div>
                                        </Link>
                                    </div>
                                    <div className='icon-block'>
                                        <div className='icon'>
                                            <img className='img' src={require('../../../assets/icon2-remote-examination.png').default} />
                                        </div>
                                        <Link to='/introduction-articles?name=remote' style={{ textDecoration: 'none', color: 'inherit', }}>
                                            <div className='text'><FormattedMessage id="home-header.remote-exam" /></div>
                                        </Link>
                                    </div>
                                    <div className='icon-block'>
                                        <div className='icon'>
                                            <img className='img' src={require('../../../assets/icon3-general-examination.png').default} />
                                        </div>
                                        <Link to='/introduction-articles?name=general' style={{ textDecoration: 'none', color: 'inherit', }}>
                                            <div className='text'><FormattedMessage id="home-header.general-exam" /></div>
                                        </Link>
                                    </div>
                                </div>
                                <div className='icon-block-down'>
                                    <div className='icon-block'>
                                        <div className='icon'>
                                            <img className='img' src={require('../../../assets/icon4-medical-test.png').default} />
                                        </div>
                                        <Link to='/introduction-articles?name=medical' style={{ textDecoration: 'none', color: 'inherit', }}>
                                            <div className='text'><FormattedMessage id="home-header.medical-test" /></div>
                                        </Link>
                                    </div>
                                    <div className='icon-block'>
                                        <div className='icon'>
                                            <img className='img' src={require('../../../assets/icon5-mental-health.png').default} />
                                        </div>
                                        <Link to='/introduction-articles?name=mental' style={{ textDecoration: 'none', color: 'inherit', }}>
                                            <div className='text'><FormattedMessage id="home-header.mental-health" /></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='content-up'>
                                <div className='icon-block'>
                                    <div className='icon'>
                                        <img className='img' src={require('../../../assets/icon1-specialist-examination.png').default} />
                                    </div>
                                    <Link to='/introduction-articles?name=specialist' style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <div className='text'><FormattedMessage id="home-header.specialist-exam" /></div>
                                    </Link>
                                </div>
                                <div className='icon-block'>
                                    <div className='icon'>
                                        <img className='img' src={require('../../../assets/icon2-remote-examination.png').default} />
                                    </div>
                                    <Link to='/introduction-articles?name=remote' style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <div className='text'><FormattedMessage id="home-header.remote-exam" /></div>
                                    </Link>
                                </div>
                                <div className='icon-block'>
                                    <div className='icon'>
                                        <img className='img' src={require('../../../assets/icon3-general-examination.png').default} />
                                    </div>
                                    <Link to='/introduction-articles?name=general' style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <div className='text'><FormattedMessage id="home-header.general-exam" /></div>
                                    </Link>
                                </div>
                                <div className='icon-block'>
                                    <div className='icon'>
                                        <img className='img' src={require('../../../assets/icon4-medical-test.png').default} />
                                    </div>
                                    <Link to='/introduction-articles?name=medical' style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <div className='text'><FormattedMessage id="home-header.medical-test" /></div>
                                    </Link>
                                </div>
                                <div className='icon-block'>
                                    <div className='icon'>
                                        <img className='img' src={require('../../../assets/icon5-mental-health.png').default} />
                                    </div>
                                    <Link to='/introduction-articles?name=mental' style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <div className='text'><FormattedMessage id="home-header.mental-health" /></div>
                                    </Link>
                                </div>
                            </div>
                        }

                        <div className='content-down'>
                            <h1 className={!isMobile ? 'title1' : 'title1-mobile'}>
                                <FormattedMessage id="home-header.medical-background" />
                            </h1>
                            <h1 className={!isMobile ? 'title2' : 'title2-mobile'}>
                                <FormattedMessage id="home-header.comprehensive" />
                            </h1>
                            <div className='condow-ads'><FormattedMessage id="home-header.ads" /></div>
                            <div className={!isMobile ? 'search' : 'search-mobile'}>
                                <i className="fas fa-search"></i>
                                {/* <input
                                    className='search-box'
                                    type='text'
                                    placeholder={language === LANGUAGE.EN ? 'Find a doctor' : 'Trouver un médecin'} /> */}
                                <Select
                                    className='content-down-select-doctors'
                                    value={selectedDoctor}
                                    onChange={(selectedValue) => this.handleChangeSelect('selectedDoctor', selectedValue)}
                                    options={optionsListDoctor}
                                    name='selectedDoctor'
                                    placeholder={language === LANGUAGE.EN ? 'Find a doctor' : 'Trouver un médecin'}
                                />

                            </div>
                        </div>

                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
