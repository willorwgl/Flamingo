import * as UserUtil from "../util/user_util"

export const RECEIVE_USER = "RECEIVE_USER"


export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const requestUser = (id) => dispatch => {
    return UserUtil.requestUser(id).then((user) => {
        dispatch(receiveUser(user))
    })
}

export const updateUser = user => dispatch => {
    return UserUtil.updateUser(user).then(user => {
        dispatch(receiveUser(user))
    })
}