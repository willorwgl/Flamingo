import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { createComment } from "../../../actions/comments_actions";
import { connect } from "react-redux";
import { merge } from "lodash";
import { Link } from "react-router-dom";
import { destroyComment } from "../../../actions/comments_actions";
import { openModal } from "../../../actions/modal_actions";
import Like from "../../like";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
      body: "",
      post_id: this.props.comment.post_id,
      parent_comment_id: this.props.comment.id,
      showEdit: false
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

  handleEdit(id) {
    return e => {
      const { openModal } = this.props;
      openModal("edit comment", id);
    };
  }

  handleDelete(id) {
    return e => {
      const { deleteComment } = this.props;
      deleteComment(id);
    };
  }

  replyForm() {
    const { reply } = this.state;
    const { currentUser = {} } = this.props;
    const { id = null, profilePhoto = window.defaultUserIcon } = currentUser;
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
          </div>
        </div>
      );
    }
    return null;
  }

  currentUserLike() {
    const { likes, currentUser } = this.props;
    return likes.find(like => like.user_id === currentUser.id);
  }

  replies() {
    const { childComments: replies, replyUsers = [] } = this.props;
    return replies.map(reply => {
      const replier = replyUsers.find(user => {
        return user.id === reply.author_id;
      });
      const {
        first_name,
        last_name,
        id,
        profilePhoto = window.defaultUserIcon
      } = replier;
      const replierFullName = `${first_name} ${last_name}`;
      const { replyLikes, currentUser } = this.props;
      const currentUserLike = replyLikes.find(
        like => like.user_id === currentUser.id && like.likeable_id === reply.id
      );
      return (
        <div key={reply.id} className="user-reply">
          <Link to={`/user/${id}`}>
            <img className="replier-icon" src={profilePhoto} />
          </Link>
          <div>
            <div className="reply-body-container">
              <div className="reply-body">
                <strong>
                  <Link to={`/user/${id}`} className="user-name-link">
                    {replierFullName}
                  </Link>
                </strong>
                {reply.body}
              </div>
              {currentUser.id === reply.author_id ? (
                <>
                  <i
                    className="far fa-edit edit-comment"
                    onClick={this.handleEdit(reply.id)}
                  />
                  <i
                    className="far fa-trash-alt delete-comment"
                    onClick={this.handleDelete(reply.id)}
                  />
                </>
              ) : null}
            </div>

            <div className="reply-options">
              <Like
                likeableId={reply.id}
                likeableType="Comment"
                currentUserLike={currentUserLike}
              />
              <span
                onClick={this.handleReplyClick}
                className="comment-reply-option"
              >
                Reply
              </span>
              {this.replyLikes(reply)}
              <div className="comment-edit-icon" />
            </div>
          </div>
        </div>
      );
    });
  }

  likes() {
    const { likes } = this.props;
    const numLikes = likes.length;
    if (!numLikes) return;
    const options = {
      like: [],
      love: [],
      haha: [],
      angry: [],
      sad: [],
      wow: []
    };
    Object.values(likes).forEach(el => options[el.like_type].push(el));

    const likeDisplay = Object.entries(options).map(([key, option]) => {
      return option.length ? (
        <div key={option[0].id} className={`liked-${key}`}></div>
      ) : null;
    });
    return (
      <span className="comment-likes">
        {likeDisplay} {numLikes}
      </span>
    );
  }

  replyLikes(reply) {
    const { replyLikes = [] } = this.props;
    let numLikes =  0;
    const options = {
      like: [],
      love: [],
      haha: [],
      angry: [],
      sad: [],
      wow: []
    };
    Object.values(replyLikes).forEach(el => {
      if (el.likeable_id === reply.id) {
        options[el.like_type].push(el)
        numLikes++;
      }
    });
    const likeDisplay = Object.entries(options).map(([key, option]) => {
      return option.length ? (
        <div key={option[0].id} className={`liked-${key}`}></div>
      ) : null;
    });
    return (
      <span className="comment-likes">
        {likeDisplay} {numLikes ? numLikes : null}
      </span>
    );
  }

  render() {
    const { comment, author = {}, currentUser } = this.props;
    const currentUserLike = this.currentUserLike();
    const {
      first_name = "",
      last_name = "",
      id = null,
      profilePhoto = window.defaultUserIcon
    } = author;
    const authorFullName = `${first_name} ${last_name}`;
    return (
      <div className="user-comment-container">
        <div className="user-comment">
          <Link to={`/user/${id}`}>
            <img className="commenter-icon" src={profilePhoto} />
          </Link>

          <div>
            <div className="comment-body">
              <strong>
                <Link to={`/user/${id}`} className="user-name-link">
                  {authorFullName}
                </Link>
              </strong>
              {comment.body}
            </div>
            {currentUser.id === id ? (
              <>
                <i
                  className="far fa-edit edit-comment"
                  onClick={this.handleEdit(comment.id)}
                />
                <i
                  className="far fa-trash-alt delete-comment"
                  onClick={this.handleDelete(comment.id)}
                />
              </>
            ) : null}

            <div className="comment-options">
              <Like
                likeableId={comment.id}
                likeableType="Comment"
                currentUserLike={currentUserLike}
              />
              <span
                onClick={this.handleReplyClick}
                ref={this.replyRef}
                className="comment-reply-option"
              >
                Reply
              </span>
              {this.likes()}
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
  const likes = state.entities.likes
  const { childComments: replies = {}, comment = {} } = ownProps;

  const replierIds = replies.map(reply => {
    return reply.author_id;
  });
  const currentUser = state.session.currentUser;
  const author = Object.values(authors).find(value => {
    return value.id === ownProps.comment.author_id;
  });
  const replyUsers = Object.values(state.entities.users).filter(user => {
    return replierIds.includes(user.id);
  });
  const commentLikes = Object.values(likes).filter(value => {
    return (
      value.likeable_type === "Comment" && value.likeable_id === comment.id
    );
  });
  const replyIds = replies.map( (reply) => reply.id) 
  const replyLikes = Object.values(likes).filter(value => {
    return (
      value.likeable_type === "Comment" &&  replyIds.includes(value.likeable_id)
    );
  })
  return merge({}, ownProps, {
    author,
    currentUser,
    replyUsers,
    likes: commentLikes,
    replyLikes
  });
};

const mapDispatchToProps = dispatch => {
  return {
    createReply: comment => dispatch(createComment(comment)),
    openModal: (modalName, modalInfo) =>
      dispatch(openModal(modalName, modalInfo)),
    deleteComment: id => dispatch(destroyComment(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
