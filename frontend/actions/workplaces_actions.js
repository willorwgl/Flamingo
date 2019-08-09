

import * as workplaceUtil from "../util/workplace_util" 

export const RECEIVE_WORKPLACE = "RECEIVE_WORKPLACE"
export const DELETE_WORKPLACE = "DELETE_WORKPLACE"
export const CLEAR_WORKPLACES = "CLEAR_WORKPLACES"




export const receiveWorkplace = (workplace) => {
    return {
        type: RECEIVE_WORKPLACE,
        workplace
    }
}

// export const receiveWorkplaces = (workplaces) => {
//     return {
//         type: RECEIVE_WORKPLACE,
//         workplaces
//     }
// }

export const deleteWorkplace = (workplaceId) => {
    return {
        type: DELETE_WORKPLACE,
        workplaceId
    }
}

// export const requestWorkplaces = postId => dispatch => {
//     return workplaceUtil.requestworkplaces(postId).then(
//         (workplaces) => dispatch(receiveworkplaces(workplaces))
//     )
// }

export const destroyWorkplace = workplaceId => dispatch => {
    return workplaceUtil.deleteWorkplace(workplaceId).then(() => {
        dispatch(deleteWorkplace(workplaceId))
    })
}

export const patchWorkplace = workplace => dispatch => {
    return workplaceUtil.updateWorkplace(workplace).then((updatedWorkplace) => {
        dispatch(receiveWorkplace(updatedWorkplace))
    })
}

export const createWorkplace = workplace => dispatch => {
    return workplaceUtil.createWorkplace(workplace).then(newWorkplace => {
        dispatch(receiveWorkplace(newWorkplace))
    })
}