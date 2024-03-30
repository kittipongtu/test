import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import _ from "underscore";

function SelectWorkingType(props) {
  const { value, setValue, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Set Function
  const setUpdateDefaultSelect = (listData) => {
    if (!value?.id) {
      setValue(listData[0]);
    } else {
      let queryList = _.findWhere(listData, {
        id: value.id,
      });
      if (queryList) {
        setValue(queryList);
      } else {
        setValue(listData[0]);
      }
    }
  };

  // ### Set Use Effect
  useEffect(() => {
    let list = [
      // { id: "", label: "ทั้งหมด" },
      { id: "PM", label: "PM : เช็คระยะ" },
      { id: "GR", label: "GR : ปัญหาทั่วไป" },
      { id: "WR", label: "WR : ส่งเคลม" },
      { id: "GC", label: "GC : เคลือบแก้ว" },
      { id: "BP", label: "BP : สีและตัวถัง" }, // งานสีและตัวถัง
    ];

    if (option?.select_other) {
      // list.unshift(value);
      // console.log("list", list);
      list = option.select_other.concat(list);
    }
    setListSelecter(list);
    setUpdateDefaultSelect(list);
  }, []);

  return (
    <Fragment>
      <Autocomplete
        disabled={option?.disabled ? true : false}
        disableClearable
        autoHighlight
        id="booking_type"
        options={listSelecter}
        // getOptionLabel={(option) => option.label || ""}
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
              label="เลือกประเภทงาน"
              size="small"
              InputProps={newInportProps}
              required={option?.required ? true : false}
              style={option?.style || {}}
            />
          );
        }}
      />
    </Fragment>
  );
}

export default SelectWorkingType;
