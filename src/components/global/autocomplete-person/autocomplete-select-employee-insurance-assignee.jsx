import React, { useState, useEffect, useRef, Fragment } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
  const { options, setSelect } = props;

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      //   getOptionSelected={getOptionSelected}
      getOptionLabel={(option) => option.name_th}
      onChange={(event, option) => {
        setSelect([...option]);
      }}
      size={"small"}
      sx={{ width: "200px" }}
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {option.name_th}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="เลือกพนักงาน"
          placeholder=""
        />
      )}
    />
  );
}
