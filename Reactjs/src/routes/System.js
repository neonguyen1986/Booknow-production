import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctors from '../containers/System/Admin/ManageDoctors';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import { CommonUtils } from '../utils';


class System extends Component {

    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        let roleId = CommonUtils.getIdOrRoleFromToken(this.props.userInfo.accessToken, 'role')
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    {isLoggedIn && roleId === "R1"
                        ?
                        <div className="system-list">
                            <Switch>
                                <Route path="/system/user-manage" component={UserManage} />
                                <Route path="/system/user-redux" component={UserRedux} />
                                <Route path="/system/manage-doctor" component={ManageDoctors} />
                                <Route path="/system/manage-specialty" component={ManageSpecialty} />
                                <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                            </Switch>
                        </div>
                        :
                        <div className='title'>
                            You cannot connect to this page
                        </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
