import {
    RECEIVE_LIKE,
    DELETE_LIKE
} from "../../actions/likes_actions"
import {
    RECEIVE_POSTS
} from "../../actions/posts_actions"
import {
    merge
} from "lodash"
import { RECEIVE_COMMENTS } from "../../actions/comments_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_LIKE:
            return merge({}, state, action.like)
        case DELETE_LIKE:
        debugger
            const newState = merge({}, state)
            delete newState[action.id]
            return newState
        case RECEIVE_POSTS:
            const temp = merge({}, state, action.posts.likes)
            debugger
            return merge({}, temp, action.posts.comments.likes)
        case RECEIVE_COMMENTS:

        default:
            return state
    }
}