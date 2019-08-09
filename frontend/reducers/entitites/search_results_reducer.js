import { RECEIVE_USERS, RECEIVE_LITE_USERS } from "../../actions/users_actions";
import { CLEAR_RESULTS } from "../../actions/search_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";




export default (state = { }, action) => {
    Object.freeze(state)
    let newState
    switch (action.type) {
        case RECEIVE_USERS:
            newState = Object.assign({}, state)
            if (action.users.lite_users) {
                newState.liteUsers = action.users.lite_users
            } 
            if (action.users.full_users) {
                newState.fullUsers = action.users.full_users
            }
            return newState
        case CLEAR_RESULTS:
            newState = Object.assign({}, state)
            newState.liteUsers = {}
            return newState
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}