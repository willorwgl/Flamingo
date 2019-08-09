import React from "react";
import { connect } from "react-redux";
import { login, clearErrors } from "../actions/session_actions";
import ErrorBubble from "./signup/error_bubble";

let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailErrorVisible: false,
      passwordErrorVisible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleNotYouClick = this.handleNotYouClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // const { emailError = null, passwordError = null } = this.props.errors;
    const { loginUser } = this.props;
    loginUser(this.state);
    // emailError && this.setState({ password: "", email: "" });
    // passwordError && this.setState({ password: "" });
  }

  handleChange(e) {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({ [field]: value });
  }

  handleBlur(e) {
    const classes = e.currentTarget.classList;
    const { emailError = null, passwordError } = this.props.errors;
    this.setState({ passwordErrorVisible: false, emailErrorVisible: false });
    const field = e.target.name;
    field === "email" && emailError && classes.add("login-input-error");
    field === "password" && passwordError && classes.add("login-input-error");
  }

  handleFocus(e) {
    const classes = e.currentTarget.classList;
    const field = e.target.name;
    const { emailError = null, passwordError } = this.props.errors;
    if (classes.contains("login-input-error")) {
      classes.remove("login-input-error");
      field === "email" &&
        emailError &&
        this.setState({ emailErrorVisible: true });
      field === "password" &&
        passwordError &&
        this.setState({ passwordErrorVisible: true });
    }
  }

  handleCreateAccountClick(e) {
    this.props.history.push("/");
  }

  handleNotYouClick(e) {
    e.preventDefault();
    const { clearErrors } = this.props;
    clearErrors();
  }

  display() {
    const { emailError = null, passwordError = null } = this.props.errors;
    const { emailErrorVisible } = this.state;
    let display;
    if ((!emailError && !passwordError) || emailError) {
      display = (
        <>
          <div className="login-form-label">Log Into Flamingo</div>
          <div
            className={
              emailError
                ? "login-input-error login-page-input"
                : "login-page-input"
            }
            onClick={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <input
              type="text"
              name="email"
              className="login-email-input"
              value={this.state.email}
              placeholder="Email"
            />

            {emailErrorVisible ? (
              <ErrorBubble
                message={emailError}
                className="login-email-error-bubble"
              />
            ) : null}
          </div>
        </>
      );
    } else {
      const { first_name, last_name, email, profilePhoto = window.defaultUserIcon } = this.props.errors.attemptedUser;
      const fullName = `${first_name} ${last_name}`;
      display = (
        <div className="login-page-user">
          <img className="login-page-user-icon" src={profilePhoto} />
          <div className="login-page-user-name">Log in as {fullName}</div>
          <div className="login-page-user-extra">
            <span className="login-page-user-email">{email} </span>{" "}
            <span
              className="login-page-user-error"
              onClick={this.handleNotYouClick}
            >
              Not You?
            </span>
          </div>
          <span />
        </div>
      );
    }
    return display;
  }

  render() {
    const { passwordError = null } = this.props.errors;
    const { passwordErrorVisible } = this.state;
    return (
      <>
        <div className="login-page-nav">
          <div className="login-nav-header">
            <span className="login-nav-title">flamingo</span>
            <button
              className="nav-create-account-btn"
              onClick={this.handleCreateAccountClick}
            >
              Create new account
            </button>
          </div>
        </div>
        <div className="login-page-body">
          <div className="login-form-container">
            <form
              className="login-form"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            >
              {this.display()}
              <div
                className={
                  passwordError
                    ? "login-input-error login-page-input"
                    : "login-page-input"
                }
                onClick={this.handleFocus}
                onBlur={this.handleBlur}
              >
                <input
                  className="login-password-input"
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                />
                {passwordErrorVisible ? (
                  <ErrorBubble
                    message={passwordError}
                    className="login-password-error-bubble"
                  />
                ) : null}
              </div>

              <button type="submit" className="login-page-button">
                Log In
              </button>

              <span className="login-line-separator">or</span>

              <button
                className="create-account-btn"
                onClick={this.handleCreateAccountClick}
              >
                Create new account
              </button>
            </form>
          </div>
        </div>
      </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
