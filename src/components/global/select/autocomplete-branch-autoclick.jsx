import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

import store from "../../../redux/store";
import { hostname } from "../../../hostname";

let branch = store?.getState().branch;
let user = store?.getState().user;

function AutocompleteAutoclick(props) {
  const { value, setValue, option } = props;
  const [branchall, setBranchAll] = useState([])
  useEffect(() => {
    autoBranch()
  }, []);

  const autoBranch = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/company/get-branch-autoclick`);
      setBranchAll(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Autocomplete
        disablePortal
        size="small"
        options={branchall}
        disabled={option?.disabled ? true : false}
        isOptionEqualToValue={(option, value) => option.company_id === value.company_id}
        renderInput={(params) => <TextField {...params} label="เลือกสาขา" />}
        getOptionLabel={(option) => {
          if (typeof option == "object") {
            return option.company_branch_name || "";
          } else {
            return "";
          }
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        value={value}
      />
    </>
  );
}

export default AutocompleteAutoclick;
