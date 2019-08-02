import React from "react";

class Post extends React.Component {
  render() {
    const {
      post: { last_name, first_name, body }
    } = this.props;
    const fullName = `${first_name} ${last_name}`;
    return (
      <div className="post-container">
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
        <div className="post-footer">
          <span className="post-like">
            <i class="far fa-thumbs-up" /> Like
          </span>
          <span className="post-comment">
            <i class="far fa-comment-alt" /> Comment
          </span>
          <span className="post-share">
            <i class="fas fa-share" /> Share
          </span>
        </div>
        <div className="post-comment-form">
          <img className="commenter-icon"/> Comment form
        </div>
      </div>
    );
  }
}

export default Post;
