import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useMemo } from "react";
import { FieldProps } from "../types";

export default function StringNumberField({
  value,
  onChange,
  index,
}: FieldProps) {
  const booleanValue: boolean = useMemo(() => {
    if (value === "true") {
      return true;
    }
    return false;
  }, [value]);

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox />}
        label="Label"
        checked={booleanValue}
        onChange={(e, checked) => {
          if (checked) {
            onChange("true", index);
          } else {
            onChange("false", index);
          }
        }}
      />
    </FormGroup>
  );
}
