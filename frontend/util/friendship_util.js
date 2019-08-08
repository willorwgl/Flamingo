export const sendFriendRequest = (friend) => {
    return $.ajax({
        method: "POST",
        url: "/api/friendships",
        data: {
            friend
        }
    })
}

export const cancelFriendRequest = (friendshipId) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/friendships/${friendshipId}`
    })
}

export const acceptFriendRequest = (friendshipId) => {
    debugger
    return $.ajax({
        method: "PATCH",
        url: `/api/friendships/${friendshipId}`
    })
}

export const requestFriendships = (id) => {
    return $.ajax({
        method: "GET",
        url: `api/users/${id}/friendships`
    })
}