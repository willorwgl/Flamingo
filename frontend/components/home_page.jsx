import React from "react";
import SignupForm from "./signup/signup_form";
import Splash from "./splash";
import HomeNavBar from "./navbars/home_nav_bar";
import { connect } from "react-redux";
import userHomePage from "./user/user_home_page";
import UserHomePage from "./user/user_home_page";

class FlamingoHomePage extends React.Component {
  loggedIn() {
    const { loggedIn } = this.props;
    return loggedIn;
  }

  splashPage() {
    return (
      <>
        <HomeNavBar />
        <div className="main-container">
          <Splash />
          <SignupForm />
        </div>
      </>
    );
  }

  userHomePage() {
    return <UserHomePage />;
  }

  render() {
    if (this.loggedIn()) {
      return this.userHomePage();
    } else {
      return this.splashPage();
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

export default connect(
  mapStateToProps,
  null
)(FlamingoHomePage);
