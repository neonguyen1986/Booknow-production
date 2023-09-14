import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './TableManageUser.scss'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            currentPage: 1,
            showDeleteModal: false,
            getIdFromDelete: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.getAllUserRedux !== this.props.getAllUserRedux)
            this.setState({
                userRedux: this.props.getAllUserRedux
            })
    }

    toggle = () => {
        this.setState({ showDeleteModal: !this.state.showDeleteModal })
    }
    handleClickConfirmDelete = async () => {
        this.toggle();
        if (this.state.getIdFromDelete) {
            await this.props.deleteUserRedux(this.state.getIdFromDelete)
            await this.props.fetchAllUsersStart()
            toast.success("User deleted")
        }
    }
    handleOnClickDelete = async (id) => {
        this.toggle();
        this.setState({ getIdFromDelete: id })
    }
    handleOnClickEdit = async (id) => {
        await this.props.getUserStartRedux(id)
        let user = await this.props.getOneUserRedux
        this.props.updateForm(user)
    }

    render() {
        let userRedux = this.state.userRedux;
        // let userRedux = this.props.getAllUserRedux

        //VARIABLES FOR PAGING
        let currentPage = this.state.currentPage
        const itemsPerPage = 5;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = userRedux.slice(startIndex, endIndex)
        // Calculate the total number of pages
        const totalPages = Math.ceil(userRedux.length / itemsPerPage);
        let toggle = this.toggle;
        return (
            <>
                <div>
                    <Modal isOpen={this.state.showDeleteModal} toggle={toggle} centered size='sm'>
                        <ModalBody className='delete-modal-content'>
                            <i className="far fa-times-circle"></i>
                            <h2>Are you sure?</h2>
                            <div>Do you really want to delete this user?</div>
                        </ModalBody>
                        <ModalFooter className='delete-modal-footer'>
                            <Button color="danger" onClick={() => this.handleClickConfirmDelete()}>
                                Delete
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div >
                    <div className='user-redux-table mt-3'>
                        <table id="TableManageUser">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th><FormattedMessage id='manage-user.email' /></th>
                                    <th><FormattedMessage id='manage-user.first-name' /></th>
                                    <th><FormattedMessage id='manage-user.last-name' /></th>
                                    <th><FormattedMessage id='manage-user.address' /></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.length > 0 &&
                                    currentItems.map(item => {
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
                                                            onClick={() => this.handleOnClickEdit(item.id)}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className='btn-delete'
                                                            onClick={() => this.handleOnClickDelete(item.id)}
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
                    <div className='user-redux-pagination-controls'>
                        <button className='prev-btn'
                            onClick={() => this.setState({ currentPage: (currentPage - 2 + totalPages) % totalPages + 1 })}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <span span className='number'>{currentPage}</span>
                        <button
                            className='next-btn'
                            onClick={() => this.setState({ currentPage: (currentPage % totalPages) + 1 })}
                        >
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </>
        );
    }

}



const mapStateToProps = state => {
    return {
        getAllUserRedux: state.admin.users,
        getOneUserRedux: state.admin.oneuser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //CRUD Redux
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser(data)),
        getUserStartRedux: (id) => dispatch(actions.getUserStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
