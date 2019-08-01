import React from "react"
import UserImage from "./user_image";
import ProfileNavBar from "./profile_nav_bar";
import ProfileSidebar from "./sidebar";
import Wall from "./wall";

class Profile extends React.Component {

    componentDidMount() {

    }

    render() {
        // const { id } = this.props.match.params 
        return (
            <>
            <UserImage/> 
            <ProfileNavBar />
            <div className="profile-main"> 
                <ProfileSidebar />
                <Wall />
            </div>
            </>
        )
    }
}

export default Profile