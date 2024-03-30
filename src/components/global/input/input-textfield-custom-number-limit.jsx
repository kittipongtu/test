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

  const handleChangeInputNumber = (e) => {
    let regex = "";
    if (option?.float) {
      if (option?.digis) {
        if (option.max < 0 || option.min < 0) {
          regex = new RegExp(
            `^[0-9]+$|^[0-9]+\.$|^[0-9]+\.[0-9]{0,${option?.digis}}$|^-[0-9]+$|^-[0-9]+\.$|^-[0-9]+\.[0-9]{0,${option?.digis}}$`,
            "ig"
          );
        } else {
          regex = new RegExp(`^[0-9]+$|^[0-9]+\.$|^[0-9]+\.[0-9]{0,${option?.digis}}$`, "ig");
        }
      } else {
        if (option.max < 0 || option.min < 0) {
          regex = new RegExp(/^[0-9]+$|^[0-9]+\.$|^[0-9]+\.[0-9]+$|^-[0-9]+$|^-[0-9]+\.$|^-[0-9]+\.[0-9]+$/, "ig");
        } else {
          regex = new RegExp(/^[0-9]+$|^[0-9]+\.$|^[0-9]+\.[0-9]+$/, "ig");
        }
      }
    } else {
      if (option.max < 0 || option.min < 0) {
        regex = new RegExp(/^[0-9]+$|^\-[0-9]+$|^\-$/, "ig");
      } else {
        regex = new RegExp(/^[0-9]+$/, "ig");
      }
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

  return (
    <Fragment>
      <TextField
        fullWidth
        required={option?.required || false}
        id={option?.name || ""}
        name={option?.name || ""}
        label={option?.label || ""}
        value={payload[option?.name] || ""}
        type={option?.type || "text"}
        size="small"
        onChange={handleChangeInputNumber}
        onBlur={(e) => {
          let value = e.target.value;
          const newPayload = { ...payload };

          let defaultValue = "0";
          if (option?.float) {
            if (value === "") {
              defaultValue = "0.00";
              newPayload[option?.name] = defaultValue;
              setPayload(newPayload);
            } else {
              let regex = new RegExp(/^[0-9]+\.$|^-[0-9]+\.$/, "ig");
              value = parseFloat(value).toString();
              if (regex.test(value)) {
                defaultValue = `${value}00`;
                newPayload[option?.name] = defaultValue;
                setPayload(newPayload);
              } else {
                regex = new RegExp(/^[0-9]+$|^-[0-9]+$/, "ig");
                if (regex.test(value)) {
                  defaultValue = `${value}.00`;
                  newPayload[option?.name] = defaultValue;
                  setPayload(newPayload);
                } else {
                  newPayload[option?.name] = value;
                  setPayload(newPayload);
                }
              }
            }
          } else {
            if (value === "") {
              defaultValue = "0";
              newPayload[option?.name] = parseInt(defaultValue);
              setPayload(newPayload);
            } else {
            }
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Fragment>
  );
}
