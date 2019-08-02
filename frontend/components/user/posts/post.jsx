import React from "react";

class Post extends React.Component {
  render() {
    const {
      post: { last_name, first_name, body }
    } = this.props;
    const fullName = `${first_name} ${last_name}`;
    return (
      <>
        <div className="user-post">
          <div className="post-header">
            <span className="poster-icon" />
            <span className="post-info">
              <div className="poster-name">{fullName}</div>
              <div className="post-time">time</div>
            </span>
          </div>

          <div className="post-body">{body}</div>
        </div>
        <div className="post-footer" />
        <div>Comment form</div>
      </>
    );
  }
}

export default Post;
