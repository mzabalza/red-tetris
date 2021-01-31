import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import setAuthToken from '../../utils/setAuthToken';

import { setAlert } from './alert';

// Load User
// TODO: FINISH
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth`);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });

    }
}

// Register User
export const register = ({ name, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, password });
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        console.log('user registered');
    } catch (err) {
        console.log('Error in user registration');
        const errors = err.response.data.errors;
        if (err) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
        }
        dispatch({
            type: AUTH_ERROR
        });

    }
}

export const login = ({ name, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (err) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
        }

        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
};


