import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import './DoctorMoreInfo.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getDoctorMoreInfo } from '../../../services/userService';

import { NumericFormat } from 'react-number-format';




class DoctorMoreInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowPrice: '',
            doctorMoreInfo: {},
        }
    }
    async componentDidMount() {
        let res = await getDoctorMoreInfo(this.props.doctorIdFromParent)
        // console.log('check API:', res)
        if (res && res.errCode === 0)
            this.setState({
                doctorMoreInfo: res.data,
                isShowPrice: this.props.isShowPrice,
            })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getDoctorMoreInfo(this.props.doctorIdFromParent)
            // console.log('check API:', res)
            if (res && res.errCode === 0)
                this.setState({
                    doctorMoreInfo: res.data,
                    isShowPrice: this.props.isShowPrice,
                })
        }
    }
    handleShowHidePrice = (status) => {
        this.setState({
            isShowPrice: status
        })
    }
    render() {
        let { isShowPrice, doctorMoreInfo } = this.state;
        let language = this.props.language;
        // console.log('>>>>check state:', doctorMoreInfo);

        return (
            <div className='doctor-more-info-container'>

                <div className='up-content'>
                    <div className='address-title'><FormattedMessage id='patient.detail-doctor.clinic-address' /></div>
                    <div className='clinic-name'>{doctorMoreInfo?.nameClinic ? doctorMoreInfo.nameClinic : ''}</div>
                    <div className='clinic-address'>
                        {doctorMoreInfo?.addressClinic ? doctorMoreInfo.addressClinic : ''}- &nbsp;
                        {language === LANGUAGE.EN
                            ? doctorMoreInfo?.provinceTypeData?.valueEn ? doctorMoreInfo.provinceTypeData.valueEn : ''
                            : doctorMoreInfo?.provinceTypeData?.valueFr ? doctorMoreInfo.provinceTypeData.valueEn : ''
                        }
                    </div>
                </div>
                {isShowPrice === false
                    ?
                    <div className='price-show-hide'>
                        <FormattedMessage id='patient.detail-doctor.price' />
                        <span className='price'>

                            {language === LANGUAGE.EN
                                ? doctorMoreInfo?.priceTypeData?.valueEn ? `${doctorMoreInfo.priceTypeData.valueEn}` : ''
                                : doctorMoreInfo?.priceTypeData?.valueFr ? CommonUtils.numberFormat(doctorMoreInfo.priceTypeData.valueFr, ' EUR', 70) : ''
                            }
                        </span>
                        <span className='more-detail'
                            onClick={() => this.handleShowHidePrice(true)}
                        ><FormattedMessage id='patient.detail-doctor.more-detail' /></span>
                    </div>
                    :
                    <div className='down-content'>
                        <div className='price-title'><FormattedMessage id='patient.detail-doctor.price' /></div>
                        <div className='price-text'>
                            <span><b><FormattedMessage id='patient.detail-doctor.price' />:</b> <br />
                                <FormattedMessage id='patient.detail-doctor.price-text' />
                            </span>
                            <span>
                                {language === LANGUAGE.EN
                                    ? doctorMoreInfo?.priceTypeData?.valueEn ? `${doctorMoreInfo.priceTypeData.valueEn}` : ''
                                    : doctorMoreInfo?.priceTypeData?.valueFr ? CommonUtils.numberFormat(doctorMoreInfo.priceTypeData.valueFr, ' EUR', 70) : ''
                                }
                            </span>
                        </div>
                        <div className='note'><FormattedMessage id='patient.detail-doctor.payment-text' />
                            {language === LANGUAGE.EN
                                ? doctorMoreInfo?.paymentTypeData?.valueEn ? doctorMoreInfo.paymentTypeData.valueEn : ''
                                : doctorMoreInfo?.paymentTypeData?.valueFr ? doctorMoreInfo.paymentTypeData.valueFr : ''
                            }</div>
                        <div className='show-hide'
                            onClick={() => this.handleShowHidePrice(false)}
                        ><FormattedMessage id='patient.detail-doctor.hide' /></div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMoreInfo);
