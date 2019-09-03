import * as LikeUtil from "../util/like_util";
export const RECEIVE_LIKE = "RECEIVE_LIKE"
export const RECEIVE_LIKES = "RECEIVE_LIKES"
export const DELETE_LIKE = "DELETE_LIKE"


export const receiveLike = (like) => {
    return {
        type: RECEIVE_LIKE,
        like
    }
}

export const receiveLikes = (likes) => {
    return {
        type: RECEIVE_LIKES,
        likes
    }
}

export const deleteLike = likeId => {
    return {
        type: DELETE_LIKE,
        id: likeId
    }
}

export const addLike = like => dispatch => {
    return LikeUtil.addLike(like).then(newLike =>
        dispatch(receiveLike(newLike)))
}

export const fetchLikes = (likeableType, likeableId) => dispatch => {
    return LikeUtil.fetchLikes(likeableType, likeableId).then(
        likes => dispatch(receiveLikes(likes))
    )
}

export const destroyLike = likeId => dispatch => {
    return LikeUtil.destroyLike(likeId).then( () => {
        dispatch(deleteLike(likeId))
    } )
} 

export const updateLike = like => dispatch => {
    return LikeUtil.updateLike(like).then( (newLike) => {
        dispatch(receiveLike(newLike))
    })
}