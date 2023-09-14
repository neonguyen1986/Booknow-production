import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorMorePage.scss'
import { getDetailSpecialtyIdLocation } from '../../../services/userService'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import DoctorProfile from './DoctorProfile';
import DoctorSchedule from './DoctorSchedule';
import DoctorMoreInfo from './DoctorMoreInfo';
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import HomeFooter from '../../Auth/HomePage/HomeFooter';
import { isMobile } from 'react-device-detect';



class DoctorMorePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDoctors: '',
            allSpecialties: '',
        }
    }
    async componentDidMount() {
        this.getDoctorsAllSpecialties();
    }

    getDoctorsAllSpecialties = async () => {
        let language = this.props.language
        let arrAllDoctors = [];
        let arrSpecialty = [];
        for (let i = 1; i <= 6; i++) {
            let res = await getDetailSpecialtyIdLocation(i, 'ALL')
            let doctorIdArr = res.data[1]
            if (doctorIdArr?.length > 0) {
                doctorIdArr.map(item => {
                    arrAllDoctors.push({
                        specialtyName: language === LANGUAGE.EN ? res.data[0].nameEn : res.data[0].nameFr,
                        doctorId: item.doctorId
                    })
                })
            }
            arrSpecialty.push({
                specialtyId: res.data[0].id,
                specialtyName: language === LANGUAGE.EN ? res.data[0].nameEn : res.data[0].nameFr,
            })
        }
        if (arrAllDoctors?.length > 0) this.setState({ allDoctors: arrAllDoctors })
        if (arrSpecialty?.length > 0) this.setState({ allSpecialties: arrSpecialty })
        // let res = await getDetailSpecialtyIdLocation(1, 'ALL')
        // console.log('=====check res:', res.data)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeSpecialty = async (e) => {
        if (e.target.value === 'All Specialties' || e.target.value === 'Toutes les spécialités') {
            this.getDoctorsAllSpecialties()
        } else {
            let language = this.props.language
            let arrAllDoctors = [];
            let curSpecialtyId = ''
            let { allSpecialties } = this.state;
            if (allSpecialties?.length > 0) {
                allSpecialties.map(item => {
                    if (item.specialtyName === e.target.value) {
                        curSpecialtyId = item.specialtyId
                    }
                })
            }
            console.log('=======check curSpec:', curSpecialtyId)
            if (curSpecialtyId) {
                let res = await getDetailSpecialtyIdLocation(curSpecialtyId, 'ALL')
                let doctorIdArr = res.data[1]
                if (doctorIdArr?.length > 0) {
                    doctorIdArr.map(item => {
                        arrAllDoctors.push({
                            specialtyName: language === LANGUAGE.EN ? res.data[0].nameEn : res.data[0].nameFr,
                            doctorId: item.doctorId
                        })
                    })
                }
                if (arrAllDoctors?.length > 0) this.setState({ allDoctors: arrAllDoctors })
            }
        }
    }

    render() {
        console.log('====check state DoctorMorePage:', this.state)
        let { allDoctors, allSpecialties } = this.state
        let language = this.props.language;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='all-doctors-container'>
                    <div className='all-doctors-select-specialty'>
                        <label><FormattedMessage id='home-page.all-doctors.specialty-filter' /> </label>
                        <select
                            className={!isMobile ? 'adss-select' : 'adss-select mobile'}
                            onChange={(e) => this.handleOnChangeSpecialty(e)}
                        >
                            <option>{language === LANGUAGE.EN ? 'All Specialties' : 'Toutes les spécialités'}</option>
                            {allSpecialties?.length > 0 &&
                                allSpecialties.map((item, index) => {
                                    return (
                                        <option key={index}>
                                            {item.specialtyName}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-doctors-content container'>
                        {allDoctors?.length > 0 &&
                            allDoctors.map((item, index) => {
                                return (
                                    <div className={!isMobile ? 'adc-content' : 'adc-content-mobile'} key={index}>
                                        <span className='adcc-left'>
                                            <DoctorProfile
                                                doctorIdFromParent={item.doctorId}
                                                isDoctorDescription={true}
                                            />
                                        </span>
                                        <span className='dadcc-right'>
                                            <div className='dadccr-top'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item.doctorId} />
                                            </div>
                                            <div className='dadccr-bottom'>
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
                </div >
                <HomeFooter />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMorePage);
