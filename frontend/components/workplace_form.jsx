import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../actions/modal_actions";
import { createWorkplace, patchWorkplace } from "../actions/workplaces_actions";

class WorkplaceForm extends React.Component {
  constructor(props) {
    super(props);
    const { workplace = {} } = props;
    this.state = {
      company: workplace.company || "",
      position: workplace.position || "",
      city_town: workplace.city_town || "",
      description: workplace.description || ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ [field]: value });
  }

  handleCancel(e) {
    e.preventDefault();
    const { closeModal } = this.props;
    closeModal("workplace form");
  }

  handleSave(e) {
    e.preventDefault();
    const { addWorkplace, closeModal, updateWorkplace, workplace } = this.props;
    if (workplace.id) {
        const newWorkplace = Object.assign(this.state)
        newWorkplace.id = workplace.id
            updateWorkplace(newWorkplace)
    } else {
        addWorkplace(this.state);
    }
    closeModal("workplace form");
  }

  render() {

    return (
      <div className="workplace-form-container">
        <div className="workplace-input-container">
          <div className="workplace-input-label">Company</div>
          <input
            placeholder="Where have you worked?"
            type="text"
            name="company"
            className="workplace-input"
            onChange={this.handleChange}
            value={this.state.company}
          />
        </div>
        <div className="workplace-input-container">
          <div className="workplace-input-label">Position</div>
          <input
            placeholder="What is your job title?"
            type="text"
            name="position"
            className="workplace-input"
            onChange={this.handleChange}
            value={this.state.position}
          />
        </div>
        <div className="workplace-input-container">
          <div className="workplace-input-label">City/Town</div>
          <input
            type="text"
            name="city_town"
            className="workplace-input"
            onChange={this.handleChange}
            value={this.state.city_town}
          />
        </div>
        <div className="workplace-input-container">
          <div className="workplace-input-label">Description</div>
          <textarea
            name="description"
            className="description-input"
            onChange={this.handleChange}
            value={this.state.description}
          />
        </div>

        <div className="workplace-form-footer">
          <div className="workplace-input-label" />
          <button
            className="workplace-save-btn"
            onClick={this.handleSave}
            disabled={this.state.company.trim() ? false : true}
          >
            Save Changes
          </button>
          <button className="workplace-cancel-btn" onClick={this.handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: modalName => dispatch(closeModal(modalName)),
    addWorkplace: workplace => dispatch(createWorkplace(workplace)),
    updateWorkplace: workplace => dispatch(patchWorkplace(workplace))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WorkplaceForm);
