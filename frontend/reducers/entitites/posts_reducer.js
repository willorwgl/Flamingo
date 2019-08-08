import {
    RECEIVE_POST,
    DELETE_POST,
    RECEIVE_POSTS
} from "../../actions/posts_actions"
import { merge } from "lodash"



export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_POST:
            return merge({}, state, action.post.post)
        case DELETE_POST:
            const newState = Object.assign({}, state)
            delete newState[action.postId]
            return newState
        case RECEIVE_POSTS:
            return  action.posts.posts || {}
        default:
            return state
    }
}