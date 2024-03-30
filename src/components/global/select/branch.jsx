import React, { Fragment, useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useCompany } from "../../../api/company"

function SelectBranch(props) {
  const { value, setValue } = props;
  const { data: branchData, isLoading, error } = useCompany();
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Set Use Effect
  useEffect(() => {

  }, []);

  // ### Set Funciton
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Fragment>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel id="company">เลือกสาขา</InputLabel>
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
            <em>--เลือกสาขา--</em>
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

export default SelectBranch;
