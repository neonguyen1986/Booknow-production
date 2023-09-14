import axios from '../axios'
//gọi đến axios trong file axios chứ ko phải library
//lý do khi gởi request cần 1 access token, nếu có 10 api, thì phải gởi access token 10 lần
//-> bất tiện: chính vì vậy ta phải customize axios

const handleLoginApi = (emailInput, passwordInput) => {
    return axios.post('/api/login', { email: emailInput, password: passwordInput });
}

const getAllUsers = (inputId) => {
    // return axios.get(`/api/get-all-users?id=${inputId}`)
    return axios.get('/api/get-all-users', {
        params: {
            id: inputId
        }
    })
}

const createNewUserService = (newUser) => {
    return axios.post('/api/create-new-users', newUser, { headers: { token: `Bearer ${newUser.accessToken}` } })
}

const deleteUserService = (userId) => {
    // console.log('check user', userId)
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserService = (user) => {
    return axios.put('/api/edit-user', user)
}

const getAllCodeService = (inputType) => {
    return axios.get('/api/allcodes', {
        params: {
            type: inputType
        }
    })
}

const getTopDoctorService = (limit) => {
    return axios.get('/api/homepage-top-doctor', {
        params: {
            limit: limit
        }
    })
}

//============== GET DOCTORS FOR SELECT IN MANAGE DOCTOR ===============
const getAllDoctorsService = () => {
    return axios.get('/api/get-all-doctors')
}

//============== SAVE DOCTOR INFO ===============
const postDoctorInfo = (doctor) => {
    return axios.post('/api/save-doctors-info', doctor)
}
//==============GET DATA DETAIL DOCTOR PAGES ===============
const getDetailDoctorInfo = (inputId) => {
    return axios.get(`/api/get-doctors-detail-by-id`, {
        params: {
            id: inputId
        }
    })
}
//==============UPDATE MARKDOWN DB===============
const updateDoctorMardownService = (user) => {
    return axios.put('/api/update-doctors-info', user)
}

//============== SAVE BULK SCHEDULE ===============
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getDoctorScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-doctor-schedule-by-date`, {
        params: {
            doctorId: doctorId,
            date: date
        }
    })
}

const getDoctorMoreInfo = (doctorId) => {
    return axios.get(`/api/get-doctor-more-info-by-id`, {
        params: {
            doctorId: doctorId
        }
    })
}

const getDoctorDetail = (doctorId) => {
    return axios.get(`/api/get-doctor-profile-by-id`, {
        params: {
            doctorId: doctorId
        }
    })
}

const postPatientBookingAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookingAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const postCreateEditNewSpecialty = (data) => {
    return axios.post('/api/create-edit-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailSpecialtyIdLocation = (id, locationId) => {
    return axios.get(`/api/get-detail-specialty-by-id-location`, {
        params: {
            id: id,
            locationId: locationId
        }
    })
}

const getlistPatienByIdDate = (doctorId, date) => {
    return axios.get(`/api/get-list-patients-byIdDate`, {
        params: {
            doctorId,
            date
        }
    })
}
const postUploadSingleFile = (formData) => {
    return axios.post('/api/upload-single-file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const getDownloadServerFile = (token) => {
    return axios.get('/api/download-file', {
        params: {
            token
        }
    })
}

const deleteSpecialtyById = (id) => {
    return axios.delete('/api/delete-specialty-by-id', {
        data: {
            id: id
        }
    })
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorsService,
    postDoctorInfo,
    getDetailDoctorInfo,
    updateDoctorMardownService,
    saveBulkScheduleDoctor,
    getDoctorScheduleByDate,
    getDoctorMoreInfo,
    getDoctorDetail,
    postPatientBookingAppointment,
    postVerifyBookingAppointment,
    postCreateEditNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyIdLocation,
    getlistPatienByIdDate,
    postUploadSingleFile,
    getDownloadServerFile,
    deleteSpecialtyById,
}