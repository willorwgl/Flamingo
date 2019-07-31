import React from "react";

class SearchBar extends React.Component {
  render() {
    return <div className="nav-search-bar">
        <input type="text" placeholder="Search"/>
        <button>Search button</button>
    </div>;
  }
}

export default SearchBar;
