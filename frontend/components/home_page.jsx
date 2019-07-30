import React from "react";
import SignupForm from "./signup/signup_form";
import Splash from "./splash"

class HomePage extends React.Component {
  render() {
    return (
      <>
        <nav className="nav-bar"> Nav bar </nav>
        <div className="main-container">

                <Splash />
                <SignupForm />
        </div>
   
      </>
    );
  }
}

export default HomePage;
