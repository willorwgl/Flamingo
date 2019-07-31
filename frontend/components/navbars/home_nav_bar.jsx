import React from "react"
import Logo from "../logo"
import NavLoginForm from "./nav_login_form"

class HomeNavBar extends React.Component {


    render() {
        return (
          <nav className="home-nav-bar">
            <div className="centered-nav-content">
              {/* <Logo /> */}
              <span className="title">Flamingo</span>
              <NavLoginForm />
            </div>
          </nav>
        );
    }
}

export default HomeNavBar