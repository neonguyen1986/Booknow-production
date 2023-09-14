import React, { Component, useRef } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { postCreateEditNewSpecialty, getAllSpecialty, deleteSpecialtyById } from '../../../services/userService';
import { toast } from 'react-toastify';



class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            //Create New Specialty
            isCreate: true,
            previewImgURL: '',
            isOpen: false,
            specialtyNameEn: '',
            specialtyNameFr: '',
            markdownSpecialtyEn: '',
            markdownSpecialtyFr: '',
            HTMLSpecialtyEn: '',
            HTMLSpecialtyFr: '',
            specialtyImage: '',

            //Edit Specialty
            isEdit: false,
            specialtyData: '',
            id: '',

            //Edit Specialty

            isDelete: false,
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty()
        // console.log('===========check res:', res)
        this.setState({ specialtyData: res.data })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    //================= Preview Image=================
    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64file = await CommonUtils.convertBlobToBase64(file)
            //Ta sẽ tạo một link HTML (blob) của ảnh này
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                specialtyImage: file,
            })
        }
        // console.log('>>>check image:', objectUrl)
    }
    handleOpenPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    //================= Preview Image=================
    //================= Markdown Editor=================
    mdParser = new MarkdownIt(/* Markdown-it options */);
    // Finish!
    handleEditorChangeEn = ({ html, text }) => {
        // console.log('handleEditorChangeEn', html, text);
        this.setState({
            markdownSpecialtyEn: text,
            HTMLSpecialtyEn: html,
        })
    }
    handleEditorChangeFr = ({ html, text }) => {
        // console.log('handleEditorChangeFr', html, text);
        this.setState({
            markdownSpecialtyFr: text,
            HTMLSpecialtyFr: html,
        })
    }
    //================= Markdown Editor=================
    handleOnChangeSpecialtyNameEn = (e) => {
        this.setState({
            specialtyNameEn: e.target.value
        })
    }
    handleOnChangeSpecialtyNameFr = (e) => {
        this.setState({
            specialtyNameFr: e.target.value
        })
    }
    //=================CREATE SPECIALTY====================
    handleOnClickSave = async () => {
        const formData = new FormData();
        formData.append('fileName', this.state.specialtyImage);
        //data for DB
        formData.append('specialtyNameEn', this.state.specialtyNameEn)
        formData.append('specialtyNameFr', this.state.specialtyNameFr)
        formData.append('markdownSpecialtyEn', this.state.markdownSpecialtyEn)
        formData.append('markdownSpecialtyFr', this.state.markdownSpecialtyFr)
        formData.append('HTMLSpecialtyEn', this.state.HTMLSpecialtyEn)
        formData.append('HTMLSpecialtyFr', this.state.HTMLSpecialtyFr)

        let res = await postCreateEditNewSpecialty(formData)
        if (res?.errCode === 0) {
            toast.success(`You're just add a new specialty`)
            //REFRESH DATA TABLE AFTER CREATE NEW
            let res = await getAllSpecialty()
            this.setState({ specialtyData: res.data })
            //CLEAR FORM AFTER EDIT
            this.setState({
                previewImgURL: '',
                specialtyNameEn: '',
                specialtyNameFr: '',
                markdownSpecialtyEn: '',
                markdownSpecialtyFr: '',
                HTMLSpecialtyEn: '',
                HTMLSpecialtyFr: '',
                specialtyImage: '',
            })
        }
        else {
            toast.warning(res.errMessage)
        }
    }

    // CREATE EDIT EDIT EVENT
    handleClickCreateEvent = (e) => {
        // Remove "active" class from all links
        const tabs = document.querySelectorAll('.ManaSpec-navbar div');
        tabs.forEach(tab => tab.classList.remove('active'));

        // Add "active" class to the clicked link
        e.currentTarget.classList.add('active');

        this.setState({
            isCreate: true,
            isEdit: false,
            isDelete: false,
        })
    }
    handleClickEditEvent = (e) => {
        // Remove "active" class from all links
        const tabs = document.querySelectorAll('.ManaSpec-navbar div');
        tabs.forEach(tab => tab.classList.remove('active'));

        // Add "active" class to the clicked link
        e.currentTarget.classList.add('active');

        this.setState({
            isCreate: false,
            isEdit: true,
            isDelete: false,
        })
    }
    //===============Edit specialty===================
    handleOnClickEditSpecialty = (item) => {
        console.log('>>>>>>>>>check item:', item)
        this.myRef.current.scrollIntoView({ behavior: 'smooth' });

        this.setState({
            previewImgURL: item.image,
            specialtyNameEn: item.nameEn,
            specialtyNameFr: item.nameFr,
            markdownSpecialtyEn: item.descriptionMarkdown_En,
            markdownSpecialtyFr: item.descriptionMarkdown_Fr,
            HTMLSpecialtyEn: item.descriptionHTML_En,
            HTMLSpecialtyFr: item.descriptionHTML_Fr,
            id: item.id,
        })
    }
    handleOnClickSaveEdit = async () => {

        const formData = new FormData();
        formData.append('fileName', this.state.specialtyImage);
        //data for DB
        formData.append('id', this.state.id)
        formData.append('specialtyNameEn', this.state.specialtyNameEn)
        formData.append('specialtyNameFr', this.state.specialtyNameFr)
        formData.append('markdownSpecialtyEn', this.state.markdownSpecialtyEn)
        formData.append('markdownSpecialtyFr', this.state.markdownSpecialtyFr)
        formData.append('HTMLSpecialtyEn', this.state.HTMLSpecialtyEn)
        formData.append('HTMLSpecialtyFr', this.state.HTMLSpecialtyFr)
        formData.append('isEdit', true)//this isEdit is diffrent with isEdit in State

        let res = await postCreateEditNewSpecialty(formData)
        if (res?.errCode === 0) {
            toast.success(`You're just edit a specialty`)
            //REFRESH TABLE AFTER EDIT
            let res = await getAllSpecialty()
            this.setState({ specialtyData: res.data })
            //CLEAR FORM AFTER EDIT
            this.setState({
                previewImgURL: '',
                specialtyNameEn: '',
                specialtyNameFr: '',
                markdownSpecialtyEn: '',
                markdownSpecialtyFr: '',
                HTMLSpecialtyEn: '',
                HTMLSpecialtyFr: '',
                specialtyImage: '',
            })
        }
        else {
            toast.warning(res.errMessage)
        }
    }
    //DELETE SPECIALTES
    handleOnClickDeleteSpecialty = async (item) => {
        await deleteSpecialtyById(item.id)
        //REFRESH TABLE AFTER EDIT
        let res = await getAllSpecialty()
        this.setState({ specialtyData: res.data })
    }
    render() {
        let { previewImgURL, isOpen, specialtyData } = this.state;
        let { isCreate, isEdit, isDelete } = this.state;
        // console.log('>>>>check state ManageSpecialty:', this.state)
        return (
            <>
                <div className="ManaSpec-navbar">
                    <div className="active"
                        onClick={(e) => this.handleClickCreateEvent(e)}
                    ><i className="fas fa-plus"></i> &nbsp;<FormattedMessage id='admin.manage-specialty.create' /></div>
                    <div
                        onClick={(e) => this.handleClickEditEvent(e)}
                    ><i className="far fa-edit"></i>&nbsp;<FormattedMessage id='admin.manage-specialty.edit-delete' /></div>
                </div >
                {isCreate === true ?
                    // CREATE PART
                    <div className='manage-specialty-container'>
                        <div className='title'>
                            <FormattedMessage id='admin.manage-specialty.create-title' />
                        </div>
                        <div className='manage-create-specialty-content container'>
                            <div className='manage-specialty-content'>
                                <div className='specialty-name'>
                                    <div className='specialty-name col-12 form-group ml-3'>
                                        <label>
                                            Specialty name in English
                                        </label>
                                        <input className='form-control'
                                            value={this.state.specialtyNameEn}
                                            onChange={(e) => this.handleOnChangeSpecialtyNameEn(e)} />
                                    </div>
                                    <div className='specialty-name col-12 form-group ml-3'>
                                        <label>
                                            Nom de la spécialité en français
                                        </label>
                                        <input className='form-control'
                                            value={this.state.specialtyNameFr}
                                            onChange={(e) => this.handleOnChangeSpecialtyNameFr(e)} />
                                    </div>
                                </div>
                                <div className='preview-image-container-specialty col-6 form-group'>
                                    <div className='left-content'>
                                        <label>
                                            <FormattedMessage id='admin.manage-specialty.image' />
                                        </label>
                                        {/* ====go together */}
                                        <input id='previewImg' type='file' hidden
                                            onChange={(e) => this.handleOnChangeImage(e)} />
                                        <label className='upload-button' htmlFor='previewImg'>
                                            <span>Image</span>
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        {/* ====go together */}

                                    </div>
                                    <div className='right-content'>
                                        <div
                                            onClick={() => this.handleOpenPreviewImage()}
                                        >
                                            <img className='preview-image-create' src={previewImgURL} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='markdown-content col-12'>
                                <p>Specialty content in English</p>
                                <MdEditor
                                    style={{ height: '300px' }}
                                    renderHTML={text => this.mdParser.render(text)}
                                    value={this.state.markdownSpecialtyEn}//use to update content when Click Edit
                                    onChange={this.handleEditorChangeEn} />

                            </div>
                            <div className='markdown-content col-12'>
                                <p>Contenu spécialisé en français</p>
                                <MdEditor
                                    style={{ height: '300px' }}
                                    renderHTML={text => this.mdParser.render(text)}
                                    value={this.state.markdownSpecialtyFr}//use to update content when Click Edit
                                    onChange={this.handleEditorChangeFr} />

                            </div>
                            <button className='btn btn-secondary'
                                onClick={() => this.handleOnClickSave()}
                            >
                                <FormattedMessage id='admin.manage-specialty.save' />
                            </button>
                        </div>
                    </div>
                    : isEdit === true ?
                        //  EDIT PART
                        <div className='manage-specialty-container'>
                            <div className='title mb-4'>
                                <FormattedMessage id='admin.manage-specialty.edit-title' />
                            </div>
                            <table id="TableManageUser" className='container'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Specialty in English</th>
                                        <th>Spécialité en français</th>
                                        <th>Description in English</th>
                                        <th>Descriptif en français</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {specialtyData?.length > 0 && specialtyData.map(item => {
                                        return (
                                            <tr key={item.id} >
                                                <td>{item.id}</td>
                                                <td>{item.nameEn}</td>
                                                <td>{item.nameFr}</td>
                                                <td>{item.descriptionMarkdown_En.slice(0, 100)}<br /> ...</td>
                                                <td>{item.descriptionMarkdown_Fr.slice(0, 100)}<br /> ...</td>
                                                <td>
                                                    <div>
                                                        <button
                                                            className='btn-edit '
                                                            onClick={() => this.handleOnClickEditSpecialty(item)}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className='btn-delete'
                                                            onClick={() => this.handleOnClickDeleteSpecialty(item)}
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className='manage-edit-specialty-content container' ref={this.myRef}>
                                <div className='manage-specialty-content'>
                                    <div className='specialty-name'>
                                        <div className='specialty-name col-12 form-group'>
                                            <label>
                                                Edit specialty name in English
                                            </label>
                                            <input className='form-control'
                                                value={this.state.specialtyNameEn}
                                                onChange={(e) => this.handleOnChangeSpecialtyNameEn(e)} />
                                        </div>
                                        <div className='specialty-name col-12 form-group'>
                                            <label>
                                                Modifier le nom de la spécialité en français
                                            </label>
                                            <input className='form-control'
                                                value={this.state.specialtyNameFr}
                                                onChange={(e) => this.handleOnChangeSpecialtyNameFr(e)} />
                                        </div>
                                    </div>
                                    <div className='preview-image-container-specialty col-6 form-group'>
                                        <div className='left-content'>
                                            <label>
                                                <FormattedMessage id='admin.manage-specialty.image' />
                                            </label>
                                            {/* ====go together */}
                                            <input id='previewImg' type='file' hidden
                                                onChange={(e) => this.handleOnChangeImage(e)} />
                                            <label className='upload-button' htmlFor='previewImg'>
                                                <span>Image</span>
                                                <i className="fas fa-upload"></i></label>
                                            {/* ====go together */}

                                        </div>
                                        <div className='right-content'>
                                            <div className='preview-image'
                                                onClick={() => this.handleOpenPreviewImage()}
                                            >
                                                <img className='preview-image' src={previewImgURL} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='markdown-content col-12'>
                                    <p>Edit specialty content in English</p>
                                    <MdEditor
                                        style={{ height: '300px' }}
                                        renderHTML={text => this.mdParser.render(text)}
                                        value={this.state.markdownSpecialtyEn}//use to update content when Click Edit
                                        onChange={this.handleEditorChangeEn} />

                                </div>
                                <div className='markdown-content col-12'>
                                    <p>Modifier du contenu spécialisé en français</p>
                                    <MdEditor
                                        style={{ height: '300px' }}
                                        renderHTML={text => this.mdParser.render(text)}
                                        value={this.state.markdownSpecialtyFr}//use to update content when Click Edit
                                        onChange={this.handleEditorChangeFr} />

                                </div>
                                <button className='btn btn-secondary'
                                    onClick={() => this.handleOnClickSaveEdit()}
                                >
                                    <FormattedMessage id='admin.manage-specialty.save' />
                                </button>
                            </div>
                        </div>
                        : isDelete === true ?
                            //DELETE PART
                            <div className='manage-specialty-container'>
                                <div className='title'>
                                    <FormattedMessage id='admin.manage-specialty.delete-title' />
                                </div>
                            </div>
                            : ''
                }
                {
                    isOpen === true &&
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
