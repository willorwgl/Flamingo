import { merge } from "lodash"

import {
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    DELETE_COMMENT,
    CLEAR_COMMENTS
} from "../../actions/comments_actions"
import { RECEIVE_POSTS } from "../../actions/posts_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

export default (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_COMMENTS: 
            return merge({}, state, action.comments)
        case RECEIVE_COMMENT:
            return merge({}, state, action.comment)
        case DELETE_COMMENT:
            const newState = Object.assign({}, state)
            delete newState[action.commentId]
            return newState
        case CLEAR_COMMENTS: 
            return {}
        case RECEIVE_POSTS: 
            return merge({}, state, action.posts.comments)
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}