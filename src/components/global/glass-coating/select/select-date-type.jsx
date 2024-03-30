import React, { Fragment, useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select, FormHelperText, Typography } from "@mui/material";

function SelectCompany(props) {
  const { payload, setPayload, option } = props;
  const { name, label } = option;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Set Use Effect
  useEffect(() => {
    const list = [
      { value: "day", title: "วัน" },
      { value: "week", title: "สัปดาห์" },
      { value: "month", title: "เดือน" },
      { value: "year", title: "ปี" },
    ];
    setListSelecter(list);
  }, []);

  // ### Set Funciton
  const handleChange = (event) => {
    let fieldName = event.target.name;
    let value = event.target.value;

    let newObject = { ...payload };
    newObject[fieldName] = value;
    setPayload(newObject);
  };
  return (
    <Fragment>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel id="date-type">{label || "รูปแบบเวลา"}</InputLabel>
        <Select
          size="small"
          labelId="date-type"
          id="date-type"
          name={name}
          value={payload[name] || ""}
          label={label || "รูปแบบเวลา"}
          onChange={handleChange}
        >
          {listSelecter.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>
          <span style={{color:"red"}}> วันที่นัดหมายรับถัดไป</span>
        </FormHelperText> */}
      </FormControl>
    </Fragment>
  );
}

export default SelectCompany;
