import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { updatePost } from "../../../actions/posts_actions";
import { connect } from "react-redux";
import { merge } from "lodash";
import { closeModal } from "../../../actions/modal_actions";

class EditPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.post.body
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange(e) {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({ [field]: value });
  }

  handleSave(e) {
    const { post, editPost, closeModal } = this.props;
    const { body } = this.state;
    const updatedPost = merge({}, post, { body });
    editPost(updatedPost);
    closeModal()
  }

  handleCancel(e) {
    const { closeModal } = this.props
    closeModal()
  }

  render() {
    const { profilePhoto = window.defaultUserIcon } = this.props.postUser
    return (
      <div className="edit-post-container">
        <div className="edit-post-header">
          Edit Post
          <i class="fas fa-times edit-photo-cancel" onClick={this.handleCancel} />
        </div>
        <div className="edit-post-input-container">
          <img src={profilePhoto} className="edit-poster-icon" />
          <TextareaAutosize
            className="edit-post-input"
            value={this.state.body}
            onChange={this.handleChange}
            name="body"
          />
        </div>
        <div className="edit-post-footer">
          <span className="edit-post-save" onClick={this.handleSave}>
            Save
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.entities.posts[ownProps.postId]
  return {
    post, 
    postUser: state.entities.users[post.author_id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch(updatePost(post)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm);
