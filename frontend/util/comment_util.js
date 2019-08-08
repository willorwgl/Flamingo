


export const requestComments = (postId) => {
    return $.ajax({
        method: "GET",
        url: `/api/posts/${postId}/comments`
    })
}

export const destroyComment = (commentId) => {
    return $.ajax( {
        method: "DELETE",
        url: `/api/comments/${commentId}`
    })
}

export const patchComment = (comment) => {
    return $.ajax( {
        method: "PATCH",
        url: `/api/comments/${comment.id}`,
        data: { comment }
    })
}

export const createComment = (comment) => {
    return $.ajax({
        method: "POST",
        url: "/api/comments",
        data: { comment }
    })
}