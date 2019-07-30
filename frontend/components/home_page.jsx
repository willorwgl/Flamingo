import React from "react";
import SignupForm from "./signup/signup_form";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <nav className="nav-bar"> Nav bar </nav>
        <div className="main-container">

                <div className="splash-art"></div>
                <SignupForm />
        </div>
   
      </>
    );
  }
}

export default HomePage;
