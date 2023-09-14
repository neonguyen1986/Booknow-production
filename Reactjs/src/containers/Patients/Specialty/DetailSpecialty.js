import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import DoctorProfile from '../Doctor/DoctorProfile';
import DoctorMoreInfo from '../Doctor/DoctorMoreInfo';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import { getDetailSpecialtyIdLocation, getAllCodeService } from '../../../services/userService'
import ReactMarkdown from 'react-markdown';
import _ from 'lodash'
import HomeFooter from '../../Auth/HomePage/HomeFooter';
import { isMobile } from 'react-device-detect';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorsBySpecialty: '',
            descriptionEn: '',
            descriptionFr: '',
            getAllProvince: '',
            selectedProvince: '',
            isAllProvince: true,
        }
    }
    async componentDidMount() {
        let getParams = await this.props.match.params
        // console.log('===========check params:', getParams)
        let res = await getDetailSpecialtyIdLocation(getParams.id, getParams.locationId)
        // console.log('===========check data:', res)
        if (res?.errCode === 0) {
            this.setState({
                descriptionEn: res.data[0].descriptionMarkdown_En,
                descriptionFr: res.data[0].descriptionMarkdown_Fr,
                doctorsBySpecialty: res.data[1],
            })
        }

        let resAllCode = await getAllCodeService('PROVINCE')
        // console.log('===========check resAllCode:', resAllCode)
        if (resAllCode.errCode === 0) {
            this.setState({
                getAllProvince: resAllCode.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeProvince = async (e) => {
        let getParams = await this.props.match.params
        let provinceENFR = e.target.value;
        let getAllProvince = this.state.getAllProvince
        let curProvinceId = ''
        for (let i = 0; i < getAllProvince.length; i++) {
            if (getAllProvince[i].valueEn === provinceENFR || getAllProvince[i].valueFr === provinceENFR) {
                curProvinceId = getAllProvince[i].keyMap;
                break;
            }
        }
        if (curProvinceId !== '' && !_.isEmpty(curProvinceId)) {
            let res = await getDetailSpecialtyIdLocation(getParams.id, curProvinceId)
            if (res?.errCode === 0) {
                this.setState({
                    doctorsBySpecialty: res.data[1],
                })
            }
        }
        if (e.target.value === 'All Provinces' || e.target.value === 'Toutes les provinces') {
            let res = await getDetailSpecialtyIdLocation(getParams.id, getParams.locationId)
            if (res?.errCode === 0) {
                this.setState({
                    doctorsBySpecialty: res.data[1],
                })
            }
        }
    }
    render() {
        let language = this.props.language
        let { descriptionEn, descriptionFr, doctorsBySpecialty, getAllProvince } = this.state;
        // console.log('>>>>>>>>check state Detail Specialty:', this.state)
        return (
            <div className='detail-secialty-all-container'>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='detail-specialty-description'>
                    <ReactMarkdown>{language === LANGUAGE.EN ? descriptionEn : descriptionFr}</ReactMarkdown>
                </div>
                <div className='detail-specialty-select-province'>
                    <label><FormattedMessage id='home-page.detail-specialty.filter' /> </label>
                    <select
                        className={!isMobile ? 'detSpec-select' : 'detSpec-select mobile'}
                        onChange={(e) => this.handleOnChangeProvince(e)}
                    >
                        <option>{language === LANGUAGE.EN ? 'All Provinces' : 'Toutes les provinces'}</option>
                        {getAllProvince?.length > 0 &&
                            getAllProvince.map((item, index) => {
                                return (
                                    <option key={index} keyMap={item.Keymap}>
                                        {language === LANGUAGE.EN ? item.valueEn : item.valueFr}
                                    </option>
                                )
                            })
                        }

                    </select>
                </div>
                <div className='detail-specialty-container'>
                    {doctorsBySpecialty?.length > 0 &&
                        doctorsBySpecialty.map((item, index) => {
                            return (
                                <div className={!isMobile ? 'detSpec-content' : 'detSpec-content-mobile'} key={index}>
                                    <span className='detSpec-left'>
                                        <DoctorProfile
                                            doctorIdFromParent={item.doctorId}
                                            isDoctorDescription={true}
                                        />
                                    </span>
                                    <span className='detSpec-right'>
                                        <div className='detSpec-right-top'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item.doctorId} />
                                        </div>
                                        <div className='detSpec-right-bottom'>
                                            <DoctorMoreInfo
                                                doctorIdFromParent={item.doctorId}
                                                isShowPrice={false} />
                                        </div>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
