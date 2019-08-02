import React from "react";
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";

class NavLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const value = e.target.value.trim();
    const field = e.currentTarget.name;
    this.setState({ [field]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { loginUser } = this.props;
    loginUser(this.state);
  }

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }
  componentDidUpdate() {
    const { errors, history } = this.props;
    if (Object.values(errors).length) history.push("/login");
  }

  render() {
    return (
      <form className="nav-login-form" onSubmit={this.handleSubmit}>
        <span className="nav-login-label">Email</span>
        <span className="nav-login-label">Password</span>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          className="nav-login-input"
        />

        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          className="nav-login-input"
        />
        <button type="submit" className="nav-login-button">
          Log In
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavLoginForm)
);
