import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    SET_CONTACT,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CONTACT_ERROR,
    GET_CONTACTS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [
                    action.payload,
                    ...state.contacts
                ]
            }
            
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts:
                    state.contacts.map(contact =>
                        contact._id === action.payload._id ? action.payload : contact)
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload)

            }
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts: [],
                error: null,
                current: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}