import React from "react";
import SidebarIntro from "./sidebar_intro";
import SidebarPhotos from "./sidebar_photos";
import SidebarFriends from "./sidebar_friends"

class ProfileSidebar extends React.Component {
  render() {
    return (
      <div className="profile-sidebar">
        <SidebarIntro />
        <SidebarPhotos />
        <SidebarFriends />
      </div>
    );
  }
}

export default ProfileSidebar;
