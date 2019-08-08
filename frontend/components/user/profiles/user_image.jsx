import React from "react";
import { openModal } from "../../../actions/modal_actions";
import { connect } from "react-redux";
import {
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest
} from "../../../actions/friendships_actions";

class UserImage extends React.Component {
  // componentDidMount() {
  //     const { requestWallPosts } = this.props;
  //     const { id } = this.props.match.params;
  //     requestWallPosts(id, "wall");
  // }

  // componentDidUpdate(prevProps, prevState) {
  //     const { id: currentId } = this.props.match.params;
  //     const { id: prevId } = prevProps.match.params;
  //     if (currentId != prevId) {
  //         const { requestWallPosts } = this.props;
  //         requestWallPosts(currentId, "wall");
  //     }
  // }

  constructor(props) {
    super(props);
    this.state = {
      showFriendOptions: false
    };
    this.addProfilePhoto = this.addProfilePhoto.bind(this);
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.cancelFriendRequest = this.cancelFriendRequest.bind(this)
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

  friendButton() {
    const { currentUser, profileUser, friendship } = this.props;

    if (currentUser.id === profileUser.id) {
      return null;
    }
    if (!friendship) {
      return (
        <button className="friend-button" onClick={this.sendFriendRequest}>
          <i class="fas fa-user-plus" /> Add Friend
        </button>
      );
    }
    if (
      (friendship.friend_id === currentUser.id) &&
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
          <i class="fas fa-user-plus" /> Friend Request Sent
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
          <i class="fas fa-check" /> Friends
          {this.state.showFriendOptions ? this.friendButtonOptions() : null}
        </button>
      );
    }
  }

  friendButtonOptions() {
    const { currentUser, profileUser, friendship } = this.props;
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
            <div className="cancel-friend-request" onClick={this.cancelFriendRequest}>Cancel Request</div>
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
            <div className="unfriend-button" onClick={this.cancelFriendRequest}>Unfriend</div>
          </div>
        </div>
      );
    }
  }

  addProfilePhoto(e) {
    const { openModal } = this.props;
    openModal("add photo");
  }

  sendFriendRequest(e) {
    const { sendFriendRequest, profileUser } = this.props;
    sendFriendRequest(profileUser);
  }

  acceptFriendRequest(e) {
    const { acceptFriendRequest, friendship } = this.props;
    acceptFriendRequest(friendship.id);
  }

  cancelFriendRequest(e) {
    const { cancelFriendRequest, friendship } = this.props
    cancelFriendRequest(friendship.id)
  }

  authorized() {
    const { currentUser, profileUser } = this.props;
    return currentUser.id === profileUser.id;
  }

  render() {
    const {
      first_name = "",
      last_name = "",
      profilePhoto = window.defaultUserIcon
    } = this.props.profileUser;
    const fullName = `${first_name} ${last_name}`;
    return (
      <div className="profile-image-container">
        <div>
          <div className="cover-image-footer">
            <span className="profile-name">{fullName}</span>

            {this.friendButton()}
          </div>
        </div>

        <img className="profile-image" src={profilePhoto} />

        {this.authorized() ? (
          <div className="add-photo-semicircle" onClick={this.addProfilePhoto}>
            <div className="camera-icon" />
            <div className="add-photo">
              {this.props.profileUser.profilePhoto ? "Update" : "Add Photo"}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const profileUser = ownProps.profileUser;
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
    openModal: modalName => dispatch(openModal(modalName)),
    sendFriendRequest: friend => dispatch(sendFriendRequest(friend)),
    acceptFriendRequest: friendshipId =>
      dispatch(acceptFriendRequest(friendshipId)),
    cancelFriendRequest: friendshipId =>
      dispatch(cancelFriendRequest(friendshipId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserImage);
