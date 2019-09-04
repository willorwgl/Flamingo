import React from "react";
import { connect } from "react-redux";
import { openModal } from "../actions/modal_actions";

class PhotosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.addPhoto = this.addPhoto.bind(this);
  }

  addPhoto() {
    const { openModal } = this.props;
    openModal("add other photo");
  }

  render() {
    const { profileUser } = this.props;
    const { profilePhoto = null, coverImage = null, otherPhotos = [] } = profileUser;
    const photos = [];
    if (profilePhoto)
      photos.push(<img className="photo-page-photo" src={profilePhoto}></img>);
    if (coverImage)
      photos.push(<img className="photo-page-photo" src={coverImage}></img>);
    otherPhotos.forEach((photo) => {
        photos.push(<img className="photo-page-photo" src={photo}></img>);
    })
    return (
      <div className="photos-container">
        <div className="photos-container-header">
          <div className="photos-header-label">
            <i class="fas fa-images photos-header-icon"></i>
            <span className="photos-label">Photos</span>
          </div>
          <div className="photos-header-options">
            <span>Photos</span>

            <div className="add-photo-btn" onClick={this.addPhoto}>Add Photo</div>
          </div>
        </div>
        <div className="photo-page-photos">{photos}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const profileUserId = +ownProps.match.params.id;
  const profileUser = state.entities.users[profileUserId];
  return {
    profileUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: modalName => dispatch(openModal(modalName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotosContainer);
