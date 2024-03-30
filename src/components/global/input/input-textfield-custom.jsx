import React, { Fragment, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function DialogAddBooking(props) {
  // ### Set Props
  const { payload, setPayload, option } = props;

  // ### Set Function
  const handleChangeContext = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    let newObject = { ...payload };

    if (key) {
      newObject[key] = value;
      setPayload(newObject);
    } else {
      return;
    }
  };

  return (
    <Fragment>
      <TextField
        fullWidth
        required={option?.required || false}
        id={option?.name || ""}
        name={option?.name || ""}
        label={option?.label || ""}
        value={payload[option?.name] || ""}
        disabled={option?.disabled ? true : false}
        type="text"
        size="small"
        onChange={handleChangeContext}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Fragment>
  );
}
