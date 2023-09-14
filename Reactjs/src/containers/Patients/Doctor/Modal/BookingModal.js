import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { LANGUAGE, CommonUtils } from '../../../../utils'
import { FormattedMessage } from 'react-intl';
// import { Modal } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import DoctorProfile from '../DoctorProfile';
import _ from 'lodash'
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';




class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            timeType: '',

            selectedGender: '',
            timeBooked: '',
            dateBooked: '',
            doctorName: '',
        }
    }
    async componentDidMount() {
        await this.props.fetchGender()
        if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
            this.getStateFromProps()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.gendersRedux !== prevProps.gendersRedux) {
            this.setState({
                genders: this.props.gendersRedux,
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                this.getStateFromProps()
            }
        }
    }
    getStateFromProps = () => {
        this.setState({
            doctorId: this.props.dataTime.doctorId,
            timeType: this.props.dataTime.timeType,
            timeBooked: this.props.dataTime.timeTypeData,
            dateBooked: this.props.dataTime.date,
            doctorName: this.props.dataTime.fullName,
        })
    }
    toggleModal = () => {
        this.props.toggleModalParent()
    };

    onChangeInput = (e) => {
        let stateCopy = { ...this.state };
        stateCopy[e.target.name] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    buildDataSelect = (arrInput, type) => {
        let language = this.props.language;
        let result = [];
        if (arrInput?.length > 0) {
            for (let i = 0; i < arrInput.length; i++) {
                let tempArr = arrInput[i]
                if (language === LANGUAGE.EN) {
                    result.push({
                        value: type === 'USER' ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.firstName} ${tempArr.lastName}` :
                            type === 'PRICE' ? `${tempArr.valueEn} USD` : tempArr.valueEn

                    })
                } else {
                    result.push({
                        value: type === 'USER' ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.lastName} ${tempArr.firstName}` : tempArr.valueFr
                    })
                }
            }
        }
        return result
    }
    handleChangeListGender = async (selectedGender) => {
        this.setState({ selectedGender })
    };


    handleConfirmBooking = async () => {
        this.toggleModal();
        let language = this.props.language
        // let datebookedENVI = language === LANGUAGE.FR
        //     ? moment.unix(+this.state.dateBooked / 1000).format('ddd - DD/MM/YYYY')
        //     : moment.unix(+this.state.dateBooked / 1000).locale('en').format('ddd-MM/DD/YYYY')
        let timeBookedENVI = language === LANGUAGE.FR
            ? this.state.timeBooked.valueFr
            : this.state.timeBooked.valueEn
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthday: CommonUtils.convertToTimestamp(this.state.birthday),
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            selectedGender: this.state.selectedGender.value,
            timeBooked: timeBookedENVI,
            dateBooked: this.state.dateBooked,
            doctorName: this.state.doctorName,
            language: this.props.language,
        })
        if (res && res.errCode === 0) {
            toast.success('Booking new appointment success')
        } else {
            toast.warning(res.errMessage)
        }
    }
    render() {
        let { dataTime } = this.props
        let language = this.props.language
        // console.log('check modal dataTime', this.props)
        let dataTimeParent = dataTime && !_.isEmpty(dataTime) ? dataTime : {}
        let optionsListGender = this.buildDataSelect(this.state.genders)

        let { fullName,
            phoneNumber,
            email,
            address,
            reason,
            birthday,
            doctorId } = this.state
        // console.log('=====check state Booking Modal:', this.state)
        return (
            <div>
                {/* <Button color="primary" onClick={this.toggleModal}>
                    Open Modal
                </Button> */}
                <Modal isOpen={this.props.isOpenParent}
                    centered size='lg'>
                    <ModalHeader toggle={this.toggleModal}>
                        Booking a test
                    </ModalHeader>
                    <ModalBody>
                        <Col md={12}>
                            <DoctorProfile
                                dataTimeParent={dataTimeParent}
                                doctorIdFromParent={dataTimeParent.doctorId}
                                isDoctorDescription={false}
                            />
                        </Col>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">
                                        <FormattedMessage id='patient.booking-modal.name' />
                                    </Label>
                                    <Input type="text" id="name"
                                        value={fullName}
                                        name='fullName'
                                        onChange={(e) => this.onChangeInput(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="phoneNumber">
                                        <FormattedMessage id='patient.booking-modal.phone-number' />
                                    </Label>
                                    <Input type="text" id="phoneNumber"
                                        value={phoneNumber}
                                        name='phoneNumber'
                                        onChange={(e) => this.onChangeInput(e)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" id="email"
                                        // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                        value={email}
                                        name='email'
                                        onChange={(e) => this.onChangeInput(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="address">
                                        <FormattedMessage id='patient.booking-modal.address' />
                                    </Label>
                                    <Input type="text" id="address"
                                        value={address}
                                        name='address'
                                        onChange={(e) => this.onChangeInput(e)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="dob">
                                        <FormattedMessage id='patient.booking-modal.date-of-birth' />
                                    </Label>
                                    <Input type="date" id="dob"
                                        value={birthday}
                                        name='birthday'
                                        onChange={(e) => this.onChangeInput(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="gender">
                                        <FormattedMessage id='patient.booking-modal.gender' />
                                    </Label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeListGender}
                                        options={optionsListGender}
                                        id='gender-select'
                                        placeholde='Select...'
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor-place-holder' />}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="location">
                                        <FormattedMessage id='patient.booking-modal.test-type' />
                                    </Label>
                                    <Input type="text" id="location"
                                        value={reason}
                                        name='reason'
                                        onChange={(e) => this.onChangeInput(e)} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger"
                            onClick={() => this.handleConfirmBooking()}
                        ><FormattedMessage id='patient.booking-modal.confirm' /></Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            <FormattedMessage id='patient.booking-modal.cancel' />
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gendersRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
