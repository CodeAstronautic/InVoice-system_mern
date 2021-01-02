import axios from 'axios';
//import data from '../Layout/invoice/invoice'
import {
    SET_LOADING,
    GET_ERRORS,
    SET_MESSAGE
} from './types';


export const createInvoice = (invoiceData, history) => (dispatch) => {
    const config = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };
    axios
        .post('http://localhost:8000/api/invoice/create', invoiceData, {headers: config})
        .then(() => {
            const msg = {
                content: 'invoice Created Successfully',
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

//
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