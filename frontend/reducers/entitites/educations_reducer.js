import {
    RECEIVE_USER
} from "../../actions/users_actions";

import {
    merge
} from "lodash"
import {
    RECEIVE_EDUCATION,
    DELETE_EDUCATION,
    CLEAR_EDUCATIONS
} from "../../actions/educations_actions";



export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER:
            return merge({}, state, action.user.educations)
        case RECEIVE_EDUCATION:
            return merge({}, state, action.education)
        case DELETE_EDUCATION:
            const newState = merge({}, state)
            delete newState[action.educationId]
            return newState
        case CLEAR_EDUCATIONS:
            return {}
            default:
                return state
    }
}