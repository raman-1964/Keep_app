import React from "react";
import styles from "./Spinner.module.css";

function Spinner({ className, theme = "dark" }) {
  return (
    <div className="spinnerContainer">
      <div
        className={`${styles.lds_ring} ${className ?? ""} ${
          theme === "light" && styles.light
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
