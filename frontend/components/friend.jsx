import React from "react";
import { cancelFriendRequest, acceptFriendRequest } from "../actions/friendships_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class FriendItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFriendOptions: false
    };
    this.cancelFriendRequest = this.cancelFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
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

  cancelFriendRequest(e) {
    e.preventDefault()
    const { cancelFriendRequest, friendship } = this.props;
    cancelFriendRequest(friendship.id);
  }
  
  acceptFriendRequest(e) {
    e.preventDefault();
    const { acceptFriendRequest, friendship } = this.props;
    acceptFriendRequest(friendship.id);
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
          <i className="fas fa-user-plus" /> Request Sent
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
      first_name,
      last_name,
      id
    } = this.props.friend;
    const fullName = `${first_name} ${last_name}`;
    return (
      <div className="friend-item">
        <Link to={`/user/${id}`} className="friend-image-container">
          <img src={profilePhoto} className="friend-item-image" />
        </Link>
          <Link to={`/user/${id}`} className="user-name-link friend-info" >
            {fullName}
          </Link>

        <div className="friend-item-button">{this.friendButton()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const profileUser = ownProps.friend;
  const friendship = Object.values(state.entities.friendships).find(
    friendship => {
      return (
        (friendship.user_id === currentUser.id &&
          friendship.friend_id === profileUser.id) ||
        (friendship.user_id === profileUser.id &&
          friendship.friend_id === currentUser.id)
      );
    }
  );
  return {
    currentUser,
    friendship
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelFriendRequest: friendshipId =>
      dispatch(cancelFriendRequest(friendshipId)),
      acceptFriendRequest: friendshipId => dispatch(acceptFriendRequest(friendshipId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendItem);
