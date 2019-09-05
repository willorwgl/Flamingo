import React from "react";
import { searchUsers } from "../../actions/users_actions";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { clearResults } from "../../actions/search_actions";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.searchButtonRef = React.createRef();
    this.state = {
      search: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChange(e) {
    const value = e.target.value.trim();
    const { search, clearResults } = this.props;
    this.setState({ search: value });
    search(value, "lite");
    if (!value) clearResults();
  }

  handleSearch(e) {
    const { search } = this.state;
    e.preventDefault()
    if (!search) return;
    this.props.history.push(`/search/${search}`);
    this.setState({
      search: ""
    });
    clearResults();
  }

  handleEnter(e) {
    if (event.key === "Enter") {
      this.handleSearch(e);
    }
  }

  handleBlur(e) {
    const { clearResults } = this.props;
    this.searchButtonRef.current.classList.remove("in-search");
    setTimeout(() => {
      clearResults();
    }, 500);
  }

  handleFocus(e) {
    const value = e.target.value.trim();
    const { search } = this.props;
    this.searchButtonRef.current.classList.add("in-search");
    if (value) {
      search(value, "lite");
    }
  }

  render() {
    return (
      <>
        <div className="nav-search-bar">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onKeyPress={this.handleEnter}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={this.state.search}
          />
          <i
            onClick={this.handleSearch}
            className="fas fa-search  search-button"
            ref={this.searchButtonRef}
          />
          {this.searchResults()}
        </div>
      </>
    );
  }

  searchResults() {
    const { searchResults = {} } = this.props;
    const searchResultsArray = Object.values(searchResults);
    const results = searchResultsArray.length
      ? searchResultsArray.map(result => {
          return (
            <Link
              to={`/search/${result.first_name} ${result.last_name}`}
              className="search-result-link"
              key={result.id}
            >
              <div className="search-result">{`${result.first_name} ${result.last_name}`}</div>
            </Link>
          );
        })
      : null;
    if (results) {
      return <div className="search-result-container">{results}</div>;
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (queryString, type) => dispatch(searchUsers(queryString, type)),
    clearResults: () => dispatch(clearResults())
  };
};

const mapStateToProps = state => {
  return {
    searchResults: state.entities.searchResults.liteUsers
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar)
);
