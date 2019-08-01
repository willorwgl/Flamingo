

export const requestPosts = (id, type) => {
    return $.ajax({
        method: "GET",
        url: `api/users/${id}/posts`,
        data: {
            type
        }
    })
}

export const createPost = (post) => {
    return $.ajax({
        method: "POST",
        url: "api/posts",
        data: { post }
    })
}

export const updatePost = (post) => {
    return $.ajax({
        method: "PATCH",
        url: "api/posts",
        data: { post }
    })
}

export const deletePost = (id) => {
    return $.ajax({
        method: "DELETE",
        url: "api/posts",
        data: {id}
    })
}