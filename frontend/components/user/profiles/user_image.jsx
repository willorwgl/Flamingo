import React from "react";

class UserImage extends React.Component {

    // componentDidMount() {
    //     const { requestWallPosts } = this.props;
    //     const { id } = this.props.match.params;
    //     requestWallPosts(id, "wall");
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     const { id: currentId } = this.props.match.params;
    //     const { id: prevId } = prevProps.match.params;
    //     if (currentId != prevId) {
    //         const { requestWallPosts } = this.props;
    //         requestWallPosts(currentId, "wall");
    //     }
    // }


    render() {
        const { first_name = '', last_name = ''} = this.props.profileUser
        const fullName = `${first_name} ${last_name}`
        return (
        <div className="profile-image-container">
            <div>
                <div className="cover-image-footer">
                    <span className="profile-name">
                        {fullName}
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


// const mapStateToProps = state => {
//     return {

//     }
// }

// const mapDispatchToProps = dispatch => {

// }

export default UserImage