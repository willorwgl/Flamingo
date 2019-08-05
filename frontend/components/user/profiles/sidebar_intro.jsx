import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/users_actions";
import { merge } from "lodash";

class SidebarIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: null,
      edit: false
    };
    this.toggleBioEdit = this.toggleBioEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  introBioForm() {
    return <div className="intro-bio-form" />;
  }
  introBio() {
    const { edit } = this.state;
    const {
      profileUser: { bio }
    } = this.props;
    if (edit) {
      return (
        <form className="edit-bio-form" onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.bio}
            onChange={this.handleChange}
            type="text"
            placeholder="Describe who you are"
            name="bio"
            className="edit-bio-input"
          />
          <div className="empty-bio-div" />
          <div className="bio-form-options">
            <button className="edit-bio-cancel" onClick={this.toggleBioEdit}>
              Cancel
            </button>
            <button className="edit-bio-save" type="submit">
              Save
            </button>
          </div>
        </form>
      );
    }
    if (bio) {
      if (!this.state.bio) this.setState({ bio });
      return (
        <div className="user-bio">
          {bio}
          <i
            className="fas fa-pencil-alt bio-edit"
            onClick={this.toggleBioEdit}
          />
        </div>
      );
    } else {
      return (
        <div className="intro-bio-description">
          <div className="intro-bio-icon" />
          <div className="bio-description-text">
            Add a short bio to tell people more about yourself.
          </div>
          <div className="intro-bio-edit" onClick={this.toggleBioEdit}>
            Add bio
          </div>
        </div>
      );
    }
  }

  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ [field]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.bio.value;
    const { updateUser, profileUser } = this.props;
    updateUser(merge({}, profileUser, {bio: value}));
    this.setState({ bio: value });
    this.toggleBioEdit();
  }

  toggleBioEdit(e) {
    this.setState({
      edit: !this.state.edit
    });
  }

  render() {
    return (
      <div className="sidebar-intro">
        <div className="intro-header">
          <div className="intro-label-container">
            <div className="intro-icon" />
            <span className="intro-label">Intro</span>
          </div>
        </div>
        <div className="intro-bio">{this.introBio()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SidebarIntro);
