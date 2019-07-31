import ReactDOM from "react-dom"
import React from "react"
import configureStore from "./store/store"
import Root from "./components/root"



document.addEventListener("DOMContentLoaded", () => {
    let preloadedState = {};
    if (window.currentUser) {
        preloadedState = {
            entities: {
                users: {[window.currentUser.id]: window.currentUser},
            },
            session: {
                currentUser: window.currentUser,
            }
        }
    }
    const store = configureStore(preloadedState)
    window.getState = store.getState
    window.dispatch = store.dispatch
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root);
})