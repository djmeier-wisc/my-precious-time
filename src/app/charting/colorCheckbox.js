"use client";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function ColorCheckbox() {
  return (
    <FormControlLabel control={<Checkbox defaultChecked />} label="Color" />
  );
}
