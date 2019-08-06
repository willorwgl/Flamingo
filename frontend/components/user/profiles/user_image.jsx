import React from "react";
import { openModal } from "../../../actions/modal_actions";
import { connect  } from "react-redux"

class UserImage extends React.Component {

    // componentDidMount() {
    //     const { requestWallPosts } = this.props;
    //     const { id } = this.props.match.params;
    //     requestWallPosts(id, "wall");
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     const { id: currentId } = this.props.match.params;
    //     const { id: prevId } = prevProps.match.params;
    //     if (currentId != prevId) {
    //         const { requestWallPosts } = this.props;
    //         requestWallPosts(currentId, "wall");
    //     }
    // }

    constructor(props) {
        super(props)
        this.addProfilePhoto = this.addProfilePhoto.bind(this)
    }

    addProfilePhoto(e) {
       const { openModal } = this.props
       openModal("add photo")
    }


    render() {
        const { first_name = '', last_name = '', profilePhoto = window.defaultUserIcon } = this.props.profileUser
        const fullName = `${first_name} ${last_name}`
        return (
          <div className="profile-image-container">
            <div>
              <div className="cover-image-footer">
                <span className="profile-name">{fullName}</span>
                <button className="image-footer-button">
                  Update Info
                </button>

                <button className="image-footer-button">
                  Activity
                </button>
              </div>
            </div>

            <img className="profile-image" src={profilePhoto} />
            <div className="add-photo-semicircle" onClick={this.addProfilePhoto}>
              <div className="camera-icon"></div>
              <div className="add-photo"> {this.props.profilePhoto ? "Update" : "Add Photo"}</div>
            </div>
          </div>
        );
    }
}


// const mapStateToProps = state => {
//     return {

//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        openModal:  (modalName) => dispatch(openModal(modalName))
    }
}

export default connect(null, mapDispatchToProps)(UserImage)