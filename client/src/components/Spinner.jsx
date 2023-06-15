import React from 'react'

function Spinner({ className }) {
  return (
    <div className="spinnerContainer">
      <div className={`lds-ring${className ?? ""}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
