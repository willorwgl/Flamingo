import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProfileNavBar extends React.Component {
  render() {
    const acceptedFriends =
      Object.values(this.props.acceptedFriends).length || null;
    const { id } = this.props.profileUser;
    return (
      <div className="profile-nav-bar">
        <span className="timeline-nav-link">
          <Link to={`/user/${id}`}>
            Timeline
          </Link>
        </span>

        <span className="about-nav-link">
          <Link to={`/user/${id}/about`}> About</Link>
        </span>

        <span className="frien ds-nav-link">
          <Link to={`/user/${id}/friends`}> Friends </Link>
        </span>

        <span className="photos-nav-link">Photos</span>

        {/* <span className="archive-nav-link">
          <i className="fas fa-lock" /> Archive
        </span>

        <span className="more-nav-link">
          More <i className="fas fa-caret-down" />
        </span> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const acceptedFriends = state.entities.friendships.friends || {};
  return {
    acceptedFriends
  };
};

export default connect(mapStateToProps)(ProfileNavBar);
