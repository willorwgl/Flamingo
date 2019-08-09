

export const createWorkplace = (workplace) => {
    return $.ajax({
        method: "POST",
        url: "api/workplaces",
        data: {
            workplace
        }
    })
}

export const updateWorkplace = (workplace) => {
    return $.ajax({
        method: "PATCH",
        url: `api/workplaces/${workplace.id}`,
        data: {
            workplace
        }
    })
}

export const deleteWorkplace = (id) => {
    return $.ajax({
        method: "DELETE",
        url: `api/workplaces/${id}`,
    })
}