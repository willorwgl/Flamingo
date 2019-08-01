import React from "react";

class ProfileNavBar extends React.Component {
  render() {
    return (
      <div className="profile-nav-bar">
        <span className="timeline-nav-link">
          Timeline <i className="fas fa-caret-down" />
        </span>

        <span className="about-nav-link">About</span>

        <span className="friends-nav-link">Friends </span>

        <span className="photos-nav-link">Photos</span>

        <span className="archive-nav-link">
          <i className="fas fa-lock" />Archive
        </span>

        <span className="more-nav-link">
          More <i className="fas fa-caret-down" />
        </span>
      </div>
    );
  }
}

export default ProfileNavBar;
