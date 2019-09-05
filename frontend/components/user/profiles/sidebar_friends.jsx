import React from "react"
import { connect } from "react-redux"
import { Link} from "react-router-dom"
class SidebarFriends extends React.Component {

    acceptedFriends() {
      const  acceptedFriends = Object.values(this.props.acceptedFriends)
      if (acceptedFriends.length) {
        const friends = acceptedFriends.slice(0, 9).map((friend) => {
          const { profilePhoto = window.defaultUserIcon } = friend
          return (
            <div className="friend-icon-container" key={friend.id}>
              <Link to={`/user/${friend.id}`}>
                <img
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
        const profileUserId = this.props.profileUser.id
        const acceptedFriends = Object.values(this.props.acceptedFriends).length || null
        return (
          <div className="sidebar-friends">
            <div className="friends-label-container">
              <img src={window.friendsIcon} />
              <Link to={`/user/${profileUserId}/friends`}><span className="friends-label">Friends</span></Link>
              <Link to={`/user/${profileUserId}/friends}`}><span className="friend-count">{acceptedFriends}</span></Link>
            </div>
            {this.acceptedFriends()}
          </div>
        );
    }


}

const mapStateToProps = (state, ownProps) => {
  const { profileUser } = ownProps
  const friendships = Object.values(state.entities.friendships).filter( (friendship) => {
    return (friendship.user_id === profileUser.id || friendship.friend_id === profileUser.id) && friendship.status === "accepted"
  } )
  const friendshipIds = friendships.map((friendship => {
    return friendship.user_id === profileUser.id ? friendship.friend_id : friendship.user_id
  }))
  const acceptedFriends = Object.values(state.entities.users).filter((user) => {
    return friendshipIds.includes(user.id)
  })
  return {
    acceptedFriends
  }
}

export default connect(mapStateToProps)(SidebarFriends)