import axios from 'axios';
import {
    SET_LOADING,
//GET_MONTHS,

    GET_ERRORS,
    SET_MESSAGE
} from './types';


export const createMonth = (monthData, history) => (dispatch) => {
    axios
        .post('http://localhost:8000/api/month/addMonth', monthData)
        .then(() => {
            const msg = {
                content: 'Month Created Successfully',
                type: 'success'
            };
            dispatch(setMessage(msg));
            history.push('/invoice');
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