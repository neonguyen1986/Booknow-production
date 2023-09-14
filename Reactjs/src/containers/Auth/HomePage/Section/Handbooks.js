import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import handbook1 from '../../../../assets/img-handbooks/huyetap.jpg'


class Handbooks extends Component {

    render() {

        return (
            <>
                <div className='fit-height-width'>
                    <div className='section-shared handbooks'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <div className='section-title'>Handbooks</div>
                                <button>VIEW MORE...</button>
                            </div>
                            <div className='section-body'>
                                <Slider {...this.props.settings}>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={handbook1} /></div>
                                        <div>hungviet/khoa tim mạch</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={handbook1} /></div>
                                        <div>medlatec/khoa tiêu hóa</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={handbook1} /></div>
                                        <div>choray/nhi khoa</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={handbook1} /></div>
                                        <div>quandoi/khoa tai mũi họng</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={handbook1} /></div>
                                        <div>spine-department/khoa cột sống</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={handbook1} /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbooks)

