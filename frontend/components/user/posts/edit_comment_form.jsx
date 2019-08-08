import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { patchComment } from "../../../actions/comments_actions"
import { connect } from "react-redux";
import { merge } from "lodash";
import { closeModal } from "../../../actions/modal_actions";

class EditPostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: this.props.comment.body
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(e) {
        const value = e.target.value;
        const field = e.target.name;
        this.setState({ [field]: value });
    }

    handleSave(e) {
        const { comment, editComment, closeModal } = this.props;
        const { body } = this.state;
        const updatedComment = merge({}, comment, { body });
        editComment(updatedComment);
        closeModal()
    }

    handleCancel(e) {
        const { closeModal } = this.props
        closeModal()
    }

    render() {
        const { profilePhoto = window.defaultUserIcon } = this.props.commentUser
        return (
            <div className="edit-comment-container">
                <div className="edit-comment-header">
                    Edit comment
          <i class="fas fa-times edit-photo-cancel" onClick={this.handleCancel} />
                </div>
                <div className="edit-comment-input-container">
                    <img src={profilePhoto} className="edit-comment-icon" />
                    <TextareaAutosize
                        className="edit-comment-input"
                        value={this.state.body}
                        onChange={this.handleChange}
                        name="body"
                    />
                </div>
                <div className="edit-comment-footer">
                    <span className="edit-comment-save" onClick={this.handleSave}>
                        Save
          </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const comment = state.entities.comments[ownProps.commentId]
    return {
        comment,
        commentUser: state.entities.users[comment.author_id]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editComment: comment => dispatch(patchComment(comment)),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPostForm);
