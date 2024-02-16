"use client";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

export default function ColorCheckbox({ setColors, colors }) {
  const [isChecked, setIsChecked] = useState(true);
  const handleCheck = () => {
    setIsChecked(!isChecked);
    setColors(isChecked);
    console.log(isChecked);
  };
  return (
    <div id="checkbox-div">
      <label htmlFor="checkbox" id="checkbox-label">
        Metro Colors
      </label>
      <br />
      <input
        name="checkbox"
        id="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheck}
      />
    </div>
  );
}
