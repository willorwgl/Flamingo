import { merge } from "lodash"

import {
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    DELETE_COMMENT,
    CLEAR_COMMENTS
} from "../../actions/comments_actions"

export default (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {

        case RECEIVE_COMMENTS: 
            // return action.comments
            return merge({}, state, action.comments)
        case RECEIVE_COMMENT:
            return merge({}, state, action.comment)
        case DELETE_COMMENT:
            const newState = Object.assign({}, this.state)
            delete newState[action.id]
            return newState
        case CLEAR_COMMENTS: 
            return {}
        default:
            return state
    }
}