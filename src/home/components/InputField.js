import React from "react";
import { TextField } from "@material-ui/core";

export const InputField = ({ resetError, onChange, type, label }) => {
  return (
    <span className="field-input">
      <TextField
        onFocus={resetError}
        type={type}
        label={label}
        variant="outlined"
        name={label}
        onChange={onChange}
      />
    </span>
  );
};
