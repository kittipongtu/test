import React, { Fragment, useState, useEffect, createRef } from "react";
import { Grid, Box, Tabs, Tab, Paper } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { tabsClasses } from "@mui/material/Tabs";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { v4 as uuidv4 } from "uuid";
import moment from "moment";
let monthNameTH = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
let dayNameTH = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
moment.updateLocale("th", {
  months: monthNameTH,
  days: dayNameTH,
});
moment.locale("th");

// ### Style
function TabsSelectDateCustom(props) {
  const { value, setValue, option } = props;
  const fragmentRef = createRef();
  // ### Set State
  const [tabsList, setTabsList] = useState([]);
  // const [widthTabsSelect, setWidthTabsSelect] = useState(0);

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setValue(newValue);
  };

  // ### Set Function
  const queryListDateRange = () => {
    let result = [];

    for (let i = option?.start_range || 0; i < option?.range || 0; i++) {
      const dateFormat = moment().add(i, "d").format(`DD/MM/YYYY`);
      let obj = {
        id: dateFormat,
        title: dateFormat,
      };
      result.push(obj);
    }

    return result;
  };

  useEffect(() => {
    let listDateRange = queryListDateRange();
    setTabsList(listDateRange);
    if (!value) {
      setValue(listDateRange[0].id);
    }
  }, [option]);

  useEffect(() => {
    // setWidthTabsSelect(fragmentRef.current.clientWidth);
  }, []);

  return (
    <Fragment>
      <Paper variant="outlined" sx={{}}>
        <Box
          sx={{
            // width: widthTabsSelect,
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            textColor="secondary"
            indicatorColor="secondary"
            allowScrollButtonsMobile
            scrollButtons="auto"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            {tabsList.map((val) => (
              <Tab
                key={val.id}
                value={val.id}
                label={val.title}
                sx={{
                  minWidth: "fit-content",
                  flex: 1,
                  padding: 1,
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Paper>
    </Fragment>
  );
}

export default TabsSelectDateCustom;
