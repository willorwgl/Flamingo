import React from "react";
import { connect } from "react-dom";
import { login } from "../actions/session_actions"

class LoginPage extends React.Component {
    
  render() {
    return (
      <div className="login-page">
        <div className="login-page-nav">nav!!!</div>
        <div className="login-form">
          <div className="login-form-label">Log Into Facebook</div>

          <input type="text" name="email" placeholder="Email" />

          <input type="text" name="password" placeholder="password" />

          <button type="submit">Log In</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user) => dispatch(login(user))
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

// export default LoginPage
