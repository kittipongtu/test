import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ControlledRadioButtonsGroup(props) {
  const { payload, setPayload, option } = props;
  const { title, select } = option;
  const handleChange = (event) => {
    let value = event.target.value;
    let newObject = { ...payload };
    newObject[option?.field] = value;
    setPayload(newObject);
  };

  return (
    <FormControl>
      <Typography fontSize={"medium"} fontWeight={"bold"}>
        {title}
      </Typography>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={payload[option?.field] || ""}
        onChange={handleChange}
      >
        {select.map((item, index) => {
          return (
            <FormControlLabel
              key={index.toString()}
              value={item?.value || ""}
              control={<Radio size={"small"} />}
              label={item?.name}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
