import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../../actions/posts_actions";
import TextareaAutosize from "react-autosize-textarea";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";
import { requestFriendships } from "../../../actions/friendships_actions";
import { Link } from "react-router-dom"

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    const { id: profileId = currentUser.id } = this.props.match.params;
    this.state = {
      body: "",
      wall_id: profileId,
      modal: false,
      photos: [],
      photoUrls: [],
      tagFriends: false,
      tagged: [],
      tagInput: "",
      searchResults: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.photoButtonRef = React.createRef();
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handleTagInputChange = this.handleTagInputChange.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const { photos, body, wall_id, tagged } = this.state;
    const { createPost } = this.props;
    const post_tags = tagged.map( (friend) => friend.id)
    if (photos.length) {
      const formData = new FormData();
      formData.append("post[body]", body);
      for (let photo of photos) {
        formData.append("post[photos][]", photo);
      }
      formData.append("post[wall_id]", wall_id);
      formData.append("post[post_tags]", post_tags);
      $.ajax({
        method: "POST",
        url: "/api/posts",
        data: formData,
        processData: false,
        contentType: false
      });
    } else {
      if (!body) return;
      createPost(merge({}, this.state, {post_tags}));
    }
    this.setState({
      body: "",
      modal: false,
      tagged: [],
      tagInput: "",
      searchResults: [],
      tagFriends: false
    });
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
      this.setState({ modal: false, tagFriends: false});
      this.postHTML.classList.remove("on-top");
    }
  }

  componentDidMount() {
    const { currentUser, requestFriendships } = this.props;
    requestFriendships(currentUser.id)
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

  handleTagInputChange(e) {
    const { currentUserFriends } = this.props
    const { tagged } = this.state
    const tagInput = e.target.value.trim()
    if (tagInput) {
      const searchResults = currentUserFriends.filter((friend) => {
        const { first_name, last_name } = friend
        return `${first_name} ${last_name}`.toLowerCase().indexOf(tagInput.toLowerCase()) >= 0 && !tagged.includes(friend)
      })
      this.setState({ tagInput: tagInput, searchResults})
      return
    } 
    this.setState({ searchResults: [], tagInput})
  }

  handleTagSelect(friend) {
    return (e) => {
      const newTagged = this.state.tagged.slice()
      newTagged.push(friend)
      this.setState({ tagged: newTagged, searchResults: [], tagInput: "" })
    }
  }

  handleTagUnselect(friend) {
    return (e) => {
      const newTagged = this.state.tagged.slice()
      const index = newTagged.indexOf(friend);
      if (index !== -1) newTagged.splice(index, 1);
      this.setState({tagged: newTagged})
    }
  }

  searchResults() {
    const { searchResults } = this.state
    if (!searchResults.length) return;
    const resultDisplay = searchResults.map((friend) => {
      const { first_name, last_name } = friend
      const fullName = `${first_name} ${last_name}`;
      return (
        <div key={friend.id} className="tag-result-item"  onClick={this.handleTagSelect(friend)}>
        <img src={friend.profilePhoto || window.defaultUserIcon} alt="" className="tag-result-item-photo"/>
          {fullName}
        </div>
      );
    })
    return resultDisplay.length ? <div className="tag-search-results">
        {resultDisplay}
    </div> : null
  }

  taggedFriends() {
    const { tagged } = this.state
    const withFriends = tagged.map( (friend, key) => {
      return (
        <span className="with-tagged-friend">
          <Link className="with-tagged-friend-item"
            to={`/user/${friend.id}`}
          >{`${friend.first_name} ${friend.last_name}`}</Link>
          {key === tagged.length - 2 ? ", and " : (key === tagged.length - 1 ? "." : ", ")}
        </span>
      ); 
    })

    const taggedFriends = tagged.map( (friend) => {
      return (
        <div className="tagged-friend">
          {`${friend.first_name} ${friend.last_name}`}
          <i class="fas fa-times unselect-tagged" onClick={this.handleTagUnselect(friend)}></i>
        </div>
      );
    })
    return tagged.length ? (
      <div class="tagged-friend-container">
        <div className="post-tagged-friends">With {withFriends}</div>
        <div className="tagged-friend-options">{taggedFriends}</div>
      </div>
    ) : null;
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

  tagFriendsDisplay() {
    const { tagFriends } = this.state;
    return tagFriends ? (
      <div className="tag-friends">
        {this.searchResults()}
        <div className="tag-friends-label">With</div>
        <input
          type="text"
          className="tag-friends-input"
          onChange={this.handleTagInputChange}
          value={this.state.tagInput}
          placeholder="Who are you with?"
        />
      </div>
    ) : null;
  }

  handleTagClick(e) {
    const { tagFriends } = this.state;
    e.preventDefault();
    this.setState({ tagFriends: !tagFriends });
  }

  render() {
    const { currentUser = {} } = this.props;
    const {
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
          {this.taggedFriends()}
          {this.tagFriendsDisplay()}
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
            <span className="post-footer-option" onClick={this.handleTagClick}>
              <i class="fas fa-user-friends" /> Tag Friends
            </span>
            {/* <span className="post-footer-option feeling-activity-option">
              <i class="far fa-smile" /> Feeling/Activ...
            </span> */}
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
  const friendships = Object.values(state.entities.friendships).filter((friendship) => {
    return friendship.user_id === currentUser.id || friendship.friend_id === currentUser.id || friendship.state === "accepted"
  })
  const friendshipIds = friendships.map((friendship => {
    return friendship.user_id === currentUser.id ? friendship.friend_id : friendship.user_id
  }))
  const acceptedFriends = Object.values(state.entities.users).filter((user) => {
    return friendshipIds.includes(user.id)
  })
  return merge({}, ownProps, { currentUser, currentUserFriends: acceptedFriends });
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post)),
    requestFriendships: userId => dispatch(requestFriendships(userId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreatePostForm)
);
