import usersReducer from "./entitites/users_reducer"
import { combineReducers } from "redux";


export default combineReducers({
    users: usersReducer
})