import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/users_actions";
import { merge } from "lodash";
import { throws } from "assert";

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

  featured() {
    return (
      <>
        <div className="star-icon" />
        <div className="featured-description">
          Showcase what's important to you by adding photos, pages, groups and
          more to your featured section on your public profile.
        </div>
        <div className="add-feature-link">Add to Featured</div>
      </>
    );
  }

  introInfo() {
    return (
      <>
        <div className="intro-city-info">
          <div className="city-icon" />
          Current city:
        </div>
        <div className="intro-workplace-info">
          <div className="workplace-icon" />
          Workplace:
        </div>

        <div className="intro-school-info">
          <div className="school-icon" />
          School
        </div>

        <div className="relationship-info">
          <div className="relationship-icon" />
          Relationship
        </div>
      </>
    );
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
    updateUser(merge({}, profileUser, { bio: value }));
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
        <div className="intro-info">{this.introInfo()}</div>
        <div className="bio-featured">{this.featured()}</div>
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
