import React from "react";
import { connect } from "react-redux";
import FriendItem from "./friend";
import { requestFriendships } from "../actions/friendships_actions";
import { throws } from "assert";

class FriendsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "accepted"
    };
  }
  acceptedfriends() {
    const acceptedFriends = Object.values(this.props.acceptedFriends);
    const friends = acceptedFriends.map(friend => {
      return <FriendItem friend={friend} />;
    });
    if (friends.length) {
      return <div className="user-friends">{friends}</div>;
    }
    return null;
  }

  requestedFriends() {
    const requestedFriends = Object.values(this.props.requestedFriends);
    const friends = requestedFriends.map(friend => {
      return <FriendItem friend={friend} />;
    });
    if (friends.length) {
      return <div className="user-friends">{friends}</div>;
    }
    return null;
  }

  receivedFriends() {
    const receivedFriends = Object.values(this.props.receivedFriends);
    const friends = receivedFriends.map(friend => {
      return <FriendItem friend={friend} />;
    });
    if (friends.length) {
      return <div className="user-friends">{friends}</div>;
    }
    return null;
  }

  componentDidMount() {
    const { currentUser, requestFriendships } = this.props;
    requestFriendships(currentUser.id);
  }

  handleSectionSelection(section) {
    return e => {
      this.setState({ section });
    };
  }

  friendsDisplay() {
    const { section } = this.state;
    if (section === "accepted") {
      return this.acceptedfriends();
    } else if (section === "requested") {
      return this.requestedFriends();
    } else {
      return this.receivedFriends();
    }
  }

  render() {
    const { section } = this.state
    return (
      <div className="friends-container">
        <div className="friends-container-header">
          <div className="friends-header-label">
            <i className="fas fa-user-friends friends-header-icon" />{" "}
            <span className="friends-label">Friends</span>
          </div>
          <div className="friends-header-options">
            <span
              className={`friend-header-option ${
                section === "accepted" ? "friend-header-option-selected" : ""
                }`}
              onClick={this.handleSectionSelection("accepted")}
            >
              Accepted
            </span>
            <span
              className={`friend-header-option ${
                section === "requested" ? "friend-header-option-selected" : ""
                }`}
              onClick={this.handleSectionSelection("requested")}
            >
              Requested
            </span>
            <span
              className={`friend-header-option ${
                section === "received" ? "friend-header-option-selected" : ""
              }`}
              onClick={this.handleSectionSelection("received")}
            >
              Received
            </span>
          </div>
        </div>
        {this.friendsDisplay()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const profileUserId = +ownProps.match.params.id;
  const acceptedFriendships = [],
    requestedFriendships = [],
    receivedFriendships = [];
  Object.values(state.entities.friendships).forEach(friendship => {
    if (
      (friendship.user_id === profileUserId ||
        friendship.friend_id === profileUserId) &&
      friendship.status === "accepted"
    ) {
      acceptedFriendships.push(
        friendship.user_id === profileUserId
          ? friendship.friend_id
          : friendship.user_id
      );
    } else if (
      friendship.user_id === profileUserId &&
      friendship.status === "pending"
    ) {
      requestedFriendships.push(friendship.friend_id);
    } else if (
      friendship.friend_id === profileUserId &&
      friendship.status === "pending"
    ) {
      receivedFriendships.push(friendship.user_id);
    }
  });
  const acceptedFriends = [],
    requestedFriends = [],
    receivedFriends = [];
  Object.values(state.entities.users).forEach(user => {
    if (acceptedFriendships.includes(user.id)) {
      acceptedFriends.push(user);
    } else if (requestedFriendships.includes(user.id)) {
      requestedFriends.push(user);
    } else if (receivedFriendships.includes(user.id)) {
      receivedFriends.push(user);
    }
  });
  return {
    acceptedFriends,
    requestedFriends,
    receivedFriends,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestFriendships: userId => dispatch(requestFriendships(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsContainer);
