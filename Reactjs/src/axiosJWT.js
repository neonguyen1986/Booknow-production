import axios from "./axios";
import jwt_decode from "jwt-decode"

// const localAxios = axios.create({
//     baseURL: process.env.REACT_APP_BACKEND_URL
// });

const refreshToken = async () => {
    try {
        const res = await axios.post('/api/refresh', {
            withCredentials: true, //add cookie from browser cookies
        })
        console.log('++++++++++res:', res)
        return res; //it will return new accessToken, refreshToken
    } catch (error) {
        console.log(error)
    }
}
export const createAxiosJWT = (user, dispatch, stateSuccess) => {
    console.log('++++++++++ user:', user)
    let newInstance = axios.create()

    //interceptor: before seding any request using axiosJWT, it will check condition inside this logic
    newInstance.interceptors.request.use(
        async (config) => {

            //check JWT expired?
            //npm i jwt-decode:  will de-encrypt accessToken
            const decodedToken = jwt_decode(user?.accessToken)

            // console.log('decodedToken=====', decodedToken)


            //now if the exp is < curDate, we will refresh User by updating accessToken
            //new refreshToken will be added in cookie from back end
            let date = new Date()
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken()//this data contains new accessToken, new refreshToken
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                }
                dispatch(stateSuccess(refreshUser))//use refreshUser to add data in loginSuccess in Redux
                config.headers["token"] = `Bearer ${data.accessToken}`
                //????????? add token to headers in case user want to use in deleteUser function
            } else {
                config.headers["token"] = `Bearer ${user.accessToken}`
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    )
    return newInstance
}
