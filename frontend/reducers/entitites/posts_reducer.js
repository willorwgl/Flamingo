import {
    RECEIVE_POST,
    DELETE_POST,
    RECEIVE_POSTS
} from "../../actions/posts_actions"



export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_POST:
            return Object.assign({}, state, action.post)
        case DELETE_POST:
            const newState = Object.assign({}, state)
            delete newState[action.id]
            return newState
        case RECEIVE_POSTS:
            return action.posts
        default:
            return state
    }
}