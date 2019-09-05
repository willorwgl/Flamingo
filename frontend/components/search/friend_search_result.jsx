import React from "react";
import {
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest
} from "../../actions/friendships_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class FriendSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFriendOptions: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.cancelFriendRequest = this.cancelFriendRequest.bind(this);
  }

  handleMouseEnter(e) {
    if (this.state.showFriendOptions) return;
    this.setState({ showFriendOptions: true });
  }

  handleMouseLeave(e) {
    if (this.state.showFriendOptions) {
      this.setState({ showFriendOptions: false });
    }
  }

  sendFriendRequest(e) {
    e.preventDefault();
    const { sendFriendRequest, friend } = this.props;
    sendFriendRequest(friend);
  }

  acceptFriendRequest(e) {
    e.preventDefault();
    const { acceptFriendRequest, friendship } = this.props;
    acceptFriendRequest(friendship.id);
  }

  cancelFriendRequest(e) {
    e.preventDefault();

    const { cancelFriendRequest, friendship } = this.props;
    cancelFriendRequest(friendship.id);
  }

  friendButton() {
    const { currentUser = {}, friend = {}, friendship } = this.props;
    if (currentUser.id === friend.id) {
;
      return null;
    }
    if (!friendship) {
;
      return (
        <button className="friend-button" onClick={this.sendFriendRequest}>
          <i className="fas fa-user-plus" /> Add Friend
        </button>
      );
    }
    if (
      friendship.friend_id === currentUser.id &&
      friendship.status === "pending"
    ) {

      return (
        <button className="friend-button" onClick={this.acceptFriendRequest}>
          Confirm Request
        </button>
      );
    }
    if (
      friendship.friend_id !== currentUser.id &&
      friendship.status === "pending"
    ) {

      return (
        <button
          className="friend-button"
          onMouseOver={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <i className="fas fa-user-plus" /> Friend Request Sent
          {this.state.showFriendOptions ? this.friendButtonOptions() : null}
        </button>
      );
    }
    if (friendship.status === "accepted") {

      return (
        <button
          className="friend-button"
          onMouseOver={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <i className="fas fa-check" /> Friends
          {this.state.showFriendOptions ? this.friendButtonOptions() : null}
        </button>
      );
    }

  }

  friendButtonOptions() {
    const { currentUser = {}, friendship = {} } = this.props;
    if (!friendship) {
      return null;
    }
    if (
      currentUser.id === friendship.user_id &&
      friendship.status === "pending"
    ) {
      return (
        <div
          className="friend-options-container"
          onMouseLeave={this.handleMouseLeave}
          onMouseOver={this.handleMouseEnter}
        >
          <div className="friend-options">
            <div
              className="cancel-friend-request"
              onClick={this.cancelFriendRequest}
            >
              Cancel Request
            </div>
          </div>
        </div>
      );
    }
    if (friendship.status === "accepted") {
      return (
        <div
          className="friend-options-container"
          onMouseLeave={this.handleMouseLeave}
          onMouseOver={this.handleMouseEnter}
        >
          <div className="friend-options">
            <div className="unfriend-button" onClick={this.cancelFriendRequest}>
              Unfriend
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const {
      profilePhoto = window.defaultUserIcon,
      id,
      first_name,
      last_name
    } = this.props.friend;
    return (
      <div className="person-result">
        <Link to={`/user/${id}`}>
          <img src={profilePhoto} className="search-person-icon" />
        </Link>
        <div className="search-user-name-container">
          <Link to={`/user/${id}`} className="user-name-link">
            {first_name} {last_name}
          </Link>
          {this.friendButton()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (queryString, type) => dispatch(searchUsers(queryString, type)),
    requestUserFriendships: id => dispatch(requestFriendships(id)),
    sendFriendRequest: friend => dispatch(sendFriendRequest(friend)),
    acceptFriendRequest: friendshipId =>
      dispatch(acceptFriendRequest(friendshipId)),
    cancelFriendRequest: friendshipId =>
      dispatch(cancelFriendRequest(friendshipId))
  };
};

const mapStateToProps = (state, ownProps) => {
  const friend = ownProps.friend;
  const currentUser = state.session.currentUser;
  const friendship = Object.values(state.entities.friendships).find(
    friendship => {
      return (
        (friendship.user_id === currentUser.id &&
          friendship.friend_id === friend.id) ||
        (friendship.user_id === friend.id &&
          friendship.friend_id === currentUser.id)
      );
    }
  );

  return {
    currentUser: state.session.currentUser,
    friendship
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendSearchResult);
