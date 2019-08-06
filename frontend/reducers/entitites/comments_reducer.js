import { merge } from "lodash"

import {
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    DELETE_COMMENT,
    CLEAR_COMMENTS
} from "../../actions/comments_actions"
import { RECEIVE_POSTS } from "../../actions/posts_actions";

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
        case RECEIVE_POSTS: 
            return merge({}, state, action.posts.comments)
        default:
            return state
    }
}