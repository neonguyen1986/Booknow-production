import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardiology from '../../../../assets/img-specialty/1. cardiology.jpg'
import { getAllSpecialty } from '../../../../services/userService';
import { collapseToast } from 'react-toastify';
import { CommonUtils, path, LANGUAGE } from '../../../../utils';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect'


class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allSpecialties: ''
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        console.log('>>>check data', res)
        if (res?.data?.length > 0) {
            this.setState({
                allSpecialties: res.data
            })
        }
    }



    render() {
        let { allSpecialties } = this.state;
        // console.log('>>>>>check state from Specialty:', this.state)
        let language = this.props.language
        return (
            <>
                <div className='fit-height-width'>
                    <div className='section-shared container'>
                        <div className={!isMobile ? 'section-container-specialty' : 'section-container-specialty mobile'}>
                            <div className='section-header'>
                                <div className={!isMobile ? 'section-title' : 'section-title-mobile'}>
                                    <b><FormattedMessage id='home-page.Specialties' /></b>
                                    <FormattedMessage id='home-page.home-specialties' />
                                </div>

                                <button>
                                    <Link to={path.SPECIALTY_MORE} style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <FormattedMessage id='home-page.more-info' />
                                    </Link>
                                </button>

                            </div>
                            <div className='section-body'>
                                <Slider {...this.props.settings}>
                                    {allSpecialties?.length > 0 &&
                                        allSpecialties.map((item, index) => {
                                            return (
                                                // <Link to='/home' style={{ textDecoration: 'none', color: 'inherit', }}></Link>

                                                <div key={index} className='specialties-img-customize'>
                                                    <Link to={`/detail-specialty/${item.id}/ALL`} style={{ textDecoration: 'none', color: 'inherit', }}>
                                                        <div className='tempdiv'>
                                                            <img className={!isMobile ? 'image-specialty' : 'image-specialty-mobile'} src={item.image} />
                                                        </div>
                                                    </Link>
                                                    <Link to={`/detail-specialty/${item.id}/ALL`} style={{ textDecoration: 'none', color: 'inherit', }}>
                                                        <div className={!isMobile ? 'specialty-text' : 'specialty-text-mobile'}>
                                                            {language === LANGUAGE.EN ? item.nameEn : item.nameFr}
                                                        </div>
                                                    </Link>

                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
