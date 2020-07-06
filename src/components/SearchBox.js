import React from "react";
import "../styles/SearchBox.css";

// Renders a div containing an input form with an onchange event that calls handleSearchChange

function SearchBox({ handleSearchChange }) {
    return (
      <div className="searchbox">
        <form className="form-inline">
        <input
          onChange={handleSearchChange}
          placeholder="Filter"
        />
        </form>
      </div>
    );
  }
  export default SearchBox;
  