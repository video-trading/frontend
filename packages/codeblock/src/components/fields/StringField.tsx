import { TextField } from "@mui/material";
import React from "react";
import { FieldProps } from "../types";

export default function StringNumberField({
  value,
  onChange,
  index,
  description,
}: FieldProps) {
  return (
    <TextField
      fullWidth
      label="Value"
      value={(value as string).substring(1, value.length - 1)}
      onChange={(e) => onChange(`"${e.target.value}"`, index)}
      helperText={description}
    />
  );
}
