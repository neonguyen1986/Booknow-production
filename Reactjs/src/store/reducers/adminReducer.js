import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    oneuser: {},
    topDoctors: {},
    allDoctors: {},
    allScheduleTime: [],
    allDoctorInfoRequirement: [],
    resCreateUser: ''
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //===============Gender================
        case actionTypes.FETCH_GENDER_START:
            // console.log('fetch start:', action)
            return {
                ...state,
                isLoadingGender: true,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                genders: action.payload,
                isLoadingGender: false,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                isLoadingGender: false,
            }
        //===============Position================
        case actionTypes.FETCH_POSITION_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                positions: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============Role================
        case actionTypes.FETCH_ROLE_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                roles: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============READ REDUX USER================
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                users: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============GET ONE USER================
        case actionTypes.GET_USER_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                oneuser: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.GET_USER_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }

        //===============GET TOP DOCTORS================
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                topDoctors: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============GET ALL DOCTORS================
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                allDoctors: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============GET ALLCODE TIME================
        case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                allScheduleTime: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_ALLCODE_TIME_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============GET DOCTOR REQUIREMENT: PRICE, PAYMENT, PROVINCE================
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                allDoctorInfoRequirement: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            // console.log('fetch fail:', action)
            return {
                ...state,
                resCreateUser: action.payload,
            }
        case actionTypes.CREATE_USER_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                resCreateUser: action.payload,
            }
        default:
            return state;
    }
}

export default adminReducer;