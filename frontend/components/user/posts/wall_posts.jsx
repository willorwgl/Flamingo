import React from "react";
import { connect } from "react-redux";
import { requestPosts } from "../../../actions/posts_actions";
import Post from "./post";
import { withRouter } from "react-router-dom";

class WallPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
  }

  componentDidMount() {

    const { requestWallPosts } = this.props;
    const { id } = this.props.match.params;
    requestWallPosts(id, "wall");
  }

  componentDidUpdate(prevProps, prevState) {

    const { id: currentId } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;

    if (currentId != prevId) {
      const { requestWallPosts } = this.props;
      requestWallPosts(currentId, "wall");
    }
  }

  render() {

    const { posts = {} } = this.props;
    const postList = Object.values(posts)
          .reverse()
          .map(post => {
            return <Post key={post.id} post={post} />;
          })
    return (
      <div className="posts-container">
        posts
        {postList}
      </div>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WallPosts)
);
