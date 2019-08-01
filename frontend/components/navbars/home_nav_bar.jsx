import React from "react"
import Logo from "../logo"
import NavLoginForm from "./nav_login_form"

class HomeNavBar extends React.Component {


    render() {
        return (
          <nav className="home-nav-bar">
            <div className="centered-nav-content">
              <span className="title">flamingo</span>
              <NavLoginForm />
            </div>
          </nav>
        );
    }
}

export default HomeNavBar