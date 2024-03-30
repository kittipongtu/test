import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, useSubscription, gql } from "@apollo/client";
import _ from "underscore";
import moment from "moment";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
import "./style.css";

function AutocompleteCarYears(props) {
  const { payload, setPayload, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  useEffect(() => {
    let startYears = moment("2000", "YYYY").startOf("years");
    let currenYears = moment().endOf("years");

    let diffYears = currenYears.diff(startYears, "years");

    let listYears = [];
    for (let i = 0; i <= diffYears; i++) {
      let getYers = moment(startYears).add(i, "years").format("YYYY");
      listYears.push(getYers);
    }
    setListSelecter(listYears);
  }, []);

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
              label={option?.label == "" ? "" : option?.label || "เลือกปี"}
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

export default AutocompleteCarYears;
