import React from "react"
import Logo from "../logo"

class HomeNavBar extends React.Component {


    render() {
        return (
            <nav>
                <Logo />
                <span>Flamingo</span>
                <NavLoginForm /> 
            </nav>
        )
    }
}

export default HomeNavBar