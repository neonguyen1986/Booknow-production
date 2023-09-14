import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../../store/actions'
import { LANGUAGE, CommonUtils, path } from '../../../../utils'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect'


class OutstandingDoctors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }


    handleViewDetailDoctor = (doctor) => {
        console.log('doctor info:', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let language = this.props.language;
        // console.log('check topDoctorsRedux:', this.state)
        return (
            <>
                <div className='fit-height-width doctors'>
                    <div className='section-shared'>
                        <div className={!isMobile ? 'section-container-doctor container' : 'section-container-doctor container mobile'}>
                            <div className='section-header'>
                                <div className={!isMobile ? 'section-title' : 'section-title-mobile'}>
                                    <b><FormattedMessage id='home-page.best-doctors' /></b>
                                    <FormattedMessage id='home-page.doctor-ads' />
                                </div>

                                <button>
                                    <Link to={path.ALLDOCTORS} style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <FormattedMessage id='home-page.more-info' />
                                    </Link>
                                </button>
                            </div>
                            <div className='section-body'>
                                <Slider {...this.props.settings}>
                                    {arrDoctors?.length > 0 &&
                                        arrDoctors.map((item, index) => {
                                            let position = language === LANGUAGE.EN ? item.positionData.valueEn : item.positionData.valueFr
                                            let name = `${item.firstName} ${item.lastName} `
                                            // console.log('>>>image check;;;', item.image)
                                            return (
                                                <div className='img-customize-doctor' key={index}
                                                    onClick={() => this.handleViewDetailDoctor(item)}>
                                                    <div className='tempdiv'><img
                                                        className={!isMobile ? 'image' : 'image-mobile'} src={CommonUtils.convertBase64ToBinary(item.image)} /></div>
                                                    <div className={!isMobile ? 'title-name' : 'title-name-mobile'}>
                                                        <b>{position}</b>:<br /> {name}
                                                    </div>
                                                </div>
                                            )
                                        })}


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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctors));
