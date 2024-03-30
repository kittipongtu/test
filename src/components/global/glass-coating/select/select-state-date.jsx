import React, { Fragment, useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

function GlassCoatingSelectStateDate(props) {
  const { value, setValue } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Set Use Effect
  useEffect(() => {
    const list = [
      { value: "All", title: "ทั้งหมด" },
      { value: "BuyService", title: "ซื้อ Package แล้ว" },
      { value: "InService", title: "อยู่ในช่วงเวลาให้บริการ" },
      { value: "CloseService", title: "สิ้นสุดช่วงเวลาการให้บริการ" },
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
        <InputLabel id="state">สถานะ</InputLabel>
        <Select
          size="small"
          labelId="state"
          id="state"
          name="state"
          value={value || ""}
          label="สถานะ"
          onChange={handleChange}
        >
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

export default GlassCoatingSelectStateDate;
