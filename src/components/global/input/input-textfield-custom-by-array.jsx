import React, { Fragment, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function DialogAddBooking(props) {
  // ### Set Props
  const { item, listItem, setListItem, option } = props;
  const { index, subIndex } = option;

  // ### Set Function
  const handleChangeContext = (event) => {
    let key = event.target.name;
    let value = event.target.value;

    let newArray = [...listItem];
    let newItem = { ...item };
    newItem[option?.name] = value;
    if (key) {
      newArray[index][subIndex] = newItem;
      setListItem(newArray);
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
        value={item[option?.name]}
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
