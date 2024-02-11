"use client";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

export default function ColorCheckbox() {
  const [checked, setChecked] = useState(true);
  const handleCheck = (
    /** @type {{ target: { checked: boolean; }; }} */ box
  ) => {
    if (box.target.checked == true) {
      // return without colors
      console.log("checked!");
    } else {
      console.log("not!");
    }
  };
  return (
    <input
      name="checked"
      type="checkbox"
      checked={checked}
      onChange={handleCheck}
    />
  );
}
//let handleChange = (event) => {
//   const {
//     target: { value },
// } = event;
// setCurrBusList(typeof value === 'string' ? value.split(',') : value);
