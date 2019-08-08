import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";
import { createComment } from "../../../actions/comments_actions";
import { merge } from "lodash";
import Comment from "./comment";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import { openModal } from "../../../actions/modal_actions";
import { destroyPost } from "../../../actions/posts_actions";
import { withRouter } from "react-router-dom";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      post_id: this.props.post.id,
      parent_comment_id: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.commentRef = React.createRef();
  }

  // componentDidMount() {
  //   const {
  //     requestComments,
  //     post: { id: postId }
  //   } = this.props;
  //   requestComments(postId);
  // }

  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ [field]: value });
  }

  handleEnter(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      if (this.state.body.trim()) {
        const { createComment } = this.props;
        createComment(this.state);
      }
      this.setState({ body: "" });
    }
  }

  handleCommentClick(e) {
    this.commentRef.current.focus();
  }

  handleEdit(e) {
    const {
      openModal,
      post: { id }
    } = this.props;
    openModal("edit post", id);
  }

  handleDelete(e) {
    const {
      deletePost,
      post: { id }
    } = this.props;
    deletePost(id);
  }

  comments() {
    const { comments = [] } = this.props;
    const childComments = {};
    const parentComments = comments.filter(el => {
      if (!el.parent_comment_id) {
        childComments[el.id] = [];
        return true;
      }
      if (childComments[el.parent_comment_id]) {
        childComments[el.parent_comment_id].push(el);
      } else {
        childComments[el.parent_comment_id] = [el];
      }
      return false;
    });
    if (parentComments.length) {
      const commentList = parentComments.map(el => {
        return (
          <Comment
            comment={el}
            key={el.id}
            childComments={childComments[el.id]}
          />
        );
      });
      return <div className="comments-container">{commentList}</div>;
    }
    return null;
  }

  render() {
    const { author = {}, currentUser = {}, post, profileUser } = this.props;
    const {
      first_name = "",
      last_name = "",
      id = null,
      profilePhoto = window.defaultUserIcon
    } = author;
    const { body = "", updated_at } = post;
    const time = moment.utc(updated_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    const fullName = `${first_name} ${last_name}`;
    const {
      id: currentUserId = null,
      profilePhoto: currentUserProfilePhoto = window.defaultUserIcon
    } = currentUser;
    return (
      <div className="post-container">
        <div className="user-post">
          {currentUser.id === post.author_id ? (
            <>
              <i class="far fa-edit edit-post" onClick={this.handleEdit} />
              <i
                class="far fa-trash-alt delete-post"
                onClick={this.handleDelete}
              />
            </>
          ) : null}

          <div className="post-header">
            <Link to={`/user/${id}`}>
              <img className="poster-icon" src={profilePhoto} />
            </Link>
            <span className="post-info">
              <div className="poster-name">
                <strong>
                  <Link to={`/user/${id}`} className="user-name-link">
                    {fullName}
                  </Link>
                  {profileUser && profileUser.id !== id ? (
                    <>
                      <i class="fas fa-caret-right " />
                      <Link
                        to={`/user/${profileUser.id}`}
                        className="user-name-link"
                      >
                        {`${profileUser.first_name} ${profileUser.last_name}`}
                      </Link>
                    </>
                  ) : null}
                </strong>
              </div>
              <div className="post-time">{time}</div>
            </span>
          </div>

          <div className="post-body">{body}</div>
        </div>
        <div className="post-footer">
          <span className="post-like">
            <i class="far fa-thumbs-up" /> Like
          </span>
          <span className="post-comment" onClick={this.handleCommentClick}>
            <i class="far fa-comment-alt" /> Comment
          </span>
          <span className="post-share">
            <i class="fas fa-share" /> Share
          </span>
        </div>
        {this.comments()}
        <div className="post-comment-form">
          <Link to={`/user/${currentUserId}`}>
            <img className="commenter-icon" src={currentUserProfilePhoto} />
          </Link>

          <div className="comment-input-container">
            <TextareaAutosize
              className="comment-input"
              name="body"
              placeholder="Write a comment..."
              value={this.state.body}
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
              ref={this.commentRef}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const comments = state.entities.comments;
  const authors = state.entities.users;
  const currentUser = state.session.currentUser;
  let profileUser = null;
  if (ownProps.match.params.id) {
    profileUser = state.entities.users[ownProps.match.params.id];
  }
  const postComments = Object.values(comments).filter(value => {
    return value.post_id === ownProps.post.id;
  });
  const author = Object.values(authors).find(value => {
    return value.id === ownProps.post.author_id;
  });
  return merge({}, ownProps, {
    comments: postComments,
    author,
    currentUser,
    profileUser
  });
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: comment => dispatch(createComment(comment)),
    openModal: (modalName, modalInfo) =>
      dispatch(openModal(modalName, modalInfo)),
    deletePost: id => dispatch(destroyPost(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
