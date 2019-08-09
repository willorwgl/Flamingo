import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/users_actions";
import { merge } from "lodash";
import { withRouter, Link } from "react-router-dom";

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
          {this.authorized() ? <div className="intro-bio-edit" onClick={this.toggleBioEdit}>
            Add bio
          </div> : null}
     
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
        {this.authorized() ? <div className="add-feature-link">Add to Featured</div> : null}

      </>
    );
  }

  introInfo() {
    // const { workplace, education} = this.props
    // debugger
    // const company = workplace.company || ""
    // const school = education.school || ""
    let { workplaces = {}, educations = {}, profileUser = {} } = this.props;
    workplaces = Object.values(workplaces).filter(workplace => {
      return workplace.user_id === this.props.match.params.id;
    });
    educations = Object.values(educations).filter(education => {
      debugger;
      return education.user_id === Number(this.props.match.params.id);
    });
    let workplace = {};
    let education = {};
    if (workplaces.length) workplace = workplaces[workplaces.length - 1];
    if (educations.length) education = educations[educations.length - 1];
    return (
      <>
        {/* <div className="intro-city-info">
          <div className="city-icon" />
          Current city:
        </div> */}
        <div className="intro-workplace-info">
          <div className="workplace-icon" />
          <Link className="about-link" to={`/user/${profileUser.id}/about`}>
            Workplace:
          </Link>
          <span className="intro-user-info">{workplace.company}</span>
        </div>

        <div className="intro-school-info">
          <div className="school-icon" />
          <Link className="about-link" to={`/user/${profileUser.id}/about`}>
            School:
          </Link>
          <span className="intro-user-info">{education.school}</span>
        </div>

        {/* <div className="relationship-info">
          <div className="relationship-icon" />
          Relationship
        </div> */}
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

  authorized() {
    const { profileUser, currentUser }  = this.props
    return profileUser.id === currentUser.id
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

const mapStateToProps = (state, ownProps) => {
  // debugger
  // let education = {};
  // let workplace = {};
  // if (workplaces.length) {
  //   workplace = workplaces[workplaces.length - 1];
  // }
  // if (educations.length) education = educations[educations.length - 1];
  return {
    currentUser: state.session.currentUser,
    workplaces: state.entities.workplaces,
    educations: state.entities.educations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidebarIntro)
);
