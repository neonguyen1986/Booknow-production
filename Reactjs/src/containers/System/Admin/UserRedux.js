import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGE, CommonUtils } from '../../../utils'
import * as actions from "../../../store/actions"
import './UserRedux.scss'

import TableManageUser from './TableManageUser';

//Lightbox
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { toast } from 'react-toastify';



class UserRedux extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewIgmURL: '',
            isOpen: false,

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            isEditForm: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGender?.length > 0 ? arrGender[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPosition?.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRole?.length > 0 ? arrRole[0].keyMap : ''
            })
        }
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            //Ta sẽ tạo một API (của HTML) của ảnh này
            let base64file = await CommonUtils.convertBlobToBase64(file)
            // console.log('>>>check base64', base64file)

            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewIgmURL: objectUrl,
                avatar: base64file
            })
        }
    }
    handleOpenPreviewImage = () => {
        if (!this.state.previewIgmURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleOnChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }
            // , () => {
            //     console.log('check state:', this.state)}
        )
    }

    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        //gender, position, role: luôn có, avatar: ko bắt buộc

        let isValid = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Please retry, missing ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }



    handleOnClickSave = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        } else {
            //truyền state vào DB bằng redux
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                avatar: this.state.avatar,
                accessToken: this.props.userInfo.accessToken,
            })
            const res = this.props.resCreateUser
            if (res?.errCode === 0) {
                toast.success(res.errMessage)
                await this.props.fetchAllUsersStart()
                // console.log('check state after save:', this.state)
                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                    gender: 'M',
                    position: 'P0',
                    role: 'R1',
                    avatar: '',
                    previewIgmURL: '',
                })
            } else if (res?.errCode === 10) {
                toast.warning(res.errMessage)
                this.props.processLogout()
            } else {
                toast.warning(res.errMessage)
            }
        }

    }

    updateForm = (user) => {
        // console.log('>>>check user after update:', user)
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }

        this.setState({
            id: user.id,
            email: user.email,
            password: 'nothing',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            previewIgmURL: imageBase64,
            isEditForm: true,
        })
    }
    handleOnClickEdit = async () => {
        let data = { ...this.state, accessToken: this.props.userInfo.accessToken }
        await this.props.updateUserStart(data)
        await this.props.fetchAllUsersStart()
        // clear the form
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            previewIgmURL: '',

            isEditForm: false,
        })
    }

    handleOnClickCancel = () => {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            previewIgmURL: '',

            isEditForm: false,
        })
    }
    render() {
        // let { genderArr } = this.state;
        let language = this.props.language
        let { genderArr, positionArr, roleArr, previewIgmURL, isOpen } = this.state
        let isLoadingGenderReact = this.props.isLoadingGenderRedux
        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar, isEditForm
        } = this.state

        // console.log('===========check state', this.props.userInfo.accessToken)
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    Redux User Management
                </div>
                <div className='container'>

                    <TableManageUser
                        updateForm={this.updateForm} />
                </div>
                {isLoadingGenderReact === true
                    ?
                    <div> Loading...</div>
                    :
                    <>
                        <div className='user-redux-body'>
                            <div className='container'>{/* giúp chừa khoảng trống 2 bên content*/}
                                <div className='title my-3'>
                                    <FormattedMessage id='manage-user.add' />
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label><FormattedMessage id='manage-user.email' /></label>
                                        <input className='form-control' type='email'
                                            value={email}
                                            name='email'
                                            disabled={isEditForm === true}
                                            onChange={(e) => this.handleOnChangeInput(e)}
                                        />
                                    </div>
                                    <div className='col-6'>
                                        <label><FormattedMessage id='manage-user.password' /></label>
                                        <input className='form-control' type='password'
                                            value={password}
                                            name='password'
                                            disabled={isEditForm === true}
                                            onChange={(e) => this.handleOnChangeInput(e)} />
                                    </div>
                                    <div className='col-6'>
                                        <label><FormattedMessage id='manage-user.first-name' /></label>
                                        <input className='form-control' type='text'
                                            value={firstName}
                                            name='firstName'
                                            onChange={(e) => this.handleOnChangeInput(e)} />
                                    </div>
                                    <div className='col-6'>
                                        <label><FormattedMessage id='manage-user.last-name' /></label>
                                        <input className='form-control' type='text'
                                            value={lastName}
                                            name='lastName'
                                            onChange={(e) => this.handleOnChangeInput(e)} />
                                    </div>
                                    <div className='col-3'>
                                        <label><FormattedMessage id='manage-user.phone-number' /></label>
                                        <input className='form-control' type='text'
                                            value={phoneNumber}
                                            name='phoneNumber'
                                            onChange={(e) => this.handleOnChangeInput(e)} />
                                    </div>
                                    <div className='col-9'>
                                        <label><FormattedMessage id='manage-user.address' /></label>
                                        <input className='form-control' type='text'
                                            value={address}
                                            name='address'
                                            onChange={(e) => this.handleOnChangeInput(e)} />
                                    </div>

                                    <div className='col-3'>
                                        <label><FormattedMessage id='manage-user.gender' /></label>
                                        <select className="form-control"
                                            value={gender}
                                            name='gender'
                                            onChange={(e) => this.handleOnChangeInput(e)}>
                                            {genderArr && genderArr.length > 0 &&
                                                genderArr.map(item => {
                                                    // console.log('====check key map:', item)
                                                    return (
                                                        <option value={item.keyMap} key={item.id}>
                                                            {language === LANGUAGE.FR ? item.valueFr : item.valueEn}
                                                        </option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className='col-3'>
                                        <label><FormattedMessage id='manage-user.position' /></label>
                                        <select className="form-control"
                                            value={position}
                                            name='position'
                                            onChange={(e) => this.handleOnChangeInput(e)}>
                                            {positionArr?.length > 0 &&
                                                positionArr.map(item => {
                                                    return (
                                                        <option key={item.id} value={item.keyMap}>
                                                            {language === LANGUAGE.FR ? item.valueFr : item.valueEn}
                                                        </option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className='col-3'>
                                        <label><FormattedMessage id='manage-user.role-id' /></label>
                                        <select className="form-control"
                                            value={role}
                                            name='role'
                                            onChange={(e) => this.handleOnChangeInput(e)}>
                                            {roleArr?.length > 0 &&
                                                roleArr.map(item => {
                                                    // console.log('gender:', gender, 'position:', position, 'role:', role,)
                                                    return (
                                                        < option key={item.id} value={item.keyMap} >
                                                            {language === LANGUAGE.FR ? item.valueFr : item.valueEn
                                                            }
                                                        </option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className='col-3'>
                                        <label><FormattedMessage id='manage-user.image' /></label>
                                        <div className='preview-image-container'>
                                            <input id='previewImg' type='file' hidden
                                                onChange={(e) => this.handleOnChangeImage(e)}
                                            />
                                            <label className='upload-label' htmlFor='previewImg'>Image <i class="fas fa-upload"></i></label>
                                            {/* htmlFor phải trùng với id của input, khi này 
                                            label này sẽ đại diện cho thẻ input ở trên */}

                                            <div className='preview-image'
                                                style={{ backgroundImage: `url(${previewIgmURL}` }}
                                                onClick={() => this.handleOpenPreviewImage()}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                {isEditForm === false
                                    ?
                                    <button className='btn btn-secondary my-3'
                                        onClick={() => this.handleOnClickSave()}
                                    ><FormattedMessage id='manage-user.save' />
                                    </button>
                                    :
                                    <div>
                                        <button className='btn btn-warning my-3'
                                            onClick={() => this.handleOnClickEdit()}
                                        ><FormattedMessage id='manage-user.save-changes' />
                                        </button>
                                        <button className='btn btn-secondary outline my-3 mx-2'
                                            onClick={() => this.handleOnClickCancel()}
                                        ><FormattedMessage id='manage-user.cancel-btn' />
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        {isOpen === true &&
                            <Lightbox
                                mainSrc={previewIgmURL}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }
                    </>
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGenderRedux: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        resCreateUser: state.admin.resCreateUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        processLogout: () => dispatch(actions.processLogout()),

        //CRUD with Redux
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        updateUserStart: (data) => dispatch(actions.updateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
