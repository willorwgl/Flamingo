import {
    RECEIVE_FRIEND,
    RECEIVE_FRIENDS,
    DELETE_FRIEND
} from "../../actions/friendships_actions";
import {
    merge
} from "lodash"
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";


export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_FRIEND:
            return merge({}, state, action.friendship)
        case RECEIVE_FRIENDS:
            return merge({}, state, action.friendships)
        case DELETE_FRIEND:

            const newState = merge({}, state)
            newState.friends = newState.friends || {}
            const user_id = newState[action.friendshipId].user_id
            const friend_id = newState[action.friendshipId].friend_id
            delete newState[action.friendshipId]
            if (newState.friends[user_id]) delete newState.friends[user_id]
            if (newState.friends[friend_id])  delete newState.friends[friend_id]
            return newState
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}