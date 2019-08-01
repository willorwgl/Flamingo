import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../../actions/posts_actions";

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "", 
      wall_id: 10
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createPost } = this.props
    createPost(this.state)
  }

  handleChange(e) {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({ [field]: value });
  }

  render() {
    return (
      <form className="create-post-form">
        <div className="create-post-header">
          <span>Create Post</span>
        </div>
        <div className="create-post-body">
          <div className="create-post-icon">icon goes here</div>
          <input
            type="text"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="body goes here"
          />
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Create new post
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePostForm);
