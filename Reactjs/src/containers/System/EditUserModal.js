import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class EditUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }

    }

    componentDidMount() {
        let user = this.props.userToEdit;
        if (user && !_.isEmpty(user)) {// _.isEmpty -> lodash
            this.setState({
                id: user.id,
                email: user.email,
                password: 'nothing',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                roleId: user.roleId,
            })
        }
    }
    toggle = () => {
        this.props.toggleEditFromParent();
    }

    //================CREATE================
    handleOnChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleEditUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            //Call API
            //truyền this.state từ con sang cha
            this.props.editUserDad(this.state);
        }
    }


    render() {
        // console.log('>>>check props:', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen1}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
                centered={true}>
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container' >
                            <label>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={this.state.email}
                                onChange={(e) => this.handleOnChangeInput(e)}
                                readOnly />
                        </div>
                        <div className='input-container' >
                            <label>Password</label>
                            <input type='password'
                                name='password'
                                value={this.state.password}
                                onChange={(e) => this.handleOnChangeInput(e)}
                                readOnly />
                        </div>
                        <div className='input-container' >
                            <label>First Name</label>
                            <input type='text'
                                name='firstName'
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Last Name</label>
                            <input type='text'
                                name='lastName'
                                // placeholder={userToEdit.lastName}
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Address</label>
                            <input type='text'
                                name='address'
                                // placeholder={userToEdit.address}
                                value={this.state.address}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Phone Number</label>
                            <input type='email'
                                name='phoneNumber'
                                // placeholder={userToEdit.phoneNumber}
                                value={this.state.phoneNumber}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Gender</label>
                            <select
                                name="gender"
                                className="form-control"
                                defaultValue={this.state.gender}
                            >
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select name="roleId"
                                className="form-control"
                                defaultValue={this.state.roleId}
                            >
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='btn px-2'
                        color="secondary"
                        onClick={() => this.handleEditUser()}>
                        Save Changes
                    </Button>{' '}
                    <Button className='btn px-2' color="secondary" outline onClick={() => this.toggle()}>
                        Cancel
                    </Button>

                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);



