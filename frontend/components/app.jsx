import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util"
import HomePage from "./home_page";
import UserNavBar from "./navbars/user_nav_bar";
import Profile from "./user/profiles/profile"
import LoginPage from "./login_page";
import Modal from "./modal"
import SearchResult from "./search/search_result";

export default () => (
  <div>
    <Modal />
    <ProtectedRoute path="/" component={UserNavBar} />
    <Route path="/" exact component={HomePage} />
    <AuthRoute path="/login" exact component={LoginPage}/>
    <ProtectedRoute path="/user/:id" component={Profile} />
    <ProtectedRoute path="/search/:query_string" exact component={SearchResult}/>
  </div>
);
