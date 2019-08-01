import React from "react";
import { connect } from "react-redux";
import { requestPosts } from "../../../actions/posts_actions";
import Post from "./post";

class WallPosts extends React.Component {
  componentDidMount() {
    const { requestWallPosts, userId } = this.props;
    requestWallPosts(10, "wall");
  }

  render() {
    const posts = Object.values(this.props.posts).map(post => {
          return <Post key={post.id} post={post} />;
        })
    return (
      <>
        <div>posts</div>
        {posts}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.entities.posts };
};

const mapDispatchToProps = dispatch => {
  return {
    requestWallPosts: (id, type) => dispatch(requestPosts(id, type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WallPosts);
