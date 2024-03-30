import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import _ from "underscore";
import moment from "moment";

function SelectCompany(props) {
  const { value, setValue } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Set Use Effect
  useEffect(() => {
    let currentMonth = moment().format("YYYY");
    let list = [
      {
        id: currentMonth.toString(),
        label: currentMonth.toString(),
      },
    ];

    let intYears = parseInt(currentMonth);
    for (let i = 1; i <= 10; i++) {
      let obj = {
        id: (intYears + i).toString(),
        label: (intYears + i).toString(),
      };
      let obj2 = {
        id: (intYears - i).toString(),
        label: (intYears - i).toString(),
      };

      list.push(obj);
      list.push(obj2);
    }
    list = _.sortBy(list, (val) => {
      return -val.id;
    });
    setListSelecter(list);
  }, []);

  // Function
  const velifyLabelInput = () => {
    let getLabel = _.findWhere(listSelecter, { id: value });
    return getLabel ? getLabel.label : "";
  };

  return (
    <Fragment>
      <Autocomplete
        sx={{ width: "15vh" }}
        disableClearable
        autoHighlight
        id="years"
        options={listSelecter}
        // getOptionLabel={(option) => option.label}
        getOptionLabel={(option) => {
          if (typeof option == "object") {
            return option.label || "";
          } else {
            return "";
          }
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => {
          const newInportProps = { ...params.InputProps };
          return (
            <TextField
              {...params}
              label="เลือกปี"
              size="small"
              InputProps={newInportProps}
            />
          );
        }}
      />
    </Fragment>
  );
}

export default SelectCompany;
