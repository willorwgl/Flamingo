import * as educationUtil from "../util/education_util"

export const RECEIVE_EDUCATION = "RECEIVE_EDUCATION"
export const DELETE_EDUCATION = "DELETE_EDUCATION"
export const CLEAR_EDUCATIONS = "CLEAR_EDUCATIONS"


export const receiveEducation = (education) => {
    return {
        type: RECEIVE_EDUCATION,
        education
    }
}


export const deleteEducation = (educationId) => {
    return {
        type: DELETE_EDUCATION,
        educationId
    }
}



export const destroyEducation = educationId => dispatch => {
    return educationUtil.deleteEducation(educationId).then(() => {
        dispatch(deleteEducation(educationId))
    })
}

export const patchEducation = education => dispatch => {
    return educationUtil.updateEducation(education).then((updatedEducation) => {
        dispatch(receiveEducation(updatedEducation))
    })
}

export const createEducation = education => dispatch => {
    return educationUtil.createEducation(education).then(newEducation => {
        dispatch(receiveEducation(newEducation))
    })
}