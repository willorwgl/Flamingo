import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../../actions/posts_actions";
import TextareaAutosize from "react-autosize-textarea";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";
import { Link } from "react-router-dom";

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    const { id: profileId } = this.props.match.params;
    this.state = {
      body: "",
      wall_id: profileId,
      modal: false,
      photos: [],
      photoUrls: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.photoButtonRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createPost } = this.props;
    createPost(this.state);
    this.setState({ body: "", modal: false });
    this.postHTML.classList.remove("on-top");
  }

  handleChange(e) {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({ [field]: value });
  }

  handleClick(e) {
    if (!this.state.modal) {
      this.setState({ modal: true });
      this.postHTML = e.currentTarget;
      this.postHTML.classList.add("on-top");
    }
  }

  handleBlur(e) {
    if (this.state.modal) {
      this.setState({ modal: false });
      this.postHTML.classList.remove("on-top");
    }
  }

  componentDidUpdate(e) {
    const { photos } = this.state;
    if (photos.length) {
      this.photoButtonRef.current.classList.add("photo-attached");
    } else {
      this.photoButtonRef.current.classList.remove("photo-attached");
    }
  }

  handleFile(e) {
    const { photos } = this.state;
    if (photos.length >= 4) return;
    const fileReader = new FileReader();
    const photo = e.currentTarget.files[0];
    fileReader.onloadend = () => {
      this.setState({
        profilePhoto: this.state.photos.push(photo),
        photoUrl: this.state.photoUrls.push(fileReader.result)
      });
    };
    if (photo) {
      fileReader.readAsDataURL(photo);
    }
  }

  deletePhoto(e) {
    const index = Number(e.target.getAttribute("data-index"));
    const newPhotos = this.state.photos.slice();
    newPhotos.splice(index, 1);
    const newPhotoUrls = this.state.photoUrls.slice();
    newPhotoUrls.splice(index, 1);
    this.setState({ photos: newPhotos, photoUrls: newPhotoUrls });
  }

  photosPreview() {
    const { photoUrls, modal, photos } = this.state;
    if (photoUrls.length && modal) {
      const previews = photoUrls.map((photoUrl, index) => {
        return (
          <div className="preview-photo-container">
            <img src={photoUrl} className="post-photo-preview" />
            <i
              class="fas fa-times"
              onClick={this.deletePhoto}
              data-index={index}
            />
          </div>
        );
      });
      return (
        <div className="post-photo-preview-container">
          {previews}
          {photos.length < 4 ? (
            <>
              <label
                className="more-post-file-container"
                htmlFor="more-post-file"
              >
                <span className="add-photo-sign">
                  <i class="fas fa-plus" />
                </span>
              </label>
              <input
                type="file"
                id="more-post-file"
                className="post-file"
                onChange={this.handleFile}
              />
            </>
          ) : null}
        </div>
      );
    }
    return null;
  }

  render() {
    const { currentUser = {} } = this.props;
    const {
      first_name = "",
      last_name = "",
      id = null,
      profilePhoto = window.defaultUserIcon
    } = currentUser;
    return (
      <>
        <form className="create-post-form" onClick={this.handleClick}>
          <div className="create-post-header">
            <span className="post-header-option">
              <i class="fas fa-pencil-alt" /> Create Post
            </span>
          </div>
          <div className="create-post-body">
     
              <img className="create-post-icon" src={profilePhoto} />

            <TextareaAutosize
              className="post-body-input"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
              placeholder="What's on your mind?"
            />
          </div>
          {this.photosPreview()}
          <div className="create-post-footer">
            <label
              className="post-file-container post-footer-option"
              htmlFor="post-file"
              ref={this.photoButtonRef}
            >
              <i class="far fa-image" /> Photo/Video
            </label>
            <input
              type="file"
              id="post-file"
              className="post-file"
              onChange={this.handleFile}
            />
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

        {this.state.modal ? (
          <div className="modal-background" onClick={this.handleBlur} />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  return merge({}, ownProps, { currentUser });
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreatePostForm)
);
