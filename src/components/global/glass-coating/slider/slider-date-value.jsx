import React, { Fragment, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

import VolumeUp from "@mui/icons-material/VolumeUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function SliderDateValueComponent(props) {
  const { payload, setPayload, option } = props;
  const { max_value, min_value, name } = option;

  const [marks, setMarks] = React.useState([{ value: 0 }]);

  const handleSliderChange = (event, newValue) => {
    let newObject = { ...payload };
    newObject[name] = newValue;
    setPayload(newObject);
  };

  const handleInputChange = (event) => {
    let newObject = { ...payload };
    newObject[name] = event.target.value === "" ? 0 : Number(event.target.value);
    setPayload(newObject);
  };

  const handleBlur = () => {
    let newObject = { ...payload };
    if (value < min_value) {
      newObject[name] = min_value;
    } else if (value > max_value) {
      newObject[name] = max_value;
    }
    setPayload(newObject);
  };

  // const valuetext = (value) => {
  //   return `${value}°C`;
  // };

  useEffect(() => {
    let marksArray = [];
    let marksStep = 10;

    let submin_value = min_value / marksStep;
    for (let i = 0; i < marksStep; i++) {
      marksArray.push({
        value: i * submin_value,
      });
    }

    let submax_value = max_value / marksStep;
    for (let i = 0; i < marksStep; i++) {
      marksArray.push({
        value: i * submax_value,
      });
    }
    setMarks(marksArray);
  }, [max_value, min_value]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Typography fontSize={"small"} id="input-slider" gutterBottom>
        Volume
      </Typography> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <CalendarMonthIcon fontSize="small" />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof payload[name] === "number" ? payload[name] : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={1}
            marks={marks}
            min={min_value}
            max={max_value}
            defaultValue={0}
            // getAriaValueText={valuetext}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item>
          <Input
            value={payload[name]}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: min_value,
              max: max_value,
              type: "number",
              "aria-labelledby": "input-slider",
              // style: { border: 0 ,color:"red"},
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
