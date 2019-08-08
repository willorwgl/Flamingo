import {
    RECEIVE_SESSION_ERRORS,
    CLEAR_ERRORS
} from '../actions/session_actions';


import {
    RECEIVE_USER
} from "../actions/users_actions"

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case CLEAR_ERRORS:
            return {}
            case RECEIVE_USER:
                return {};
            default:
                return state;
    }
};