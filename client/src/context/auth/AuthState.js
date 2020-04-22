import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    SET_CONTACT
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }

    }

    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            })
            loadUser();
        } catch (error) {

            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.errors[0].msg
            })
        }

    }
    const logout = () => dispatch({ type: 'LOGOUT' });

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })
    const loadUser = async () => {

        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await axios.get('api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {

            dispatch({
                type: AUTH_ERROR
            })
        }
    }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
                loading: state.loading
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;