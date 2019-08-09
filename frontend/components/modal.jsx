import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";
import AddPhotoForm from "./add_photo_form";
import EditPostForm from "./user/posts/edit_post_form";
import EditCommentForm from "./user/posts/edit_comment_form";
import WorkplaceForm from "./workplace_form";
import EducationForm from "./education_form";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.modalName) {
    case "add photo":
      component = <AddPhotoForm />;
      break;
    case "edit post":
      component = <EditPostForm postId={modal.modalInfo} />;
      break;
    case "edit comment":
      component = <EditCommentForm commentId={modal.modalInfo} />;
      break;
    case "workplace form":
      component = <WorkplaceForm workplace={modal.modalInfo || {}} />;
      break;
    case "education form":
      component = <EducationForm education={modal.modalInfo || {}} />;
      break;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
