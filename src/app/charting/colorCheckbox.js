"use client";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

export default function ColorCheckbox({ setColors, colors }) {
  const handleCheck = () => {
    setColors((currValue)=>!currValue);
  };
  return (
    <FormGroup className="self-center justify-self-center">
      <FormControlLabel control={<Checkbox
        name="checkbox"
        id="checkbox"
        checked={colors}
        onChange={handleCheck}
      />} label="Agency Color" labelPlacement="bottom"/>
    </FormGroup>
  );
}
