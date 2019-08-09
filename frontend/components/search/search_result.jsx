import React from "react";
import { connect } from "react-redux";
import { searchUsers } from "../../actions/users_actions";
import { requestFriendships } from "../../actions/friendships_actions";
import FriendSearchResult from "./friend_search_result"

class SearchResult extends React.Component {

  componentDidMount() {
    const { search, currentUser, requestUserFriendships } = this.props;
    const queryString = this.props.match.params.query_string;
    search(queryString, "full");
    requestUserFriendships(currentUser.id);
  }


  componentDidUpdate(prevProps) {
    const { search } = this.props;
    const oldQueryString = prevProps.match.params.query_string
      .trim()
      .toLowerCase();
    const currentQueryString = this.props.match.params.query_string
      .trim()
      .toLowerCase();
    if (oldQueryString != currentQueryString) {
      search(currentQueryString, "full");
    }
  }

  

  peopleResults() {
    const { peopleResults = {}} = this.props;
    const resultArray = Object.values(peopleResults).map(friend => {
      return (
        <FriendSearchResult key={friend.id}  friend={friend} />
      );
    });
    if (resultArray.length) {
      return (
        <div className="people-results">
          <div className="people-result-label">People</div>
          {resultArray}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="search-page-container">
        <div className="search-result-main">{this.peopleResults()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (queryString, type) => dispatch(searchUsers(queryString, type)),
    requestUserFriendships: id => dispatch(requestFriendships(id)),
  };
};

const mapStateToProps = state => {
  const currentUser =  state.session.currentUser || {}
  return {
    peopleResults: state.entities.searchResults.fullUsers,
    currentUser: state.session.currentUser,
    friendships: state.entities.friendships,
    currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);
