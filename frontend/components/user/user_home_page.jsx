import React from "react";
import Profile from "./profiles/profile";
import { Link } from "react-router-dom"

class UserHomePage extends React.Component {
  render() {
    return (
      <div className="user-home-page">
        <Link to="/user/19">Demo user profile</Link>
      </div>
    );
  }
}

export default UserHomePage;
