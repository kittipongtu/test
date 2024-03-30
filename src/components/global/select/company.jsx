import React, { Fragment, useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

function SelectCompany(props) {
  const { value, setValue } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Set Use Effect
  useEffect(() => {
    const list = [
      { value: "สำนักงานใหญ่", title: "สำนักงานใหญ่" },
      { value: "นาคา", title: "นาคา" },
      { value: "ภูเก็ต", title: "ภูเก็ต" },
      { value: "เมืองกระบี่", title: "เมืองกระบี่" },
      { value: "ประชาสโมสร", title: "ประชาสโมสร" },
      { value: "บุรีรัมย์", title: "บุรีรัมย์" },
      { value: "นางรอง", title: "นางรอง" },
      { value: "สุรินทร์", title: "สุรินทร์" },
      { value: "วีรวัฒน์โยธิน", title: "วีรวัฒน์โยธิน" },
    ];
    setListSelecter(list);
  }, []);

  // ### Set Funciton
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Fragment>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel id="company">เลือกบริษัท</InputLabel>
        <Select
          size="small"
          labelId="company"
          id="company"
          name="company"
          value={value || ""}
          label="เลือกบริษัท"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>--เลือกบริษัท--</em>
          </MenuItem>
          {listSelecter.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  );
}

export default SelectCompany;
