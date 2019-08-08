

import React from "react"
import { connect } from "react-redux"


class Friends extends React.Component {

    friends() {
        const acceptedFriends = Object.values(this.props.acceptedFriends)
        return acceptedFriends.map( (friend) => {
            const { profilePhoto = window.defaultUserIcon } = friend
            return (
                <div className="friend-item">
                    <img src={profilePhoto}/>
                </div>
            )
        })
    }

    render() {
        return (
          <div className="friends-container">
            <div className="friends-container-header">
              <div className="friends-header-label">
                <i class="fas fa-user-friends friends-header-icon" />{" "}
                <span className="friends-label">Friends</span>
              </div>
              <div className="friends-header-options">
                    <span>All Friends</span>
              </div>
            </div>

            <div className="user-friends"> 
                {this.friends()}
            </div>
          </div>
        );
    }



}

const mapStateToProps = (state) => {
    const acceptedFriends = state.entities.friendships.friends || {}
    return {
        acceptedFriends
    }
}

export default connect(mapStateToProps)(Friends)