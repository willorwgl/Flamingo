import React from "react"
import { connect } from "react-redux"
import { Link} from "react-router-dom"
class SidebarFriends extends React.Component {

    acceptedFriends() {
      const  acceptedFriends = Object.values(this.props.acceptedFriends)
      if (acceptedFriends.length) {
        const friends = acceptedFriends.slice(0, 9).map((friend) => {
          const { profilePhoto = window.defaultUserIcon } = this.props
          return (
            <div className="friend-icon-container">
              <Link to={`/user/${friend.id}`}>
                <img
                  key={friend.id}
                  src={profilePhoto}
                  className="friend-icon"
                />
              </Link>
              <div className="friend-icon-name">{`${
                friend.first_name
              } ${friend.last_name}`}</div>
            </div>
          );
        })

        return (
          <div className="sidebar-friends-container">
            {friends}
          </div>
        )
      }
      return null
    
    }
    
    render() {
        const acceptedFriends = Object.values(this.props.acceptedFriends).length || null
        return (
          <div className="sidebar-friends">
            <div className="friends-label-container">
              <img src={window.friendsIcon} />
              <span className="friends-label">
                Friends <span className="friend-count">{acceptedFriends}</span>
              </span>
            </div>
            {this.acceptedFriends()}
          </div>
        );
    }


}

const mapStateToProps = (state) => {
  // const acceptedFriendships = Object.values(state.entities.friendships).map((friendship) => {
  //   return friendship.state === "accepted"
  // })
  const acceptedFriends = state.entities.friendships.friends || {}
  return {
    acceptedFriends
  }
}

export default connect(mapStateToProps)(SidebarFriends)