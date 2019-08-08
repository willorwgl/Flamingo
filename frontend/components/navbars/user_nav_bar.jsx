import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import SearchBar from "./search_bar";
import { Link } from "react-router-dom";

class UserNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      showDropdown: false
    };
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  loggedIn() {
    const { loggedIn } = this.props;
    return loggedIn;
  }

  logout(e) {
    const { logout } = this.props;
    logout();
  }

  handleClick(e) {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  dropdown() {
    const { showDropdown } = this.state;
    if (showDropdown) {
      return (
        <div className="nav-dropdown">
          <div onClick={this.logout} className="nav-logout-button"> Log Out</div>
        </div>
      );
    }
  }

  render() {
    let display = null;
    const { currentUser = {} } = this.props;
    const {
      profilePhoto = window.defaultUserIcon,
      first_name = ""
    } = currentUser;
    if (this.loggedIn()) {
      display = (
        <div className="user-nav-bar">
          <div className="nav-options">
            <Link to="/">
              <img className="app-logo" src={window.logo} />
            </Link>
            <SearchBar />
            <div className="profile-button">
              <img src={profilePhoto} className="nav-icon" />{" "}
              <Link className="nav-name" to={`/user/${currentUser.id}`}>
                {first_name}
              </Link>
            </div>

            <Link to="/" className="home-button">
              Home
            </Link>

            <i
              className="fas fa-caret-down nav-caret nav-dropdown-container"
              onClick={this.handleClick}
            >
              {this.dropdown()}
            </i>
          </div>
        </div>
      );
    }
    return display;
  }
}

const mapStateToProps = state => {
  const currentUser = state.session.currentUser;
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser
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
