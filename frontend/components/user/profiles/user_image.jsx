import React from "react";

class UserImage extends React.Component {


    render() {

        return (
        <div className="profile-image-container">
            Image Container!!!


            <div>
                <div className="cover-image-footer">
                    <span className="profile-name">
                        Flamingo
                    </span>
                    <button className="image-footer-button">Update Info</button>

                    <button className="image-footer-button">Activity</button>


                </div>
            </div>

            <div className="profile-image-circle">
                <img className="profile-image" src={window.splashImage}/>

            </div>
           

        </div>
        )
    }
}

export default UserImage