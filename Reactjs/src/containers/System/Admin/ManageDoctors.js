import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import { toast } from 'react-toastify';
import './ManageDoctors.scss'
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getDetailDoctorInfo, updateDoctorMardownService } from '../../../services/userService'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// const mdParser = new MarkdownIt(/* Markdown-it options */);

import Select from 'react-select';




class ManageDoctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            markdownContentEn: '',
            markdownContentFr: '',
            HTMLContentEn: '',
            HTMLContentFr: '',
            descriptionEn: '',
            descriptionFr: '',
            listDoctors: '',
            selectedDoctor: '',
            isNewDoctor: true,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
        }
    }
    async componentDidMount() {
        await this.props.fetchAllDoctorsRedux();
        await this.props.getRequiredDoctorInfo();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                listDoctors: this.props.allDoctorsRedux,
            })
        }
        if (prevProps.allDoctorInfoRequirement !== this.props.allDoctorInfoRequirement) {
            this.setState({
                listPrice: this.props.allDoctorInfoRequirement.resPrice,
                listPayment: this.props.allDoctorInfoRequirement.resPayment,
                listProvince: this.props.allDoctorInfoRequirement.resProvince,
                listSpecialty: this.props.allDoctorInfoRequirement.resSpecialty,
            })
            // console.log('check redux', this.props.allDoctorInfoRequirement)
        }
        //===Display doctor Markdown and doctor_info when Doctor is Selected
        if (prevState.selectedDoctor !== this.state.selectedDoctor && this.state.selectedDoctor !== '') {
            let id = this.state.selectedDoctor.value;
            let res = await getDetailDoctorInfo(id)
            console.log('??????res:', res)
            let data = res.data
            if (data?.Markdown || data?.Doctor_Info) {
                let tempSelectedPrice = {
                    value: data.Doctor_Info.priceId,
                    label: this.props.language === LANGUAGE.EN ? data.Doctor_Info.priceTypeData.valueEn : data.Doctor_Info.priceTypeData.valueFr
                }
                let tempSelectedPayment = {
                    value: data.Doctor_Info.paymentId,
                    label: this.props.language === LANGUAGE.EN ? data.Doctor_Info.paymentTypeData.valueEn : data.Doctor_Info.paymentTypeData.valueFr
                }
                let tempSelectedProvince = {
                    value: data.Doctor_Info.provinceId,
                    label: this.props.language === LANGUAGE.EN ? data.Doctor_Info.provinceTypeData.valueEn : data.Doctor_Info.provinceTypeData.valueFr
                }
                let tempselectedSpecialty = {
                    value: data.Doctor_Info.specialtyName.id,
                    label: this.props.language === LANGUAGE.EN ? data.Doctor_Info.specialtyName.nameEn : data.Doctor_Info.specialtyName.nameFr
                }

                this.setState({
                    descriptionEn: !data.Markdown.descriptionEn ? '' : data.Markdown.descriptionEn,
                    descriptionFr: !data.Markdown.descriptionFr ? '' : data.Markdown.descriptionFr,
                    markdownContentEn: !data.Markdown.markdownContentEn ? '' : data.Markdown.markdownContentEn,
                    markdownContentFr: !data.Markdown.markdownContentFr ? '' : data.Markdown.markdownContentFr,
                    HTMLContentEn: !data.Markdown.HTMLContentEn ? '' : data.Markdown.HTMLContentEn,
                    HTMLContentFr: !data.Markdown.HTMLContentFr ? '' : data.Markdown.HTMLContentFr,
                    selectedPrice: !tempSelectedPrice ? '' : tempSelectedPrice,
                    selectedPayment: !tempSelectedPayment ? '' : tempSelectedPayment,
                    selectedProvince: !tempSelectedProvince ? '' : tempSelectedProvince,
                    clinicName: !data.Doctor_Info.nameClinic ? '' : data.Doctor_Info.nameClinic,
                    clinicAddress: !data.Doctor_Info.addressClinic ? '' : data.Doctor_Info.addressClinic,
                    note: !data.Doctor_Info.note ? '' : data.Doctor_Info.note,
                    selectedSpecialty: !tempselectedSpecialty ? '' : tempselectedSpecialty,
                    isNewDoctor: false,
                })
            } else {
                this.setState({
                    descriptionEn: '',
                    descriptionFr: '',
                    markdownContentEn: '',
                    markdownContentFr: '',
                    HTMLContentEn: '',
                    HTMLContentFr: '',
                    selectedDoctor: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    clinicName: '',
                    clinicAddress: '',
                    note: '',
                    selectedSpecialty: '',

                    isNewDoctor: true,
                })
            }
            // console.log('>>>>check state:', this.state)
        }
    }

    //================= Markdown Editor=================
    mdParser = new MarkdownIt(/* Markdown-it options */);
    // Finish!
    handleEditorChangeEn = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            HTMLContentEn: html,
            markdownContentEn: text
        })
    }
    handleEditorChangeFr = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            HTMLContentFr: html,
            markdownContentFr: text
        })
    }
    //================= React Select=================
    // options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ];
    buildDataSelect = (arrInput, type) => {
        let language = this.props.language;
        let result = [];
        if (arrInput?.length > 0) {
            for (let i = 0; i < arrInput.length; i++) {
                let tempArr = arrInput[i]
                if (language === LANGUAGE.EN) {
                    result.push({
                        value: (type === 'USER' || type === 'SPECIALTY') ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.firstName} ${tempArr.lastName}` :
                            type === 'PRICE' ? `${tempArr.valueEn}` :
                                type === 'SPECIALTY' ? tempArr.nameEn :
                                    tempArr.valueEn

                    })
                } else {
                    result.push({
                        value: (type === 'USER' || type === 'SPECIALTY') ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.firstName} ${tempArr.lastName}` :
                            type === 'PRICE' ? `${tempArr.valueFr}` :
                                type === 'SPECIALTY' ? tempArr.nameFr :
                                    tempArr.valueFr
                    })
                }
            }
        }
        return result
    }

    handleChange = async (key, selectedValue) => {
        this.setState({ [key]: selectedValue });
        console.log('key, value:', key, selectedValue)
    };
    //================================================
    //=======================Change description, Clinic name, address, note=========================
    handleOnChangeText = (e, labelName) => {
        let copyState = { ...this.state }
        copyState[labelName] = e.target.value
        this.setState({
            [labelName]: copyState[labelName]
        })
    }

    handleSaveDoctorInfo = async () => {
        let res = await this.props.postDoctorsRedux({
            HTMLContentEn: this.state.HTMLContentEn,
            HTMLContentFr: this.state.HTMLContentFr,
            markdownContentEn: this.state.markdownContentEn,
            markdownContentFr: this.state.markdownContentFr,
            descriptionEn: this.state.descriptionEn,
            descriptionFr: this.state.descriptionFr,
            doctorId: this.state.selectedDoctor.value,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
        })
        // console.log('>>>>>>check state:', res)
        if (res?.errCode == 0) {
            toast.success("Doctor info's just added")
            this.setState({
                markdownContentEn: '',
                markdownContentFr: '',
                descriptionEn: '',
                descriptionFr: '',
                HTMLContentEn: '',
                HTMLContentFr: '',
                selectedDoctor: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                clinicName: '',
                clinicAddress: '',
                note: '',

                isNewDoctor: true,
            })
        } else {
            toast.warning(res.errMessage)
        }
    }

    handleCancelDoctorInfo = () => {
        this.setState({
            markdownContentEn: '',
            markdownContentFr: '',
            descriptionEn: '',
            descriptionFr: '',
            HTMLContentEn: '',
            HTMLContentFr: '',
            selectedDoctor: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            clinicName: '',
            clinicAddress: '',
            note: '',

            isNewDoctor: true,
        })
    }


    render() {
        let optionsListDoctor = this.buildDataSelect(this.state.listDoctors, 'USER')
        let optionsListPrice = this.buildDataSelect(this.state.listPrice, 'PRICE')
        let optionsListPayment = this.buildDataSelect(this.state.listPayment)
        let optionsListProvince = this.buildDataSelect(this.state.listProvince)
        let optionsListSpecialty = this.buildDataSelect(this.state.listSpecialty, 'SPECIALTY')
        let optionsListClinic = this.buildDataSelect(this.state.listClinic)
        let { isNewDoctor } = this.state
        let { selectedPrice,
            selectedPayment,
            selectedProvince,
            selectedSpecialty,
            clinicName,
            clinicAddress,
        } = this.state
        // console.log('>>check doctor', selectedPrice)
        // console.log('=======check state:', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title'>
                    <FormattedMessage id='admin.manage-doctor.doctor-title' />
                </div>
                <div className='doctor-info row' >
                    <div className='content-left col-6 form-group mr-5'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={(selectedValue) => this.handleChange('selectedDoctor', selectedValue)}
                            options={optionsListDoctor}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor-place-holder' />}
                        />
                    </div>
                    <div className='content-right col-6 form-group'>
                        <label> Doctor Biography in English</label>
                        <textarea className='form-control' rows='4'
                            onChange={(e) => this.handleOnChangeText(e, 'descriptionEn')}
                            value={this.state.descriptionEn}>
                        </textarea>
                    </div>
                    <div className='content-right col-6 form-group'>
                        <label>Biographie du docteur en français</label>
                        <textarea className='form-control' rows='4'
                            onChange={(e) => this.handleOnChangeText(e, 'descriptionFr')}
                            value={this.state.descriptionFr}>
                        </textarea>
                    </div>
                </div>
                <div className='doctor-add-more-info row'>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-price' /></label>

                        <Select
                            value={selectedPrice}
                            onChange={(selectedValue) => this.handleChange('selectedPrice', selectedValue)}
                            options={optionsListPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-payment' /></label>
                        <Select
                            value={selectedPayment}
                            onChange={(selectedValue) => this.handleChange('selectedPayment', selectedValue)}
                            // onChange={this.handleChangeSelect}
                            options={optionsListPayment}
                            name='selectedPayment'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-province' /></label>
                        <Select
                            value={selectedProvince}
                            onChange={(selectedValue) => this.handleChange('selectedProvince', selectedValue)}
                            options={optionsListProvince}
                            name='selectedProvince'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-specialty' /></label>
                        <Select
                            value={selectedSpecialty}
                            onChange={(selectedValue) => this.handleChange('selectedSpecialty', selectedValue)}
                            options={optionsListSpecialty}
                            name='selectedSpecialty'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-specialty-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.clinic-name' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'clinicName')}
                            value={clinicName}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.clinic-address' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'clinicAddress')}
                            value={clinicAddress}
                        />
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <p>Doctor information in English</p>
                    <MdEditor
                        style={{ height: '50vh' }}
                        renderHTML={text => this.mdParser.render(text)}
                        value={this.state.markdownContentEn}
                        onChange={this.handleEditorChangeEn} />

                </div>
                <div className='manage-doctor-editor'>
                    <p>Informations médicales en français</p>
                    <MdEditor
                        style={{ height: '50vh' }}
                        renderHTML={text => this.mdParser.render(text)}
                        value={this.state.markdownContentFr}
                        onChange={this.handleEditorChangeFr} />

                </div>
                <button
                    className='save-content-doctor'
                    onClick={() => this.handleSaveDoctorInfo()}>
                    {isNewDoctor === true
                        ? <FormattedMessage id='admin.manage-doctor.save' />
                        : <FormattedMessage id='admin.manage-doctor.update' />
                    }
                </button>
                <button className='cancel-content-doctor'
                    onClick={() => this.handleCancelDoctorInfo()}>
                    <FormattedMessage id='admin.manage-doctor.cancel' />
                </button>
            </div>
        );
    }

}



const mapStateToProps = state => {
    return {
        language: state.app.language,

        getAllUserRedux: state.admin.users,
        getOneUserRedux: state.admin.oneuser,
        allDoctorsRedux: state.admin.allDoctors,
        allDoctorInfoRequirement: state.admin.allDoctorInfoRequirement,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //CRUD Redux
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser(data)),
        getUserStartRedux: (id) => dispatch(actions.getUserStart(id)),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        postDoctorsRedux: (data) => dispatch(actions.postDoctors(data)),

        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
