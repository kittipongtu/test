import React, { Fragment, useState, useEffect } from "react";
import { Grid, TextField, Box } from "@mui/material";

import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// ### Style
import "./style.css";

function SelectDateCustom(props) {
  // ### Set Props
  const { value, setValue, option } = props;

  // ### Set Use Effect
  useEffect(() => {}, []);

  // ### Set Funciton
  const handleChangeEndDate = (value) => {
    setValue(moment(value).format("DD/MM/YYYY"));
  };
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DemoContainer components={["DatePicker"]}>
          <Box sx={{ width: "100%" }}>
            <DatePicker
              // clearable
              disabled={option?.disabled || false}
              // sx={{
              //   "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              //     padding: "8.5px 14px",
              //   },
              // }}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
              label={option?.label || ""}
              value={moment(value, "DD/MM/YYYY")}
              format="DD/MM/YYYY"
              onChange={(newValue) => handleChangeEndDate(newValue)}
              renderInput={(params) => <TextField size="small" {...params} />}
              shouldDisableDate={(date) => {
                let result = false;

                // ### Check Current Value
                // let formatDate = date.format("DD/MM/YYYY");
                // if (value == formatDate) {
                //   return result;
                // }

                // ### Holiday
                let allowDate = option?.holiday;
                let getDayName = date.format("ddd").toLowerCase();
                if (allowDate) {
                  if (!allowDate[getDayName]) {
                    result = true;
                  } else {
                  }
                } else {
                }

                // ### Public Holiday
                let listPublicHoliday = option?.public_holiday || [];
                if (listPublicHoliday) {
                  let newFormatDate = date.format("YYYY-MM-DD");
                  let checkPublicHoliday = listPublicHoliday.includes(newFormatDate);
                  if (checkPublicHoliday) {
                    result = true;
                  } else {
                  }
                } else {
                }

                return result;
              }}
              minDate={option?.allow_range?.start_date ? moment(option?.allow_range?.start_date, "DD/MM/YYYY") : false}
              maxDate={option?.allow_range?.end_date ? moment(option?.allow_range?.end_date, "DD/MM/YYYY") : false}
            />
          </Box>
        </DemoContainer>
      </LocalizationProvider>
    </Fragment>
  );
}

export default SelectDateCustom;
