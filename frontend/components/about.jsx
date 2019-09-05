import React from "react";
import { connect } from "react-redux";
import { openModal } from "../actions/modal_actions";
import Education from "./education";
import Workplace from "./workplace";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "overview"
    };
    this.addWorkplace = this.addWorkplace.bind(this);
    this.addEducation = this.addEducation.bind(this);
  }

  addWorkplace() {
    const { openModal } = this.props;
    openModal("workplace form");
  }

  addEducation() {
    const { openModal } = this.props;
    openModal("education form");
  }

  changeSection(section) {
    return e => {
      this.setState({ section });
    };
  }

  overview() {
    if (this.state.section !== "overview") return;
    let { workplaces = [], educations = [] } = this.props;
    let education,
      workplace = null;
    if (workplaces.length) {
      workplace = <Workplace workplace={workplaces[0]} />;
    } else {
      workplace = (
        <>
          {this.authorized() ? (
            <div className="add-work-container" onClick={this.addWorkplace}>
              <div className="add-work-box">
                <i className="fas fa-plus" />
              </div>
              <div className="add-work-label">Add a workplace</div>
            </div>
          ) : null}
        </>
      );
    }
    if (educations.length) {
      education = <Education education={educations[0]} />;
    } else {
      education = (
        <>
          {this.authorized() ? (
            <div className="add-work-container" onClick={this.addEducation}>
              <div className="add-work-box">
                <i className="fas fa-plus" />
              </div>
              <div className="add-work-label">Add a College/High School</div>
            </div>
          ) : null}
        </>
      );
    }
    return (
      <div className="work-container">
        {workplace} {education}
      </div>
    );
  }

  workplaces() {
    if (this.state.section !== "workplace") return;
    let { workplaces = [] } = this.props;
    workplaces = workplaces.map(workplace => {
      return <Workplace key={workplace.id} workplace={workplace} />;
    });
    let workplacesContainer = null;
    if (workplaces.length) {
      workplacesContainer = (
        <div className="workplace-items-container">{workplaces}</div>
      );
    }

    return (
      <div className="work-container">
        <div className="work-container-label">Work</div>
        {this.authorized() ? (
          <div className="add-work-container" onClick={this.addWorkplace}>
            <div className="add-work-box">
              <i className="fas fa-plus" />
            </div>
            <div className="add-work-label">Add a workplace</div>
          </div>
        ) : null}

        {workplacesContainer}
      </div>
    );
  }

  education() {
    if (this.state.section !== "education") return;
    let { educations = [] } = this.props;
    educations = educations.map(education => {
      return <Education key={education.id} education={education} />;
    });
    let educationContainer = null;
    if (educations.length) {
      educationContainer = (
        <div className="workplace-items-container">{educations}</div>
      );
    }

    return (
      <div className="work-container">
        <div className="work-container-label">Education</div>

        {this.authorized() ? (
          <div className="add-work-container" onClick={this.addEducation}>
            <div className="add-work-box">
              <i className="fas fa-plus" />
            </div>
            <div className="add-work-label">Add a College/High School</div>
          </div>
        ) : null}

        {educationContainer}
      </div>
    );
  }

  authorized() {
    const { currentUser } = this.props;
    return currentUser.id === Number(this.props.match.params.id);
  }

  render() {
    return (
      <div className="about-container">
        <div className="about-header">
          <div className="about-label-container">
            <i className="fas fa-user" />
            <span className="about-header-label">About</span>
          </div>
        </div>

        <div className="about-main">
          <div className="about-sidebar">
            <div className="about-sidebar-options">
              <div
                className="about-sidebar-option"
                onClick={this.changeSection("overview")}
              >
                Overview
              </div>
              <div
                className="about-sidebar-option"
                onClick={this.changeSection("workplace")}
              >
                Workplace
              </div>
              <div
                className="about-sidebar-option"
                onClick={this.changeSection("education")}
              >
                Education
              </div>
            </div>
          </div>
          <div className="about-content">
            {this.workplaces()}
            {this.education()}
            {this.overview()}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modalName, modalInfo) =>
      dispatch(openModal(modalName, modalInfo))
  };
};

const mapStateToProps = (state, ownProps) => {
  const workplaces = Object.values(state.entities.workplaces).filter(
    workplace => {
      return workplace.user_id == ownProps.match.params.id;
    }
  );
  const educations = Object.values(state.entities.educations).filter(
    education => {
      return education.user_id == ownProps.match.params.id;
    }
  );
  return {
    workplaces,
    educations,
    currentUser: state.session.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage);
