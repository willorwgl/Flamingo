import React from "react";
import { connect } from "react-redux";
import FriendItem from "./friend";
import { requestFriendships } from "../actions/friendships_actions";

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

  componentDidMount() {
    const { currentUser, requestFriendships } = this.props
    requestFriendships(currentUser.id)
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

const mapStateToProps = (state, ownProps ) => {
  const profileUserId = +ownProps.match.params.id
  const friendships = Object.values(state.entities.friendships).filter(
    friendship => {
      return (
        friendship.user_id === profileUserId ||
        friendship.friend_id === profileUserId ||
        friendship.state === "accepted"
      );
    }
  );
  const friendshipIds = friendships.map(friendship => {
    return friendship.user_id === profileUserId
      ? friendship.friend_id
      : friendship.user_id;
  });
  const acceptedFriends = Object.values(state.entities.users).filter(user => {
    return friendshipIds.includes(user.id);
  });
  const { currentUser } = state.session
  return {
    acceptedFriends,
    currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestFriendships: (userId) => dispatch(requestFriendships(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
