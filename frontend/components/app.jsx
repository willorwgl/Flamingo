import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util"
import HomePage from "./home_page";
import UserNavBar from "./navbars/user_nav_bar";
import Profile from "./user/profiles/profile"
import LoginPage from "./login_page";

export default () => (
  <div>
    <Route path="/" component={UserNavBar} />
    <Route path="/" exact component={HomePage} />
    <AuthRoute path="/login" exact component={LoginPage}/>
    <Route path="/user/:id" exact component={Profile} />
  </div>
);
