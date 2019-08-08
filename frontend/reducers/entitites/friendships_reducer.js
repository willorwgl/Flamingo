import { RECEIVE_FRIEND, RECEIVE_FRIENDS, DELETE_FRIEND } from "../../actions/friendships_actions";
import { merge } from "lodash"


export default (state = {}, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_FRIEND:
            return merge({}, state, action.friendship)
        case RECEIVE_FRIENDS:
            return merge(action.friendships)
        case DELETE_FRIEND:
            const newState = merge({}, state)
            delete newState[action.friendshipId]
            return newState
        default:
            return state
    }
}