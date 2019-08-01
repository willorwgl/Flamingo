import React from "react";
import CreatePostForm from "../posts/create_post_form";
import WallPosts from "../posts/wall_posts"

class Wall extends React.Component {
  render() {
    return (
      <div className="profile-wall">
        Wall
        <CreatePostForm />
        <WallPosts />
      </div>
    );
  }
}

export default Wall;
