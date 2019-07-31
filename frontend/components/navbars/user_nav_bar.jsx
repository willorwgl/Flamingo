import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import SearchBar from "./search_bar";

class UserNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  loggedIn() {
    const { loggedIn } = this.props;
    return loggedIn;
  }

  logout(e) {
    const { logout } = this.props;
    logout();
  }

  render() {
    let display = null;
    if (this.loggedIn()) {
      display = (
        <div className="user-nav-bar">
          <SearchBar />
          <button onClick={this.logout}>Log out</button>
        </div>
      );
    }
    return display;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: user => dispatch(logout(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserNavBar);
