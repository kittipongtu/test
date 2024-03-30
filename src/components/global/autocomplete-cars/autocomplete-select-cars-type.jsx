import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, useSubscription, gql } from "@apollo/client";
import _ from "underscore";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
import "./style.css";

function AutocompleteCarType(props) {
  const { payload, setPayload, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([
    "1.5 EL",
    "1.5 EL+",
    "1.5 RS",
    "1.5 RS TURBO",
    "1.5 TURBO",
    "1.8 E",
    "1.8 E AT",
    "1.8 EL",
    "2.0 E",
    "2.0 E 4WD",
    "2.0 EL",
    "2.0 S",
    "2.0 SE",
    "2.4 BLACK EDITION",
    "2.4 E",
    "2.4 EL",
    "2.4 EL 2WD",
    "2.4 EL 4WD",
    "2.4 ES 4WD",
    "2.4 S",
    "DT-E (DIESEL)",
    "DT-EL 4WD (DIESEL)",
    "E",
    "E AT",
    "E LIMITED",
    "E:HEV E",
    "E:HEV EL",
    "E:HEV EL+",
    "E:HEV ES",
    "E:HEV RS",
    "E:HEV RS 4WD",
    "E:HEV TECH",
    "EL",
    "EL 4WD",
    "ES 4WD",
    "HATCHBACK TURBO",
    "HATCHBACK TURBO RS",
    "HYBRID",
    "HYBRID TECH",
    "RS",
    "RS CVT",
    "RS+CVT",
    "S",
    "S AT",
    "S CNG AT",
    "S CVT",
    "S CVT AT",
    "S MT",
    "S+",
    "S+CVT",
    "SV",
    "SV AT",
    "SV CVT",
    "SV+CVT",
    "TURBO EL",
    "TURBO RS",
    "V",
    "V AT",
    "V CNG AT",
    "V CVT",
    "V CVT AT",
    "V LIMITED AT",
    "V MT",
    "V+",
    "V+CVT",
    "V+CVT AT",
  ]);
  let subLoading = false;
  return (
    <Fragment>
      <Autocomplete
        loading={subLoading}
        freeSolo={option?.freeSolo ? true : false}
        autoSelect={option?.autoSelect ? true : false}
        disabled={option?.disabled ? true : false}
        disableClearable
        autoHighlight
        options={listSelecter}
        value={payload[option?.name] ? payload[option?.name] : ""}
        onChange={(event, newValue) => {
          let newObject = { ...payload };
          newObject[option?.name] = newValue;
          setPayload(newObject);
        }}
        onInputChange={(event, newValue) => {
          let newObject = { ...payload };
          newObject[option?.name] = newValue;
          setPayload(newObject);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              required={option?.required ? true : false}
              label={option?.label == "" ? "" : option?.label || "เลือกแบบ"}
              size="small"
              InputProps={{
                ...params.InputProps,
                style: option?.style || {},
                endAdornment: (
                  <React.Fragment>
                    {subLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant={option?.variant || "outlined"}
            />
          );
        }}
      />
    </Fragment>
  );
}

export default AutocompleteCarType;
