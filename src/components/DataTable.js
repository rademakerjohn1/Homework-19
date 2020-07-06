import React from "react";
import DataBody from "./DataBody";
import "../styles/DataTable.css";

// Renders a table element
// Renders a row inside a table head, with heading for each category by mapping the headings object in DataArea
// Contains the DataBody component
function DataTable({ headings, users, handleSort }) {
  return (
    <div className="datatable mt-5">
      <table id="table" className="table table-striped table-hover table-condensed">
        <thead>
          <tr>
            {headings.map(({ name, width }) => {
              return (
                <th
                  className="col"
                  key={name}
                  style={{ width }}
                  onClick = {() => {
                    handleSort(name.toLowerCase());
                  }}
                >
                  {name}
                <span className="pointer"></span>
                </th>
              ); 
            })}
          </tr>
        </thead>
        <DataBody users={users}></DataBody>
      </table>
    </div>
  )
}

export default DataTable;