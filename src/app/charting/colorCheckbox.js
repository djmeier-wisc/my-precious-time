"use client";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

export default function ColorCheckbox() {
  const [isChecked, setIsChecked] = useState(true);
  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      // return with colors - not sure why "not" actually *is* checked, but, whatever?
    } else {
      console.log("not!");
    }
  };
  return (
    <div id="checkbox-div">
      <label htmlFor="checkbox" id="checkbox-label">
        Use GTFS Colors
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
