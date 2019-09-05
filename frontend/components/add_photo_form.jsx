import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";

class AddPhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePhoto: null,
      photoUrl: null,
      coverPhoto: null,
      otherPhoto: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.cancel = this.cancel.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.save = this.save.bind(this);
  }

  handleFile(e) {
    const { type } = this.props;
    const fileReader = new FileReader();
    const photo = e.currentTarget.files[0];

    fileReader.onloadend = () => {
      if (type === "profile") {
        this.setState({ profilePhoto: photo, photoUrl: fileReader.result });
      } else if (type === "cover") {
        this.setState({ coverPhoto: photo, photoUrl: fileReader.result });
      } else {
        this.setState({ otherPhoto: photo, photoUrl: fileReader.result });
      }
    };
    if (photo) {
      fileReader.readAsDataURL(photo);
    }
  }

  cancel(e) {
    const { closeModal } = this.props;
    closeModal();
  }

  deletePhoto(e) {
    this.setState({
      profilePhoto: null,
      photoUrl: null,
      coverPhoto: null
    });
  }

  save(e) {
    const { type } = this.props;
    const formData = new FormData();
    const { currentUser } = this.props;
    if (type === "profile") {
      formData.append("user[profile_photo]", this.state.profilePhoto);
    } else if (type === "cover") {
      formData.append("user[cover_image]", this.state.coverPhoto);
    } else {
      formData.append("user[other_photo]", this.state.otherPhoto);
    }
    $.ajax({
      url: `/api/users/${currentUser.id}`,
      method: "PATCH",
      data: formData,
      contentType: false,
      processData: false
    });
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const preview = this.state.photoUrl ? (
      <img src={this.state.photoUrl} className="photo-preview" />
    ) : null;
    return (
      <div className="add-photo-container">
        <div className="add-photo-header">Add Photo</div>
        <div className="add-photo-options">
          <input
            type="file"
            className="add-photo-file"
            id="add-photo-file"
            onChange={this.handleFile}
          />
          <label htmlFor="add-photo-file" className="add-photo-file-container ">
            <i className="fas fa-plus" /> Add Photo
          </label>
        </div>
        <div />
        {preview}
        <div className="add-photo-footer">
          {preview ? (
            <span className="add-photo-delete" onClick={this.deletePhoto}>
              Delete Photo
            </span>
          ) : null}
          <span className="add-photo-cancel" onClick={this.cancel}>
            Cancel
          </span>
          {preview ? (
            <span className="add-photo-save" onClick={this.save}>
              Save
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhotoForm);
