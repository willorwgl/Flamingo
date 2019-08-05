import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../../actions/posts_actions";
import TextareaAutosize from "react-autosize-textarea";
import { withRouter } from "react-router-dom" 

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    const { id: profileId} = this.props.match.params
    this.state = {
      body: "",
      wall_id: profileId,
      modal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createPost } = this.props;
    createPost(this.state);
  }

  handleChange(e) {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({ [field]: value });
  }

  handleFocus() {
    this.setState({ modal: true });
  }

  handleBlur() {
    this.setState({ modal: false });
  }


  render() {
    return (
      <>
        <form className="create-post-form" onBlur={this.handleBlur}>
          <div className="create-post-header">
            <span className="post-header-option">
              <i class="fas fa-pencil-alt" /> Create Post
            </span>
          </div>
          <div className="create-post-body">
            <img className="create-post-icon" />
            <TextareaAutosize
              className="post-body-input"
              onResize={e => {}}
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
              placeholder="What's on your mind?"
              onFocus={this.handleFocus}
            />
          </div>

          <div className="create-post-footer">
            <span className="post-footer-option">
              <i class="far fa-image" /> Photo/Video
            </span>
            <span className="post-footer-option">
              <i class="fas fa-user-friends" /> Tag Friends
            </span>
            <span className="post-footer-option feeling-activity-option">
              <i class="far fa-smile" /> Feeling/Activ...
            </span>
          </div>

          {this.state.modal ? (
            <>
              <button
                class="create-post-btn"
                type="submit"
                onClick={this.handleSubmit}
              >
                Post
              </button>
            </>
          ) : null}
        </form>

        {this.state.modal ? <div className="modal-background" /> : null}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CreatePostForm));
