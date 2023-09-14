import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import './DoctorSchedule.scss'
import { getDoctorScheduleInfo } from '../../../services/userService'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getDoctorScheduleByDate } from '../../../services/userService'
import BookingModal from './Modal/BookingModal';
import 'moment/locale/fr';

//moment to dispay Vi
import moment from 'moment';
import { isMobile } from 'react-device-detect';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: '',
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setDateLanguage = () => {
        // console.log('moment in Fr', moment(new Date()).locale('fr').format('dddd-DD/MM'))
        // console.log('moment in En', moment(new Date()).locale('en').format('ddd-DD/MM'))

        let allDays = []
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (i !== 0) {
                if (this.props.language === LANGUAGE.FR) {
                    let labelFr = moment(new Date()).add(i, 'days').locale('fr').format('ddd-DD/MM')
                    obj.label = this.capitalizeFirstLetter(labelFr)

                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')
                }
            } else {
                if (this.props.language === LANGUAGE.FR) {
                    obj.label = `Aujourd'hui-${moment(new Date()).add(i, 'days').format('DD/MM')}`
                } else {
                    obj.label = `Today-${moment(new Date()).add(i, 'days').format('DD/MM')}`
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            //valueOf sẽ giúp convert milisecond sang unix Timestamp

            allDays.push(obj)
        }
        // console.log('arrDate:', allDays)
        this.setState({
            allDays: allDays,
        })
    }


    componentDidMount() {
        this.setDateLanguage()
        this.setAllAvailableTime()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setDateLanguage()
        }

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            this.setAllAvailableTime()
        }
    }
    setAllAvailableTime = async () => {
        let curDate = moment(new Date()).add(0, 'days').startOf('day').valueOf();
        let doctorId = this.props.doctorIdFromParent;
        // console.log('curDate, doctorId', curDate, doctorId)
        let res = await getDoctorScheduleByDate(doctorId, curDate)
        // console.log('>>>>>check res:', res)
        if (res && res.errCode === 0) {
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props?.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value
            // console.log('>>>check date', date)
            let res = await getDoctorScheduleByDate(doctorId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            // console.log('>>>>>>>check DB', res)
        }
    }

    toggleModalParent = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking
        })
    }
    handleOnClickTimeSchedule = (time) => {
        this.toggleModalParent()
        this.setState({
            dataScheduleTimeModal: time
        })
    }

    //===============================render=================================

    render() {
        let { allDays, allAvailableTime } = this.state
        let language = this.props.language
        // console.log('>>>check state DoctorSchedule:', this.state)

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(e) => this.handleOnChangeSelect(e)}
                        >
                            {allDays?.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}

                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='calender-text'>
                            <span>
                                <i className='fas fa-calendar-alt'>
                                    <FormattedMessage id='patient.detail-doctor.calendar' />
                                </i>
                            </span>
                        </div>
                        <div className='time-pick-conainer'>
                            <div className='time-pick'>
                                {allAvailableTime?.length > 0
                                    ?
                                    <>
                                        {allAvailableTime.map((item, index) => {
                                            let time = '';
                                            if (item?.timeTypeData?.valueEn && item?.timeTypeData?.valueFr) {
                                                time = language === LANGUAGE.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueFr
                                            }
                                            return (
                                                <button key={index}
                                                    onClick={() => this.handleOnClickTimeSchedule(item)}
                                                    className={!isMobile ? 'schedule-button' : 'schedule-button mobile'}
                                                >{time}</button>
                                            )
                                        })}
                                    </>
                                    :
                                    <div>
                                        <FormattedMessage id='patient.detail-doctor.doctor-avai' />
                                    </div>

                                }
                            </div>
                            <div className='free-booking'>
                                <FormattedMessage id='patient.detail-doctor.free-booking' />
                                <i className='far fa-hand-point-up'></i>
                            </div>
                        </div>
                    </div>
                </div>
                <BookingModal
                    toggleModalParent={this.toggleModalParent}
                    isOpenParent={this.state.isOpenModalBooking}
                    dataTime={this.state.dataScheduleTimeModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
