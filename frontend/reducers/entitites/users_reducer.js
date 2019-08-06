import {
    RECEIVE_USER
} from "../../actions/users_actions"
import {
    merge
} from "lodash"
import {
    RECEIVE_POSTS
} from "../../actions/posts_actions";

import {
    RECEIVE_CURRENT_USER 
} from "../../actions/session_actions"

export default (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_USER:
            return merge({}, state, action.user)
        case RECEIVE_CURRENT_USER:
            return merge({}, state, action.user)
        case RECEIVE_POSTS:
            return merge({}, state, action.posts.authors)
        default:
            return state
    }
}