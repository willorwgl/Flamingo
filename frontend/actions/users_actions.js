import * as UserUtil from "../util/user_util"
import * as SearchUtil from "../util/search_util"

export const RECEIVE_USER = "RECEIVE_USER"
export const RECEIVE_USERS = "RECEIVE_USERS"
// export const RECEIVE_LITE_USERS = "RECEIVE_LITE_USERS"


export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}
// export const receiveLiteUsers = users => {
//     return {
//         type: RECEIVE_LITE_USERS,
//         users
//     }
// }


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

export const searchUsers = (queryString, type) => dispatch => {
    return SearchUtil.search(queryString, type).then( (result) => {
        dispatch(receiveUsers(result))
    })
}

