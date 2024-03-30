import React, { Fragment, useEffect } from "react";
import { TextField } from "@mui/material";

function CustomInputNumberLimit(props) {
  // ### Set State
  /*
  option -> 
    field = field name
    title = title input
    min = min value
    max = max value
  payload = state = {}
  setPayload = setState = {}
  */

  const { payload, setPayload, option } = props;

  const handleChangeInputNumber = (e) => {
    let regex = new RegExp(/^[0-9]+$/, "ig");
    if (option.max < 0 || option.min < 0) {
      regex = new RegExp(/^[0-9]+$|^\-[0-9]+$|^\-$/, "ig");
    }

    const value = e.target.value;
    const name = e.target.name;
    let validate = value ? regex.test(value) : false;

    const newPayload = { ...payload };
    if (validate && value !== "-0" && value !== "00") {
      if (value === "-") {
        newPayload[name] = value;
      } else {
        // --- min and max
        if (parseInt(value) <= option.max && parseInt(value) >= option.min) {
          newPayload[name] = value;
        } else {
          if (!option.min && !option.max) {
            newPayload[name] = value;
          } else {
            // -- min
            if (option.min && !option.max) {
              if (parseInt(value) >= option.min) {
                newPayload[name] = value;
              }
            }

            // -- max
            if (option.max && !option.min) {
              if (parseInt(value) <= option.max) {
                newPayload[name] = value;
              }
            }
          }
        }
      }
    } else if (value === "") {
      newPayload[name] = value;
    } else {
    }
    setPayload(newPayload);
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <TextField
        disabled={option?.disabled ? true : false}
        required={option.require ? true : false}
        // value={
        //   payload[option?.field]
        //     ? payload[option?.field]
        //     : payload[option?.field] == 0 || payload[option?.field] == "0"
        //     ? "0"
        //     : "0"
        // }
        value={payload[option?.field] || 0}
        margin="dense"
        id={option?.field}
        name={option?.field}
        label={option?.title}
        type="text"
        fullWidth
        size="small"
        onChange={(e) => {
          handleChangeInputNumber(e);
        }}
        onBlur={(e) => {
          let value = e.target.value;
          if (value === "") {
            const newPayload = { ...payload };
            newPayload[option?.field] = 0;
            setPayload(newPayload);
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginBottom: 0,
        }}
      />
    </Fragment>
  );
}

export default CustomInputNumberLimit;
