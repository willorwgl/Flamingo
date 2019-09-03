export const addLike = (like) => {
    return $.ajax({
        method: "POST",
        url: "/api/likes",
        data: {
            like
        }
    })
}

export const fetchLikes = (likeableType, likeableId) => {
    return $.ajax({
        method: "GET",
        url: "/api/likes",
        data: {
            likeable_id: likeableId,
            likeable_type: likeableType
        }
    })
}

export const destroyLike = likeId => {
    debugger
    return $.ajax({
        method: "DELETE",
        url: `/api/likes/${likeId}`
    })
}

export const updateLike = like => {
    return $.ajax({
        method: "PATCH",
        url: `/api/likes/${like.id}`,
        data: {
            like
        }
    })
}