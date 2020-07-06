import React from 'react';
import "../styles/Wrapper.css";

// This component is a div tag that wraps the Header and Main components
// Uses the "children" prop built into react, for when a component doesn't know its children ahead of time

function Wrapper({ children }) {
  return (
      <div className="wrapper">
        { children }
      </div>
  );
}
export default Wrapper;