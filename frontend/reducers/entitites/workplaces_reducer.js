import { RECEIVE_USER } from "../../actions/users_actions";

import { merge } from "lodash"
import { RECEIVE_WORKPLACE, DELETE_WORKPLACE, CLEAR_WORKPLACES } from "../../actions/workplaces_actions";




export default (state= {}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_USER:
            return merge({}, state, action.user.workplaces)
        case RECEIVE_WORKPLACE:
            return merge({}, state, action.workplace)
        case DELETE_WORKPLACE: 
            const newState = merge({}, state)
            delete newState[action.workplaceId]
            return newState
        case CLEAR_WORKPLACES:
            return {}
        default: 
            return state
    }
}