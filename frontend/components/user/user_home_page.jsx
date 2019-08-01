import React from "react";
import Profile from "./profiles/profile";

class UserHomePage extends React.Component {
  render() {
    return (
      <div className="user-home-page">
        Logged in
        <Profile />
      </div>
    );
  }
}

export default UserHomePage;
