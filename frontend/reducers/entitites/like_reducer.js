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
            return merge({}, state, action.posts.likes)
        default:
            return state
    }
}