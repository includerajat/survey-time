// Survey Field contains logic to render a label and text input
import { mean } from "lodash";
import React from "react";

export default ({ input, label, meta }) => {
  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        id={label}
        {...input}
        style={{ marginBottom: "5px" }}
      />
      <div className="form-text" style={{ marginBottom: "20px", color: "red" }}>
        {meta.touched ? meta.error : ""}
      </div>
    </div>
  );
};

//drying up fields
