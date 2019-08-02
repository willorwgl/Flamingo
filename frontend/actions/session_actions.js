import {
    postUser,
    postSession,
    deleteSession
} from "../util/session_utils"

export const RECEIVE_USER = "RECEIVE_USER"
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = "CLEAR_ERRORS"

export const receiveCurrentUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER
    }
}

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

export const createNewUser = (user) => dispatch => {
    return postUser(user)
        .then(response => dispatch(receiveCurrentUser(response)))
}

export const login = (user) => dispatch => {
    return postSession(user)
        .then(response => dispatch(receiveCurrentUser(response)), (errors) => {
            dispatch(receiveErrors(errors.responseJSON))
        })
}

export const logout = () => dispatch => {
    return deleteSession()
        .then(() => dispatch(logoutCurrentUser()))
}