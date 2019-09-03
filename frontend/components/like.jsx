import React from "react";
import { connect } from "react-redux";
import { addLike, destroyLike, updateLike } from "../actions/likes_actions";

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreOptions: false,
      currentLikeType: "like"
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.timeout = null;
  }

  handleClick(likeType) {
    return e => {
      e.stopPropagation();
      const {
        addLike,
        destroyLike,
        updateLike,
        likeableType,
        likeableId
      } = this.props;
      const currentUserLike = this.liked();
      if (currentUserLike) {
        if (currentUserLike.like_type === likeType) {
          destroyLike(currentUserLike.id);
          this.setState({ moreOptions: false, currentLikeType: "like" });
        } else {
          currentUserLike.like_type = likeType;
          updateLike(currentUserLike);
          this.setState({ moreOptions: false, currentLikeType: likeType });
        }
        return;
      }
      const like = {
        likeable_type: likeableType,
        likeable_id: likeableId,
        like_type: likeType
      };
      addLike(like);
      this.setState({ moreOptions: false, currentLikeType: likeType });
    };
  }

  handleHover() {
    clearTimeout(this.timeout);
    this.setState({ moreOptions: true });
  }

  handleBlur() {
    this.timeout = setTimeout(() => {
      this.setState({ moreOptions: false });
    }, 1000);
  }

  liked() {
    const { currentUserLike } = this.props;
    return currentUserLike;
  }

  likeOptions() {
    const { moreOptions } = this.state;
    return moreOptions ? (
      <div className="like-options">
        <div className="like-option" onClick={this.handleClick("like")}></div>
        <div className="love-option" onClick={this.handleClick("love")}></div>
        <div className="haha-option" onClick={this.handleClick("haha")}></div>
        <div className="wow-option" onClick={this.handleClick("wow")}></div>
        <div className="sad-option" onClick={this.handleClick("sad")}></div>
        <div className="angry-option" onClick={this.handleClick("angry")}></div>
      </div>
    ) : null;
  }

  displayPostLike() {
    const { like_type } = this.liked();
    if (like_type === "like") {
      return (
        <div className="liked">
          <i className="fas fa-thumbs-up"></i> Like
        </div>
      );
    } else {
      return (
        <div className={like_type}>
          <div className={`liked-${like_type}`}></div>
          {like_type.charAt(0).toUpperCase() + like_type.slice(1)}
        </div>
      );
    }
  }

  displayCommentLike() {
    const { like_type } = this.liked();
    if (like_type === "like") {
      return <span className="liked-comment-like">Like</span>;
    } else {
      return (
        <span className={`comment-${like_type}`}>
          {like_type.charAt(0).toUpperCase() + like_type.slice(1)}
        </span>
      );
    }
  }

  postLike() {
    return (
      <>
        {this.liked() ? (
          this.displayPostLike()
        ) : (
          <div>
            <i className="far fa-thumbs-up" /> Like
          </div>
        )}
      </>
    );
  }

  commentLike() {
      return <>{this.liked() ? this.displayCommentLike() : <span className="comment-like-option" >Like </span>}</>;
  }

  render() {
    const { likeableType } = this.props;
    return (
      <span
        className={likeableType === "Post" ? "post-like" : "comment-like"}
        onClick={this.handleClick(this.state.currentLikeType)}
        onMouseOver={this.handleHover}
        onMouseLeave={this.handleBlur}
      >
        {this.likeOptions()}
        {likeableType === "Post" ? this.postLike() : this.commentLike()}
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLike: like => dispatch(addLike(like)),
    destroyLike: likeId => dispatch(destroyLike(likeId)),
    updateLike: like => dispatch(updateLike(like))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Like);
