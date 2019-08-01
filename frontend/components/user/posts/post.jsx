import React from "react";

class Post extends React.Component {
  render() {
    const { post: {last_name, first_name, body}} = this.props;
    const fullName = `${first_name} ${last_name}`
    return (
      <div className="user-post">
        <span className="poster-icon">icon goes here</span>
        <span className="poster-name">{fullName}</span>
        <div className="post-body">{body}</div>
      </div>
    );
  }
}

export default Post;
