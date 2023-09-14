import actionTypes from './actionTypes';
import { createAxiosJWT } from '../../axiosJWT';
import { userLoginSuccess } from '../actions/userActions'
import { toast } from 'react-toastify';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorService,
    getAllDoctorsService,
    postDoctorInfo,
    getAllSpecialty,
}
    from '../../services/userService'
import { useDispatch } from 'react-redux';

//=================== Fetch Gender ====================
export const fetchGenderStart = () => async (dispatch, getState) => {
    try {
        //FETCH_GENDER_START: to show isLoadingGender
        dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllCodeService("GENDER");
        // console.log('check gender', res)
        if (res && res.errCode === 0) {
            dispatch(fetchGenderSuccess(res.data));
            // console.log('check getState:', getState)
            // console.log('check res:', res)
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to fetch gender data';
            dispatch(fetchGenderFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchGenderFailed());
        console.log('>>>fetchGender error:', error);
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    payload: genderData,
})
export const fetchGenderFailed = (error) => ({
    type: actionTypes.FETCH_GENDER_FAILED,
    payload: error,
})

//=================== Fetch Position ====================
export const fetchPositionStart = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllCodeService("POSITION");
        if (res && res.errCode === 0) {
            dispatch(fetchPositionSuccess(res.data));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to fetch position data';
            dispatch(fetchPositionFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchPositionFailed());
        console.log('>>>fetch Position error:', error);
    }
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    payload: positionData,
})
export const fetchPositionFailed = (error) => ({
    type: actionTypes.FETCH_POSITION_FAILED,
    payload: error,
})
//=================== Fetch Role ====================
export const fetchRoleStart = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllCodeService("ROLE");
        if (res && res.errCode === 0) {
            dispatch(fetchRoleSuccess(res.data));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to fetch role data';
            dispatch(fetchRoleFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchRoleFailed());
        console.log('>>>fetch Role error:', error);
    }
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    payload: roleData,
})
export const fetchRoleFailed = (error) => ({
    type: actionTypes.FETCH_ROLE_FAILED,
    payload: error,
})

//=================== CREATE NEW USER ====================
export const createNewUser = (data) => async (dispatch, getState) => {
    try {
        // console.log('check create user Redux:', data)

        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await createNewUserService(data);
        // console.log('===============check create user Redux:', res)
        if (res && res.errCode === 0) {
            dispatch(saveUserSuccess(res));
        } else {
            // const errorMessage = res?.errMessage ? res.errMessage : 'Failed to create user';
            dispatch(saveUserFailed(res));
        }
    } catch (error) {
        dispatch(saveUserFailed());
        console.log('>>>Create user error:', error);
    }
};

export const saveUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    payload: data,
})
export const saveUserFailed = (error) => ({
    type: actionTypes.CREATE_USER_FAILED,
    payload: error,
})
//=================== READ USER ====================

export const fetchAllUsersStart = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllUsers("ALL");
        // console.log('check getAllUsers', res)
        if (res && res.errCode === 0) {
            dispatch(fetchAllUsersSuccess(res.user));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to load user data';
            dispatch(fetchAllUsersFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllUsersFailed());
        console.log('>>>Load all users error:', error);
    }
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    payload: data,
})
export const fetchAllUsersFailed = (error) => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
    payload: error,
})

//=================== DELETE USER ====================
export const deleteUser = (data) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        let res = await deleteUserService(data);
        if (res && res.errCode === 0) {
            dispatch(delteUserSuccess());
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to delete user';
            dispatch(delteUserFailed(errorMessage));
        }
    } catch (error) {
        dispatch(saveUserFailed());
        console.log('>>>Delete User error:', error);
    }
};

export const delteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const delteUserFailed = (error) => ({
    type: actionTypes.DELETE_USER_FAILED,
    payload: error,
})

//=================== UPDATE USER ====================
export const getUserStart = (id) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllUsers(id);
        // console.log('check get one user:', res.user)
        if (res && res.errCode === 0) {
            dispatch(getUsersSuccess(res.user));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to get user data';
            dispatch(getUsersFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllUsersFailed());
        console.log('>>>Get user data error:', error);
    }
};

