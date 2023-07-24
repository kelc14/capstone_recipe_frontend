import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label }) => {
  label = label ? label : "toggle";

  return (
    <div className="container">
      {null}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" name={label} id={label} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
