import {
    RECEIVE_USER
} from "../../actions/session_actions"
import {
    merge
} from "lodash"

export default (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_USER:

            return merge({}, state, action.user)
        default:
            return state
    }
}