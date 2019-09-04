import React from "react";

class SidebarPhotos extends React.Component {
  render() {
    const { profileUser } = this.props;
    const {
      profilePhoto = null,
      coverImage = null,
      otherPhotos = []
    } = profileUser;
    const photos = [];
    if (profilePhoto)
      photos.push(<img className="sidebar-photo" src={profilePhoto}></img>);
    if (coverImage)
      photos.push(<img className="sidebar-photo" src={coverImage}></img>);
    otherPhotos.forEach((photo) => {
      photos.push(<img className="sidebar-photo" src={photo}></img>);
    })
    return (
      <div className="sidebar-photos">
        <div className="photos-label-container">
          <div className="photos-icon"></div>
          <span className="photos-label">Photos</span>
        </div>
        <div className="sidebar-photo-container">{photos}</div>
      </div>
    );
  }
}

export default SidebarPhotos;
