


export const createEducation = (education) => {
    return $.ajax({
        method: "POST",
        url: "api/educations",
        data: {
            education
        }
    })
}

export const updateEducation = (education) => {
    return $.ajax({
        method: "PATCH",
        url: `api/educations/${education.id}`,
        data: {
            education
        }
    })
}

export const deleteEducation = (id) => {
    return $.ajax({
        method: "DELETE",
        url: `api/educations/${id}`,
    })
}