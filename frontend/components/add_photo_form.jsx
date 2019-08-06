import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";

class AddPhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePhoto: null,
      photoUrl: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.cancel = this.cancel.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.save = this.save.bind(this);
  }

  handleFile(e) {
    const fileReader = new FileReader();
    const photo = e.currentTarget.files[0];

    fileReader.onloadend = () => {
      this.setState({ profilePhoto: photo, photoUrl: fileReader.result });
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
      photoUrl: null
    });
  }

  save(e) {
    const formData = new FormData();
    const { currentUser } = this.props;
    const userId = Object.values(currentUser)[0].id;
    formData.append("user[profile_photo]", this.state.profilePhoto);
    $.ajax({
      url: `/api/users/${userId}`,
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
            <i class="fas fa-plus" /> Add Photo
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
