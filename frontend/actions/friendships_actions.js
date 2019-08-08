export const DELETE_FRIEND = "DELETE_FRIEND"
export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS"
export const RECEIVE_FRIEND = "RECEIVE_FRIEND"

import * as FriendshipUtil from "../util/friendship_util"

export const receiveFriend = (friendship) => {
    return {
        type: RECEIVE_FRIEND,
        friendship
    }
}

export const receiveFriends = friendships => {
    return {
        type: RECEIVE_FRIENDS,
        friendships
    }
}

export const deleteFriend = friendshipId => {
    return {
        type: DELETE_FRIEND,
        friendshipId
    }
}

export const sendFriendRequest = friend => dispatch => {
    return FriendshipUtil.sendFriendRequest(friend).then((friendship) => {
        dispatch(receiveFriend(friendship))
    })
}

export const acceptFriendRequest = friendshipId => dispatch => {
    return FriendshipUtil.acceptFriendRequest(friendshipId).then( (friendship) => {
        dispatch(receiveFriend(friendship))
    })
}

export const cancelFriendRequest = friendshipId => dispatch => {
    return FriendshipUtil.cancelFriendRequest(friendshipId).then(() => {
        dispatch(deleteFriend(friendshipId))
    })
}

export const requestFriendships = userId => dispatch => {
    return FriendshipUtil.requestFriendships(userId).then(friendships => dispatch(receiveFriends(friendships)))
}