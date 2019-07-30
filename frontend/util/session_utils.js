export const postUser = (user) => {
    return $.ajax( {
        method: "POST",
        url: "/api/users",
        data: {user}
    })
}

export const postSession = (session) => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: {
            session
        }
    })
}

export const deleteSession = () => {
    return $.ajax({
        method: "DELETE",
        url: "/api/users",
    })
}