import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { createComment } from "../../../actions/comments_actions";
import { connect } from "react-redux";
import { merge } from "lodash";
import { Link } from "react-router-dom";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
      body: "",
      post_id: this.props.comment.post_id,
      parent_comment_id: this.props.comment.id
    };
    this.replyRef = React.createRef();
    this.handleReplyClick = this.handleReplyClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ [field]: value });
  }

  handleEnter(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      if (this.state.body.trim()) {
        const { createReply } = this.props;
        createReply(this.state);
        this.setState({ body: "" });
        this.setState({ reply: false });
      }
    }
  }
  handleReplyClick(e) {
    this.setState({
      reply: true
    });
    this.replyRef.current.focus();
  }

  replyForm() {
    const { reply } = this.state;
    const { currentUser = {} } = this.state;
    const {
      first_name = "",
      last_name = "",
      id = null,
      profilePhoto = window.defaultUserIcon
    } = currentUser;
    if (reply) {
      return (
        <div className="comment-reply">
          <Link to={`/user/${id}`}>
            <img className="replier-icon" src={profilePhoto} />
          </Link>
          <div className="reply-input-container">
            <TextareaAutosize
              autoFocus
              className="reply-input"
              name="body"
              placeholder="Write a reply..."
              value={this.state.body}
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
              ref={this.replyRef}
            />
            {/* <div className="comment-input-description">des</div> */}
          </div>
        </div>
      );
    }
    return null;
  }

  replies() {
    const { childComments: replies, author = {} } = this.props;
    return replies.map(reply => {
      return (
        <div key={reply.id} className="user-reply">
          <Link to={`/user/${reply.author_id}`}>
            <img
              className="replier-icon"
              src={
                reply.profilePhoto ? reply.profilePhoto : window.defaultUserIcon
              }
            />
          </Link>

          <div>
            <div className="reply-body"> {reply.body}</div>
            <div className="reply-options">
              <span>Like</span>
              <span
                onClick={this.handleReplyClick}
                className="comment-reply-option"
              >
                Reply
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { comment, author = {}, currentUser = {} } = this.props;
    const {
      first_name = "",
      last_name = "",
      id = null,
      profilePhoto = window.defaultUserIcon
    } = author;
    return (
      <div className="user-comment-container">
        <div className="user-comment">
          <Link to={`/user/${id}`}>
            <img className="commenter-icon" src={profilePhoto} />
          </Link>

          <div>
            <div className="comment-body"> {comment.body}</div>
            <div className="comment-options">
              <span>Like</span>
              <span
                onClick={this.handleReplyClick}
                ref={this.replyRef}
                className="comment-reply-option"
              >
                Reply
              </span>
            </div>
          </div>
        </div>
        {this.replies()}
        {this.replyForm()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const authors = state.entities.users;
  // const currentUser = state.session.currentUser;
  const author = Object.values(authors).find(value => {
    return value.id === ownProps.comment.author_id;
  });
  return merge({}, ownProps, { author });
};

const mapDispatchToProps = dispatch => {
  return {
    createReply: comment => dispatch(createComment(comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
