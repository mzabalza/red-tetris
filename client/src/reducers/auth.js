import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: true,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log('Global auth reducer');
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log('token reducers');
            console.log('Setting token in localStorage');
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            console.log('reducer romeve token');
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}