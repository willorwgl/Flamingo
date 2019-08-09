import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../actions/modal_actions";
import { createEducation, patchEducation } from "../actions/educations_actions";

class EducationForm extends React.Component {
    constructor(props) {
        super(props);
        const { education = {} } = props;
        this.state = {
            school: education.school || "",
            description: education.description || ""
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
        closeModal("education form");
    }

    handleSave(e) {
        e.preventDefault();
        const { addEducation, closeModal, updateEducation, education } = this.props;
        if (education.id) {
            const newEducation = Object.assign(this.state)
            newEducation.id = education.id
            updateEducation(newEducation)
        } else {
            addEducation(this.state);
        }
        closeModal("education form");
    }

    render() {
        return (
            <div className="workplace-form-container">
                <div className="workplace-input-container">
                    <div className="workplace-input-label">School</div>
                    <input
                        placeholder="What school did you attend?"
                        type="text"
                        name="school"
                        className="workplace-input"
                        onChange={this.handleChange}
                        value={this.state.school}
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
                        disabled={this.state.school.trim() ? false : true}
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
        addEducation: education => dispatch(createEducation(education)),
        updateEducation: education => dispatch(patchEducation(education))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EducationForm);
