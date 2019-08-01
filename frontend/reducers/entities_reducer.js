import usersReducer from "./entitites/users_reducer"
import postsReducer from "./entitites/posts_reducer"
import { combineReducers } from "redux";


export default combineReducers({
    users: usersReducer,
    posts: postsReducer
})