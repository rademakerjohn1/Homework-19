import React, { Component } from "react";
import "../styles/Header.css"

// This component is a div tag with an h1 and p tag inside

export default class Header extends Component {
    render() {
      return (
        <div className="header">
          <h1>Employee Directory</h1>
          <p>Click on carrots to filter by heading or use the search box to narrow your results.</p>
        </div>
      )
    }
  }