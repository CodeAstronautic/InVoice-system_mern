import axios from 'axios';
import {
    SET_LOADING,
    GET_USERS,

    GET_ERRORS,
    SET_MESSAGE
} from './types';

export const getUsers = (searchData ,user_id) => (dispatch) => {
    dispatch(setLoading());
    axios
        .post(`http://localhost:8000/api/users/${user_id}`, searchData)
        .then((res) => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: GET_USERS,
                payload: null
            });
        });
};

export const createUser = (userData, history) => (dispatch) => {
    axios
        .post('http://localhost:8000/api/users/create', userData)
        .then(() => {
            const msg = {
                content: 'user Created Successfully',
                type: 'success'
            };
            dispatch(setMessage(msg));
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const updateUser = (userData, history, user_id) => dispatch => {
    axios.put(`http://localhost:8000/api/users/${user_id}`, userData)
        .then(() => {
            const msg = {
                content: 'user Updated Successfully',
                type: 'success'
            };
            dispatch(setMessage(msg));
            history.push('/users');
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const deleteUser = (user_id) => (dispatch) => {
    axios
        .delete(`http://localhost:8000/api/users/${user_id}`)
        .then(() => {
            dispatch(getUsers({ id : user_id}));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

export const setMessage = (msg) => {
    return {
        type: SET_MESSAGE,
        payload: msg
    };
};

export const clearErrors = () => {
    return {
        type: GET_ERRORS,
        payload: {}
    };
}