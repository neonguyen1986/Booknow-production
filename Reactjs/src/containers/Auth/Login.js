import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from '../../services/userService';
import jwtDecode from 'jwt-decode';
import { CommonUtils } from "../../utils";


class Login extends Component {
	constructor(props) {
		// khai báo các state ở đây
		super(props);
		this.state = {
			username: "",
			password: "",
			isShowPassword: false,
			errMessage: ''
		};
	}

	handleOnChangeInput = (e) => {
		const inputValue = e.target.value;
		const inputName = e.target.name;
		this.setState({
			[inputName]: inputValue,
		});
		// console.log(`check ${inputName}:`, inputValue);
	};

	handlePressEnter = (e) => {
		if (e.key === "Enter") {
			this.handleLogin()
		}
	}

	handleLogin = async () => {
		this.state.errMessage = ''//clear mã lỗi
		try {
			let data = await handleLoginApi(this.state.username, this.state.password)
			console.log('>>>check Login data', data)
			if (data && data.errCode !== 0) {
				this.setState({
					errMessage: data.errMessage,
				})
			}
			if (data && data.errCode === 0) {
				this.props.userLoginSuccess(data.user)
				let roleId = CommonUtils.getIdOrRoleFromToken(data.user.accessToken, 'role')
				console.log('==========check role', roleId)
				if (roleId === 'R1') {
					this.props.navigate('/system/user-redux');
				} else if (roleId === 'R2') {
					this.props.navigate('/doctor/manage-schedule');
				}
			}
		} catch (error) {
			// console.log(error.response)
			if (error.response.data) {
				this.setState({
					errMessage: error.response.data.message,
				})
			}
		}
		// console.log(this.state.username + this.state.password);
	};

	handleShowHidePassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword
		})
	}

	render() {
		let { username, password, isShowPassword, errMessage } = this.state;
		return (
			<div className="login-background">
				<div className="login-container">
					<div className="login-content row">
						<div className="login-text col-12">Login</div>
						<div className="col-12 form-group login-input">
							{/* <label>Email:</label> */}
							<div className="login-input-email">
								<input
									type="text"
									className="form-control"
									placeholder="Email"
									value={username}
									name="username"
									onChange={(e) => this.handleOnChangeInput(e)}
								/>
								<span><i class="fas fa-envelope"></i></span>
							</div>
						</div>
						<div className="col-12 form-group login-input">
							{/* <label>Password:</label> */}
							<div className="custom-input-password">
								<input
									type={isShowPassword === false ? "password" : "text"}
									className="form-control"
									placeholder="Password"
									value={password}
									name="password"
									onChange={(e) => this.handleOnChangeInput(e)}
									onKeyDown={(e) => this.handlePressEnter(e)}
								/>
								<span
									onClick={() => this.handleShowHidePassword()}
								>
									<i className={isShowPassword === false ? "fas fa-eye-slash" : "fas fa-eye"}></i>
								</span>
								<span className="login-icon"><i class="fas fa-lock"></i></span>
							</div>
						</div>

						<div className="col-12">
							<button className="login-btn"
								onClick={() => this.handleLogin()}>
								Sign In
							</button>
						</div>
						<div className="col-12">
							{/* <span className="forgot-password">Forgot your password?</span> */}
						</div>
						<div className="col-12 text-center mt-2">
							<span className="other-login"> Or Login with:</span>
						</div>
						<div className="col-12 err-code">
							{errMessage}
						</div>
						<div className="col-12 social-login">
							<i className="fab fa-google-plus-g"></i>
							<i className="fab fa-facebook-f"></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		// userLoginFail: () => dispatch(actions.userLoginFail()),
		userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
