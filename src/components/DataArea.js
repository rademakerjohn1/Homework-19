import React, { Component } from "react";
import "../styles/DataArea.css";
import API from "../utils/API";
import Nav from "./Nav";
import DataTable from "./DataTable";

export default class DataArea extends Component {
  // Defines state 
  state = {
    users: [{}],
    order: "descend",
    filteredUsers: [{}]
  }
  // Array of objects containing data for rendering table headers
  headings = [
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ]

// Toggles state of "order" between 'ascend' and 'descend' when a heading is clicked
// Sorts users accordingly by heading clicked (name, email, dob)
  handleSort = heading => {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend"
      })
    } else {
      this.setState({
        order: "descend"
      })
    }

  const compareFnc = (a, b) => {
      if (this.state.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } 
        else if (heading === "dob") {
          return a[heading].date.localeCompare(b[heading].date);
        } 
        else if (heading === "email") {
          return a[heading].localeCompare(b[heading]);
        } 
        else {
          return a[heading] - b[heading];
        }
      } else {
        // else statement to handle if this.state.order === descend
        if (a[heading] === undefined) {
            return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } 
        else if (heading === "dob") {
          return b[heading].date.localeCompare(a[heading].date);
        } 
        else if (heading === "email") {
          return b[heading].localeCompare(a[heading]);
        } 
        else {
          return b[heading] - a[heading];
        }
      }

    }
    const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    this.setState({ filteredUsers: sortedUsers });
  }

  // Stores value from text input 
  // Filters array of users, returning any whose object contains value from text input
  // Sets state of filteredList to the filtered list above
  handleSearchChange = event => {
    const filter = event.target.value;
    const filteredList = this.state.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ filteredUsers: filteredList });
  }

  // Run getUsers method from API.js to return user profiles
  // Set results as state for users and filteredUsers
  componentDidMount() {
    API.getUsers().then(results => {
      console.log(results.data.results)
      this.setState({
        users: results.data.results,
        filteredUsers: results.data.results
      })
    });
  }

  // Render Nav component, passing in the handleSearchChange method
  // Render DataTable, passing in handleSort, headings object and current state of filteredUsers
  render() {
    return (
      <>
        <Nav handleSearchChange={this.handleSearchChange} />
        <div className="data-area">
          <DataTable
           // we will need to pass in props for headings, users, and handlesort here to DataTable
           headings = {this.headings}
           users = {this.state.filteredUsers}
           handleSort = {this.handleSort}
          />
        </div>
      </>
    );
  }
}