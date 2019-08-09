import React from "react";
import { connect } from "react-redux";
import FriendItem from "./friend";

class FriendsContainer extends React.Component {
  friends() {
    const acceptedFriends = Object.values(this.props.acceptedFriends);
    const friends = acceptedFriends.map(friend => {
      return <FriendItem friend={friend} />;
    });
    if (friends.length) {
      return <div className="user-friends">{friends}</div>;
    }
    return null;
  }

  render() {
    return (
      <div className="friends-container">
        <div className="friends-container-header">
          <div className="friends-header-label">
            <i className="fas fa-user-friends friends-header-icon" />{" "}
            <span className="friends-label">Friends</span>
          </div>
          <div className="friends-header-options">
            <span>All Friends</span>
          </div>
        </div>

        {this.friends()}
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

export default connect(mapStateToProps)(FriendsContainer);
