import usersReducer from "./entitites/users_reducer"
import postsReducer from "./entitites/posts_reducer"
import commentsReducer from "./entitites/comments_reducer"
import friendshipsReducer from "./entitites/friendships_reducer"
import searchResultsReducer from "./entitites/search_results_reducer"
import educationsReducer from "./entitites/educations_reducer"
import workplacesReducer from "./entitites/workplaces_reducer"
import { combineReducers } from "redux";


export default combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    friendships: friendshipsReducer,
    searchResults: searchResultsReducer,
    educations: educationsReducer,
    workplaces: workplacesReducer
})