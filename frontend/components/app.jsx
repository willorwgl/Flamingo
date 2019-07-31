import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./flaming_home_page";
import UserNavBar from "./navbars/user_nav_bar";
export default () => (
  <div>
    <Route path="/" component={UserNavBar} />
    <Route path="/" component={HomePage} />
  </div>
);
