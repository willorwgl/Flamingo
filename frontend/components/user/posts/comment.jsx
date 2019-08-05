import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { createComment } from "../../../actions/comments_actions";
import { connect } from "react-redux";

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
    if (reply) {
      return (
        <div className="comment-reply">
          <img className="replier-icon" />
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
    const { childComments: replies } = this.props;

    return replies.map(reply => {
      return (
        <div key={reply.id} className="user-reply">
          <img className="replier-icon" />
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
    const { comment } = this.props;
    return (
      <div className="user-comment-container">
        <div className="user-comment">
          <img className="commenter-icon" />
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

const mapDispatchToProps = dispatch => {
  return {
    createReply: comment => dispatch(createComment(comment))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Comment);
