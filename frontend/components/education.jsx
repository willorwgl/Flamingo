import React from "react";
import { connect } from "react-redux"
import { openModal } from "../actions/modal_actions";
import { destroyEducation } from "../actions/educations_actions";


class Education extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleEdit(e) {
        e.preventDefault()
        const { openModal, education } = this.props
        openModal("education form", education)

    }

    handleDelete(e) {
        e.preventDefault()
        const { deleteEducaton, education } = this.props
        deleteEducaton(education.id)
    }

    render() {
        const { education } = this.props;
        return (
            <div className="workplace-container">
                <img src={window.defaultUserIcon} className="workplace-company-icon" />
                <div className="workplace-info">
                    <div className="company-name">{education.school}</div>
                    <div className="workplace-description">{education.description}</div>
                </div>

                <i class="far fa-edit edit-post" onClick={this.handleEdit} />
                <i class="far fa-trash-alt delete-post" onClick={this.handleDelete} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: (modalName, modalInfo) => dispatch(openModal(modalName, modalInfo)),
        deleteEducaton: educationId => dispatch(destroyEducation(educationId))
    }
}



export default connect(null, mapDispatchToProps)(Education);
