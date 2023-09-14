import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import choray from '../../../../assets/img-health-facilities/choray.jpg'
import hungviet from '../../../../assets/img-health-facilities/hungviet.jpg'
import medlatec from '../../../../assets/img-health-facilities/medlatec.png'
import quandoi from '../../../../assets/img-health-facilities/quandoi.jpg'
import vietduc from '../../../../assets/img-health-facilities/vietduc.jpg'
import yduoc from '../../../../assets/img-health-facilities/yduoc.jpg'

class MedicalFacility extends Component {

    render() {

        return (
            <>
                <div className='fit-height-width'>
                    <div className='section-shared medical-facility-section'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <div className='section-title'>Medical Facilities</div>
                                <button>VIEW MORE...</button>
                            </div>
                            <div className='section-body'>
                                <Slider {...this.props.settings}>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={hungviet} /></div>
                                        <div>hungviet/khoa tim mạch</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={medlatec} /></div>
                                        <div>medlatec/khoa tiêu hóa</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={choray} /></div>
                                        <div>choray/nhi khoa</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={quandoi} /></div>
                                        <div>quandoi/khoa tai mũi họng</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={vietduc} /></div>
                                        <div>spine-department/khoa cột sống</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={yduoc} /></div>
                                        <div>yduoc/phụ khoa</div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)

