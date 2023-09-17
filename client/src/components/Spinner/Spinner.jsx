import React from "react";
import "./Spinner.css";

function Spinner({ className, theme = "dark" }) {
  return (
    <div className="spinnerContainer">
      <div
        className={`lds-ring ${className ?? ""} ${
          theme === "light" && "light"
        }`}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
