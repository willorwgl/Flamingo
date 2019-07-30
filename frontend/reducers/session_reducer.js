import {
    RECEIVE_USER,
    LOGOUT_CURRENT_USER
} from "../actions/session_actions"


const _nullSession = {
    current_user: null
}
export default (state = _nullSession, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, {
                current_user: action.user
            })
        case LOGOUT_CURRENT_USER:
            return _nullSession
        default:
            return state
    }
}