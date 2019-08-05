import React from "react";
import UserImage from "./user_image";
import ProfileNavBar from "./profile_nav_bar";
import ProfileSidebar from "./sidebar";
import CreatePostForm from "../posts/create_post_form";
import WallPosts from "./../posts/wall_posts";
import { connect } from "react-redux";
import { requestUser } from "../../../actions/users_actions";
import SidebarIntro from "./sidebar_intro"
import SidebarFriends from "./sidebar_friends"
import SidebarPhotos from "./sidebar_photos"

class Profile extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { requestProfileUser } = this.props;
    requestProfileUser(id);
  }

  render() {
    const { profileUser } = this.props;
    return (
      <div className="profile">
        <UserImage profileUser={profileUser} />
        <ProfileNavBar profileUser={profileUser} />
        <div className="profile-main">
          <div className="profile-sidebar">
            <SidebarIntro profileUser={profileUser} />
            <SidebarPhotos profileUser={profileUser} />
            <SidebarFriends profileUser={profileUser} />
          </div>
          <div className="profile-wall">
            <CreatePostForm profileUser={profileUser} />
            <WallPosts />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const profileUser = state.entities.users[id] || {};
  return {
    profileUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestProfileUser: id => dispatch(requestUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
