import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer'
import axios from 'axios';
import {
    CONTACT_ERROR,
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    SET_CONTACT,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);


    const getContacts = async contact => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });

        } catch (error) {

            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }



    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });

        } catch (error) {

            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    const deleteContact = async id => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });

        } catch (error) {

            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }
    const setCurrent = async contact => {

        dispatch({ type: SET_CURRENT, payload: contact })
    }
    const clearCurrent = contact => {
        dispatch({ type: CLEAR_CURRENT })
    }
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        } catch (error) {

            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACT });
    }
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
                deleteContact,
                current: state.current,
                setCurrent,
                clearCurrent,
                updateContact,
                error: state.error,
                getContacts,
                clearContacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;