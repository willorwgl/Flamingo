import React from "react";
import { connect } from "react-redux"
import { openModal } from "../actions/modal_actions";
import { destroyWorkplace } from "../actions/workplaces_actions";


class Workplace extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleEdit(e) {
      e.preventDefault()
        const { openModal, workplace} = this.props
        openModal("workplace form", workplace)

  }

  handleDelete(e) {
    e.preventDefault()
    const { deleteWorkplace, workplace } = this.props
    deleteWorkplace(workplace.id)
  }

  render() {
    const { workplace } = this.props;
    return (
      <div className="workplace-container">
        <img src={window.defaultUserIcon} className="workplace-company-icon" />
        <div className="workplace-info">
          <div className="company-name">{workplace.company}</div>
          <div className="workplace-extra">
            {workplace.position} {workplace.city_town}
          </div>
          <div className="workplace-description">{workplace.description}</div>
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
        deleteWorkplace: workplaceId => dispatch(destroyWorkplace(workplaceId))
    }
}



export default connect(null, mapDispatchToProps)(Workplace);
