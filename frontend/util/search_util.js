

export const search = (queryString, type) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/:user_id/users/search/${queryString}`,
        data: { type } 
    })
}



