import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorProfile.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getDoctorDetail } from '../../../services/userService'
import moment from 'moment';


class DoctorProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: {}
        }
    }
    async componentDidMount() {
        let data = await this.getDoctorData(this.props.doctorIdFromParent)
        this.setState({
            profileData: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let data = await this.getDoctorData(this.props.doctorIdFromParent)
            this.setState({
                profileData: data
            })
        }
    }
    getDoctorData = async (id) => {
        let result = {};
        if (id) {
            let res = await getDoctorDetail(id)
            if (res?.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    render() {
        let { profileData } = this.state
        let language = this.props.language
        // console.log('=========check state from DoctorProfile:', this.state)
        let isDescription = this.props.isDoctorDescription

        return (
            <div className='doctor-profile-container'>
                <div className='doctor-info'>
                    <div className='docPro-left-content'>
                        {profileData?.image &&
                            <img className='doctor-avatar'
                                src={CommonUtils.convertBase64ToBinary(profileData.image)} />
                        }
                    </div>

                    <div className='docPro-right-content'>
                        <div className='up'>
                            {language === LANGUAGE.EN
                                ? profileData?.positionData?.valueEn &&
                                profileData?.firstName &&
                                profileData?.lastName &&
                                `${profileData.positionData.valueEn} ${profileData.firstName} ${profileData.lastName}`
                                : profileData?.positionData?.valueFr &&
                                profileData?.firstName &&
                                profileData?.lastName &&
                                `${profileData.positionData.valueFr} ${profileData.lastName} ${profileData.firstName}`
                            }
                        </div>
                        {isDescription === true
                            ?
                            <div className='down-description'>
                                {profileData.Markdown?.descriptionEn && profileData.Markdown?.descriptionFr &&
                                    (language === LANGUAGE.EN ? profileData.Markdown.descriptionEn : profileData.Markdown.descriptionFr)}
                            </div>
                            :
                            <div className='down-date-time'>
                                {language === LANGUAGE.EN
                                    ? this.props?.dataTimeParent?.timeTypeData?.valueEn ? this.props.dataTimeParent.timeTypeData.valueEn : ''
                                    : this.props?.dataTimeParent?.timeTypeData?.valueFr ? this.props.dataTimeParent.timeTypeData.valueFr : ''
                                } -&nbsp;
                                {language === LANGUAGE.FR
                                    ?
                                    this.props?.dataTimeParent?.date ?
                                        moment.unix(+this.props.dataTimeParent.date / 1000).locale('fr').format('ddd - DD/MM/YYYY') : ''
                                    :
                                    this.props?.dataTimeParent?.date ?
                                        moment.unix(+this.props.dataTimeParent.date / 1000).locale('en').format('ddd-MM/DD/YYYY') : ''
                                }<br />
                                <FormattedMessage id='patient.booking-modal.free-booking' />
                            </div>
                        }
                    </div>

                </div>
                <div className='price'>
                    <FormattedMessage id='patient.booking-modal.price' />
                    {language === LANGUAGE.EN
                        ? profileData?.Doctor_Info?.priceTypeData?.valueEn ? `${profileData.Doctor_Info.priceTypeData.valueEn}` : ''
                        : profileData?.Doctor_Info?.priceTypeData?.valueFr ? CommonUtils.numberFormat(profileData.Doctor_Info.priceTypeData.valueFr, ' EUR', 70) : ''
                    }
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
