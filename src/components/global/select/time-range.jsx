import React, { Fragment, useState, useEffect } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

import { Stack, Typography, TextField } from "@mui/material";

// ### Import Style
import "./style.css";

export default function ResponsiveTimePickers(props) {
  const { value, setValue, option } = props;

  const handleChangeTime = (event, name) => {
    let dataFormat = moment(event).format("HH:mm");
    let objectData = { ...value };
    objectData[name] = dataFormat;

    setValue(objectData);
  };

  useEffect(() => {
    // ### Set Default Value
    let newValue = { ...value };
    if (!newValue.start_time) {
      newValue.start_time = moment().startOf("d").format("HH:mm");
    }
    if (!newValue.end_time) {
      newValue.end_time = moment().startOf("d").format("HH:mm");
    }
    setValue(newValue);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer components={["MobileTimePicker", "MobileTimePicker"]}>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <MobileTimePicker
            slotProps={{ textField: { size: "small", fullWidth: true } }}
            disabled={option?.disabled ? true : false}
            required={option?.require ? true : false}
            label={"เวลาเริ่ม"}
            name="start_time"
            views={["hours", "minutes"]}
            format="HH:mm"
            ampm={false}
            value={moment(value.start_time, "HH:mm")}
            onChange={(newValue) => handleChangeTime(newValue, "start_time")}
          />
          <Typography>{"ถึง"}</Typography>
          <MobileTimePicker
            slotProps={{ textField: { size: "small", fullWidth: true } }}
            disabled={option?.disabled ? true : false}
            required={option?.require ? true : false}
            label={"เวลาสิ้นสุด"}
            name="end_time"
            views={["hours", "minutes"]}
            format="HH:mm"
            ampm={false}
            value={moment(value.end_time, "HH:mm")}
            onChange={(newValue) => handleChangeTime(newValue, "end_time")}
          />
        </Stack>
      </DemoContainer>
    </LocalizationProvider>
  );
}
