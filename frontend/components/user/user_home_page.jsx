import React from "react";
import { connect } from "react-redux";
import CreatePostForm from "./posts/create_post_form";
import { requestPosts } from "../../actions/posts_actions";
import Post from "./posts/post";

class UserHomePage extends React.Component {
  componentDidMount() {
    const { requestPosts, currentUser } = this.props;
    requestPosts(currentUser.id, "newsfeed");
  }

  posts() {
    const { posts = {} } = this.props;
    const postList = Object.values(posts)
      .reverse()
      .map(post => {
        return <Post key={post.id} post={post} />;
      });
    return <div className="posts-container">{postList}</div>;
  }

  render() {
    const { currentUser } = this.props;
    const {
      profilePhoto = window.defaultUserIcon,
      first_name,
      last_name
    } = currentUser;
    const fullName = `${first_name} ${last_name}`;
    return (
      <div className="user-home-page">
        <div className="user-home-sidebar">
          <div className="home-sidebar-info">
            <img src={profilePhoto} className="sidebar-user-icon" />
            <span className="sidebar-user-name">{fullName}</span>
          </div>
          <div className="sidebar-options">
            <div className="sidebar-newsfeed">
              <div className="newsfeed-icon" />{" "}
              <span className="newsfeed-label">News Feed</span>
            </div>
          </div>

          <div className="myinfo-container">
            <a
              className="personal-link"
              href="https://github.com/willorwgl"
              target="_blank"
            >
              <i class="fab fa-github" /> Github
            </a>
            <a
              className="personal-link"
              href="https://www.linkedin.com/in/william-lu-a455a416b/"
              target="_blank"
            >
              <i class="fab fa-linkedin" /> Linkedin
            </a>
            <a
              className="personal-link"
              href="https://angel.co/willorwgl?public_profile=1"
              target="_blank"
            >
              <i class="fab fa-angellist" /> AngelList
            </a>

            <a
              href="http://luwilliam.me"
              target="_blank"
              className="personal-link"
            >
              <i class="fas fa-portrait"></i> Porfolio
            </a>
          </div>
        </div>

        <div className="user-home-main">
          <CreatePostForm />
          {this.posts()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentUser = state.session.currentUser;
  return {
    currentUser,
    posts: state.entities.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestPosts: (id, type) => dispatch(requestPosts(id, type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHomePage);
