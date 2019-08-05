import * as CommentUtil from "../util/comment_util"


export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const CLEAR_COMMENTS = "CLEAR_COMMENTS"



export const receiveComment = (comment) => {
    return {
        type: RECEIVE_COMMENT,
        comment
    }
}

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const requestComments = postId => dispatch => {
    return CommentUtil.requestComments(postId).then(
        (comments) => dispatch(receiveComments(comments))
    )
}

export const destroyComment = commentId => dispatch => {
    return CommentUtil.destroyComment(commentId).then( () => {
        dispatch(deleteComment(commentId))
    })
}

export const patchComment = comment => dispatch => {
    return CommentUtil.patchComment(comment).then( (updatedComment) => {
        dispatch(receiveComment(updatedComment))
    })
}

export const createComment = comment => dispatch => {
    return CommentUtil.createComment(comment).then( newComment => {
        dispatch(receiveComment(newComment))
    })
}