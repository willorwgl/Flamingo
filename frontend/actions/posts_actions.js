import * as PostUtil from "../util/post_util"

export const RECEIVE_POST = "RECEIVE_POST"
export const DELETE_POST = "DELETE_POST"
export const RECEIVE_POSTS = "RECEIVE_POSTS"

export const receivePost = (post) => {
    return {
        type: RECEIVE_POST,
        post
    }
}

export const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        postId: id
    }
}



export const updatePost = (post) => dispatch => {
    return PostUtil.updatePost(post).then((updatedPost) => dispatch(receivePost(updatedPost)))
}

export const createPost = (post) => dispatch => {
    return PostUtil.createPost(post).then((newPost) => {
        dispatch(receivePost(newPost))
    })
}

export const destroyPost = (id) => dispatch => {
    return PostUtil.deletePost(id).then(() => {
        dispatch(deletePost(id))
    })
}

export const requestPosts = (id, type) => dispatch => {

    return PostUtil.requestPosts(id, type).then((posts) => {

        dispatch(receivePosts(posts))
    });
}