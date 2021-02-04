import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AuthAxios} from '../../axios';

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS, data
    }
}

const authFailure = (data) => {
    return {
        type: actionTypes.AUTH_FAILURE, data
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const asyncRegister = (username, email, password, password2) => {
    return dispatch => {
        const register_data = {
            username, email, password, password2
        }
        axios.post('http://127.0.0.1:8000/api/auth/register/', register_data)
        .then(res => {
            dispatch(authSuccess(JSON.parse(res.data).data))
        })
            // dispatch(registerSuccess(res.data)))
        .catch(err => {
            //this works consistently beacuse of the renderer in the API
            let errors = []
            try {
                const errorData = JSON.parse(err.response.data).errors
                for(let key in errorData) {
                    errors.push( ...errorData[key])
                }
            }
            catch {
                errors = ["Something went wrong signing up"]
            }
            dispatch(authFailure(errors))
                
        })
    }
}

export const asyncLogin = (username, password, token) => {
    return dispatch => {
        let headers = {}
        const login_data = {
            username, password
        }
        if(token !== null) {
            axios.post('http://127.0.0.1:8000/api/auth/refresh/', {token : token})
            .then(res => {
                token = res.data.token
            })
            .catch(err => console.log(err))

            headers = {
                Authorization: `JWT ${token}`,
            }
        }

        axios.post('http://127.0.0.1:8000/api/auth/login/', login_data, {headers: headers})
        .then(res => {
            console.log(res)
            dispatch(authSuccess(res.data))            
        })
        // dispatch(registerSuccess(res.data)))
        .catch(err => {
            console.log(err.response)
            //this works consistently beacuse of the renderer in the API
            dispatch(authFailure([err.response.data.error, err.response.data.detail]))
        })
    }
}