export const getUsersSuccess = (data) => ({
    type: actionTypes.GET_USER_SUCCESS,
    payload: data,
})
export const getUsersFailed = (error) => ({
    type: actionTypes.GET_USER_FAILED,
    payload: error,
})
//============
export const updateUserStart = (data) => async (dispatch, getState) => {
    // console.log("=========check 1 data:", data)
    try {
        // const dispatch = useDispatch();
        let axiosJWT = createAxiosJWT(data, dispatch, userLoginSuccess)
        const res = await axiosJWT.put('/api/edit-user', data)
        console.log("=========check 3 res:", res)
        // console.log('check data after:', res)
        if (res && res.data?.errCode === 0) {
            toast.success(res.data.errMessage)
            dispatch(updateUsersSuccess());
        } else {
            toast.warning(res.data.errMessage)
            const errorMessage = res?.message ? res.message : 'Failed to update user';
            dispatch(updateUsersFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllUsersFailed());
        console.log('>>>Update user data error:', error);
    }
};

export const updateUsersSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
})
export const updateUsersFailed = (error) => ({
    type: actionTypes.UPDATE_USER_FAILED,
    payload: error,
})
//=================== FETCH OUSTANDING DOCTORS ====================

export const fetchTopDoctors = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        console.log('--------------check top Doctor:')
        const res = await getTopDoctorService(20)
        console.log('--------------check top Doctor:', res)
        if (res && res.errCode === 0) {
            dispatch(fetchTopDoctorsSuccess(res.data));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to load top doctors';
            dispatch(fetchTopDoctorsFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchTopDoctorsFailed());
        console.log('>>>Load top doctors error:', error);
    }
};

export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    payload: data,
})
export const fetchTopDoctorsFailed = (error) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
    payload: error,
})
//=================== FETCH ALL DOCTORS FOR SELECT IN MANAGE DOCTOR ====================

export const fetchAllDoctors = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllDoctorsService()
        // console.log('check top Doctor:', res.data)
        if (res && res.errCode === 0) {
            dispatch(fetchAllDoctorsSuccess(res.data));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to load top doctors';
            dispatch(fetchAllDoctorsFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllDoctorsFailed());
        console.log('>>>Load top doctors error:', error);
    }
};

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    payload: data,
})
export const fetchAllDoctorsFailed = (error) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
    payload: error,
})

//=================== POST ALL DOCTORS ====================

export const postDoctors = (data) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await postDoctorInfo(data)
        if (res && res.errCode === 0) {
            dispatch(postDoctorsSuccess());
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to save doctors info';
            dispatch(postDoctorsFailed(errorMessage));
        }
        return res
    } catch (error) {
        dispatch(fetchAllDoctorsFailed());
        console.log('>>>Save doctors info error:', error);
    }
};

export const postDoctorsSuccess = () => ({
    type: actionTypes.POST_DOCTORS_SUCCESS,
})
export const postDoctorsFailed = (error) => ({
    type: actionTypes.POST_DOCTORS_FAILED,
    payload: error,
})
//=================== FETCH ALLCODE TIME ====================

export const fetchAllcodeTimeStart = (type) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllCodeService("TIME");
        // console.log('check getAllUsers', res)
        if (res && res.errCode === 0) {
            dispatch(fetchAllcodeTimeSuccess(res.data));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to load Allcode Time';
            dispatch(fetchAllcodeTimeFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllcodeTimeFailed());
        console.log('>>>Load Allcode Time error:', error);
    }
};

export const fetchAllcodeTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
    payload: data,
})
export const fetchAllcodeTimeFailed = (error) => ({
    type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
    payload: error,
})

//=================== Fetch Doctor Price, Payment, Province ====================
export const getRequiredDoctorInfo = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
        const resPrice = await getAllCodeService("PRICE");
        const resPayment = await getAllCodeService("PAYMENT");
        const resProvince = await getAllCodeService("PROVINCE");
        const resSpecialty = await getAllSpecialty();
        let data = ''
        if (resPrice?.errCode === 0 &&
            resPayment?.errCode === 0 &&
            resProvince?.errCode === 0 &&
            resSpecialty?.errCode === 0) {
            data = {
                resPrice: resPrice.data,
                resPayment: resPayment.data,
                resProvince: resProvince.data,
                resSpecialty: resSpecialty.data,
            }
            dispatch(getRequiredDoctorSuccess(data));
        } else {
            const errorMessage = data?.message ? data.message : 'Failed to fetch doctor requirement';
            dispatch(getRequiredDoctorFailed(errorMessage));
        }
    } catch (error) {
        dispatch(getRequiredDoctorFailed());
        console.log('>>>fetch doctor requirement error:', error);
    }
};

export const getRequiredDoctorSuccess = (genderData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    payload: genderData,
})
export const getRequiredDoctorFailed = (error) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
    payload: error,
})

