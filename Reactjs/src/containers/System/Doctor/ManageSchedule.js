import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss'
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGE, dateFormat, CommonUtils, USER_ROLE } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import _ from 'lodash'
import moment from 'moment';
import { collapseToast, toast } from 'react-toastify';
import { saveBulkScheduleDoctor, getDoctorScheduleByDate } from '../../../services/userService'
// import 'moment-timezone'
import 'moment/locale/fr'; // Import the French locale

// Set the locale globally
moment.locale('fr');


class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: '',
            currentDate: '',
            timeRange: [],
            doctorSchedule: '',
        }
    }

    async componentDidMount() {
        await this.props.fetchAllDoctorsRedux();
        await this.props.fetchAllcodeTimeStart();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                listDoctors: this.props.allDoctorsRedux,
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data?.length > 0) {
                data.map(item => {
                    item.isSelected = false
                })
            }
            // console.log('check time range,', data)
            this.setState({
                timeRange: data
            })
        }
        if (prevState.selectedDoctor !== this.state.selectedDoctor && this.state.selectedDoctor !== '') {
            this.displayCurrentDoctorSchedule()
        }
    }
    //Display current Doctor Schedule
    displayCurrentDoctorSchedule = async () => {
        let arrDateTime = []
        let language = this.props.language;
        let id = this.state.selectedDoctor.value;
        for (let i = 0; i < 7; i++) {
            let curDate = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            let curTime = await getDoctorScheduleByDate(id, curDate)

            if (curTime.data?.length > 0) {
                curTime.data.map(item => {
                    arrDateTime.push({
                        date: curDate,
                        time: language === LANGUAGE.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueFr
                    })
                })
            }
        }

        let curDateForTable = []
        for (let i = 0; i < 7; i++) {
            curDateForTable.push(moment(new Date()).add(i, 'days').startOf('day').valueOf())
        }
        let arrResult =
            [{ date: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', time7: '', time8: '', },
            { date: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', time7: '', time8: '', },
            { date: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', time7: '', time8: '', },
            { date: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', time7: '', time8: '', },
            { date: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', time7: '', time8: '', },
            { date: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', time7: '', time8: '', },
            { date: '', time1: '', time2: '', time3: '', time4: '', time5: '', time6: '', time7: '', time8: '', }]
        for (let i = 0; i < 7; i++) {
            if (arrDateTime?.length > 0) {
                arrDateTime.map(item => {
                    if (item.date === curDateForTable[i] && (item.time === '8:00 AM - 9:00 AM' || item.time === '8h00 - 9h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time1 = item.time;
                    }
                    if (item.date === curDateForTable[i] && (item.time === '9:00 AM - 10:00 AM' || item.time === '9h00 - 10h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time2 = item.time;
                    }
                    if (item.date === curDateForTable[i] && (item.time === '10:00 AM - 11:00 AM' || item.time === '10h00 - 11h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time3 = item.time;
                    }
                    if (item.date === curDateForTable[i] && (item.time === '11:00 AM - 12:00 PM' || item.time === '11h00 - 12h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time4 = item.time;
                    }
                    if (item.date === curDateForTable[i] && (item.time === '1:00 PM - 2:00 PM' || item.time === '13h00 - 14h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time5 = item.time;
                    }
                    if (item.date === curDateForTable[i] && (item.time === '2:00 PM - 3:00 PM' || item.time === '14h00 - 15h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time6 = item.time;
                    }
                    if (item.date === curDateForTable[i] && (item.time === '3:00 PM - 4:00 PM' || item.time === '15h00 - 16h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time7 = item.time;
                    }
                    if (item.date === curDateForTable[i] && (item.time === '4:00 PM - 5:00 PM' || item.time === '16h00 - 17h00')) {
                        arrResult[i].date = item.date;
                        arrResult[i].time8 = item.time;
                    }
                })
            }
        }
        console.log('------------arrDate,', arrResult)
        this.setState({
            doctorSchedule: arrResult,
        })
    }
    //================SELECT==============
    buildDataSelect = (arrInput) => {
        let result = [];
        if (arrInput?.length > 0) {
            for (let i = 0; i < arrInput.length; i++) {
                let tempArr = arrInput[i]
                result.push({
                    value: tempArr.id,
                    label: `${tempArr.firstName} ${tempArr.lastName}`
                })
            }
        }
        return result
    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    };
    //====================================
    handleOnChangeDatePicker = (date) => {
        let curDate = new Date().getTime();
        const millisecondsInOneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const next7Date = curDate + 6 * millisecondsInOneDay; // Add 7 days

        let pickedDate = new Date(date[0]).getTime();

        if (pickedDate < next7Date) {
            this.setState({
                currentDate: date[0],
            })
        }
        if (pickedDate >= next7Date) {
            this.setState({
                currentDate: { 0: '' },
            })
            toast.warning(`Schedule only available until ${moment(new Date()).add(6, 'days').locale('en').format('MMM DD YYYY')}`)
        }
    }
    handleClickTime = (itemInput) => {
        let tempTimeRange = this.state.timeRange
        if (tempTimeRange?.length > 0) {
            tempTimeRange.map(item => {
                if (item.keyMap === itemInput.keyMap) {
                    item.isSelected = !itemInput.isSelected
                }
            })
        }
        this.setState({
            timeRange: tempTimeRange
        })
        // console.log('check after click:', this.state.timeRange.isSelected)
    }

    handleSaveSchedule = async () => {
        let { timeRange, selectedDoctor, currentDate } = this.state;
        console.log('>>>>>>>>>check state ManageSchedule:', this.state)
        let result = [];
        if (!currentDate) {
            toast.warning('Invalid Date')
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.warning('Please select Doctor')
            return;
        }
        let formatedDate = new Date(currentDate).getTime();

        if (timeRange?.length > 0) {
            let selectedTime = timeRange.filter(item => item.isSelected === true)
            if (selectedTime?.length > 0) {
                selectedTime.map(schedule => {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formatedDate;
                    obj.timeType = schedule.keyMap;
                    result.push(obj);
                })
            } else {
                toast.warning('Please select Time');
                return;
            }
        }
        // console.log('check result:', result)

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate,
        })
        if (res?.errCode === 0) {
            toast.success('Schedules are added')
            this.displayCurrentDoctorSchedule()
        } else {
            toast.warning('error in saveBulkScheduleDoctor')
            console.log('error in saveBulkScheduleDoctor>>>res', res)
        }

    }
    render() {
        let options = ''
        if (CommonUtils.getIdOrRoleFromToken(this.props.userInfo.accessToken, 'role') === USER_ROLE.ADMIN) {
            options = this.buildDataSelect(this.state.listDoctors)
        } else {
            let curDoctor = [{
                value: CommonUtils.getIdOrRoleFromToken(this.props.userInfo.accessToken, 'id'),
                label: `${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`
            }]
            options = curDoctor
        }
        // console.log('>>>check state Manage Schedule:', this.state)
        let { timeRange } = this.state
        let language = this.props.language

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { doctorSchedule } = this.state;
        let currentItems = []

        // GET 7 DAYS FOR TABLE
        let curDateForTable = []
        for (let i = 0; i < 7; i++) {
            curDateForTable.push(moment(new Date()).add(i, 'days').startOf('day').valueOf())
        }
        console.log('================check state schedule', this.state)

        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='ms-title title' >
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={options} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>

                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control choose-date'
                                    value={this.state.currentDate}
                                    selected={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 hour-pic-container'>
                                {timeRange?.length > 0 &&
                                    timeRange.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn-schedule active' : 'btn-schedule'}
                                                key={index}
                                                onClick={() => this.handleClickTime(item)}
                                            >
                                                {language === LANGUAGE.EN
                                                    ? item.valueEn
                                                    : item.valueFr}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-secondary'
                                    onClick={() => this.handleSaveSchedule()}>
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='manage-schedule-table container'>
                    <table id="TableManageUser">
                        <thead>
                            <tr>
                                <th style={{ width: '5.5rem' }}>Date</th>
                                <th colspan='8' style={{ textAlign: 'center' }}>{language === LANGUAGE.EN ? 'Time' : 'Temps'}</th>
                            </tr>
                        </thead>
                        <tbody className='mstc-body'>
                            {doctorSchedule?.length > 0 &&
                                doctorSchedule.map((item, index) => {
                                    return (

                                        <tr key={index}>
                                            <td style={{ width: '5.5rem' }}>{language === LANGUAGE.EN
                                                ? moment.unix(+curDateForTable[index] / 1000).locale('en').format('ddd DD/MM')
                                                : moment.unix(+curDateForTable[index] / 1000).locale('fr').format('ddd DD/MM')
                                            }</td>
                                            <td>{item.time1}</td>
                                            <td>{item.time2}</td>
                                            <td>{item.time3}</td>
                                            <td>{item.time4}</td>
                                            <td>{item.time5}</td>
                                            <td>{item.time6}</td>
                                            <td>{item.time7}</td>
                                            <td>{item.time8}</td>
                                        </tr>

                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeTimeStart: () => dispatch(actions.fetchAllcodeTimeStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
