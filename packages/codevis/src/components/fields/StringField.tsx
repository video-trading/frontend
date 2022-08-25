import { TextField } from "@mui/material";
import React from "react";
import { FieldProps } from "../types";

export default function StringNumberField({
  value,
  onChange,
  index,
}: FieldProps) {
  return (
    <TextField
      fullWidth
      label="Value"
      value={value}
      onChange={(e) => onChange(e.target.value, index)}
      helperText="Some important text"
    />
  );
}
