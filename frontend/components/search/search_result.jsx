import React from "react";
import { connect } from "react-redux";
import { searchUsers } from "../../actions/users_actions";
import { Link } from "react-router-dom"

class SearchResult extends React.Component {
  componentDidMount() {
    const { search } = this.props;
    const queryString = this.props.match.params.query_string;
    search(queryString, "full");
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
    const { peopleResults = {} } = this.props;
    const resultArray = Object.values(peopleResults).map(person => {
      const { profilePhoto = window.defaultUserIcon } = person;
      return (
        <div className="person-result">
          <Link to={`/user/${person.id}`}>
            <img src={profilePhoto} className="search-person-icon" />
          </Link>
          <div className="search-user-name-container">
            <Link to={`/user/${person.id}`} className="user-name-link">
              {person.first_name}
            </Link>
          </div>
        </div>
      );
    });
    if (resultArray.length) {
      return <div className="people-results">
    <div className="people-result-label">People</div>
      {resultArray}
      </div>;
    }
    return null;
  }

  render() {
    return (
      <div className="search-page-container">
        {/* <div className="search-result-sidebar">
                    <div className="search-sidebar-label">Filter Results</div>
                </div> */}

        <div className="search-result-main">{this.peopleResults()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (queryString, type) => dispatch(searchUsers(queryString, type))
  };
};

const mapStateToProps = state => {
  return {
    peopleResults: state.entities.searchResults.fullUsers
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);
