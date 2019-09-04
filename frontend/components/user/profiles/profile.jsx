import React from "react";
import UserImage from "./user_image";
import ProfileNavBar from "./profile_nav_bar";
import CreatePostForm from "../posts/create_post_form";
import WallPosts from "./../posts/wall_posts";
import { connect } from "react-redux";
import { requestUser } from "../../../actions/users_actions";
import SidebarIntro from "./sidebar_intro";
import SidebarFriends from "./sidebar_friends";
import SidebarPhotos from "./sidebar_photos";
import {requestFriendships} from "../../../actions/friendships_actions"
import { ProtectedRoute } from "../../../util/route_util"
import FriendsContainer from "../../friends_container";
import { Switch} from "react-router-dom"
import AboutPage from "../../about"
import PhotosContainer from "../../photos_container";

class Profile extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { requestProfileUser, requestUserFriendships } = this.props;
    requestProfileUser(id);
    requestUserFriendships(id)
  }

  componentDidUpdate(prevProps) {
    const { id: currentId } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;
    if (currentId != prevId) {
      const { requestProfileUser, requestUserFriendships} = this.props;
      requestProfileUser(currentId);
      requestUserFriendships(currentId)
    }
  }

  render() {
    const { profileUser} = this.props;
    return (
      <div className="profile">
        <UserImage profileUser={profileUser} />
        <ProtectedRoute
          path="/user/:id"
          component={() => <ProfileNavBar profileUser={profileUser} />}
        />
        

        <Switch>
          <ProtectedRoute path="/user/:id/about" component={AboutPage} />
          <ProtectedRoute path="/user/:id/friends" component={FriendsContainer} />
          <ProtectedRoute path="/user/:id/photos" component={PhotosContainer} />
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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const profileUser = state.entities.users[id] || {};
  return {
    profileUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestProfileUser: id => dispatch(requestUser(id)),
    requestUserFriendships: id => dispatch(requestFriendships(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
