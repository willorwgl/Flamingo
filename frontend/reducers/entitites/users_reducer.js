import {
    RECEIVE_USER,
    RECEIVE_USERS
} from "../../actions/users_actions"
import {
    merge
} from "lodash"
import {
    RECEIVE_POSTS
} from "../../actions/posts_actions";

import {
    RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER 
} from "../../actions/session_actions"
import { RECEIVE_FRIENDS } from "../../actions/friendships_actions";

export default (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_USER:
            return merge({}, state, action.user)
        case RECEIVE_USERS:
            return merge({}, state, action.users)
        case RECEIVE_CURRENT_USER:
            return merge({}, state, action.user)
        case RECEIVE_POSTS:
            return merge({}, state, action.posts.authors)
        case RECEIVE_FRIENDS:
            return merge({}, state, action.friendships.friends)
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}