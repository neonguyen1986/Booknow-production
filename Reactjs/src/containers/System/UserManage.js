import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import UserModal from './UserModal';
import EditUserModal from './EditUserModal';
import { emitter } from '../../utils/emitter'
import { FormattedMessage } from 'react-intl';


class UserManage extends Component {

    constructor(props) {
        super(props);//without this line, the this.props will return 'undefined' 
        this.state = {
            arrUser: [],
            isOpenUserModal: false,
            isOpenEditModal: false,
            userToEdit: {}
        }
    }

    //===========get user from Node and assign to arrUser===========
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    //=============READ===========
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        // console.log('>>>get user from node.js:', response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.user
            })
        }
    }


    //===========CREATE============
    //click Add New User Button Event
    handleAddNewUser = () => {
        this.setState({
            isOpenUserModal: true
        })
    }
    //toggle action for UserModal.js
    toggleUserModal = () => {
        this.setState({
            isOpenUserModal: !this.state.isOpenUserModal,
        })
    }
    createNewUserDad = async (data) => {
        try {
            let res = await createNewUserService(data);
            // console.log('Error message:', res)

            //for auto reload data in Manage User page
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenUserModal: false
                })
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                alert(res.errMessage)
            }

        } catch (error) {
            console.log(error)
        }
    }

    //=============DELETE=============
    handleOnClickDelete = async (user) => {
        // console.log('>>>check id:', user)
        try {
            let res = await deleteUserService(user.id)
            // console.log('>>>check res:', res.errMessage)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }
    //=============UPDATE=============
    handleOnClickEdit = (user) => {
        this.setState({
            isOpenEditModal: true,
            userToEdit: user
        })
    }

    //toggle action for UserModal.js
    toggleEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }
    editUserDad = async (user) => {
        try {
            // let data = { ...user, id: this.state.userToEdit.id }
            console.log('>>> check user:', user)
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenEditModal: false
                })
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }

    }
    render() {
        let arrUser = this.state.arrUser
        // console.log('check user:', arrUser)

        return (
            <div className="user-container container">
                <UserModal
                    isOpen={this.state.isOpenUserModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUserDad={this.createNewUserDad}
                />
                {this.state.isOpenEditModal &&
                    <EditUserModal
                        userToEdit={this.state.userToEdit}
                        isOpen1={this.state.isOpenEditModal}
                        toggleEditFromParent={this.toggleEditModal}
                        editUserDad={this.editUserDad}
                    />
                }

                <div className='title text-center'>
                    <FormattedMessage id='manage-user.title' />
                </div>
                <div className='mx-1 '>
                    <button
                        className='btn btn-secondary px-3'
                        onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus">&nbsp; </i>
                        <FormattedMessage id='manage-user.add' />
                    </button>
                </div>
                <div className='user-table mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th><FormattedMessage id='manage-user.email' /></th>
                                <th><FormattedMessage id='manage-user.first-name' /></th>
                                <th><FormattedMessage id='manage-user.last-name' /></th>
                                <th><FormattedMessage id='manage-user.address' /></th>
                                <th><FormattedMessage id='manage-user.action' /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser && arrUser.length > 0 && arrUser.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <div>
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleOnClickEdit(item)}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => this.handleOnClickDelete(item)}
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
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
