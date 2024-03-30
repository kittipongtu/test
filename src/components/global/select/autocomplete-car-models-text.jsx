import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, useSubscription, gql } from "@apollo/client";
import _ from "underscore";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
import "./style.css";

function SelectBranch(props) {
  const { value, setValue, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription($order_by: [car_models_order_by!]!, $where: car_models_bool_exp!) {
      car_models(order_by: $order_by, where: $where) {
        name
      }
    }
  `;
  let where = {};
  const optionQuery = {
    where: where,
    order_by: { name: "asc" }, // ### sort
  };
  const { data: subData, loading: subLoading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: optionQuery,
  });

  // ### Set Function
  const setUpdateSelecter = (listData) => {
    if (!value?.name) {
      setValue(listData[0]);
    } else {
      let queryList = _.findWhere(listData, {
        name: value.name,
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
    if (subData) {
      let carModels = subData.car_models;
      if (carModels) {
        let pluckData = _.pluck(carModels, "name");
        let unionData = _.union(pluckData);
        // console.log("unionData", unionData);
        setListSelecter(unionData);
        // setUpdateSelecter(carModels);
      }
    }
  }, [subData, subLoading]);

  return (
    <Fragment>
      <Autocomplete
        loading={subLoading}
        freeSolo={option?.freeSolo ? true : false}
        autoSelect={option?.autoSelect ? true : false}
        disabled={option?.disabled ? true : false}
        disableClearable
        autoHighlight
        id="branch"
        options={listSelecter}
        // getOptionLabel={(option) => {
        //   if (typeof option == "object") {
        //     return option.name || "";
        //   } else {
        //     return "";
        //   }
        //   return option
        // }}
        // isOptionEqualToValue={(option, value) => option.name === value.name}
        value={value || ""}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label={option?.label == "" ? "" : option?.label || "เลือกรุ่นรถ"}
              required={option?.required ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              InputProps={{
                ...params.InputProps,
                style: option?.style || {},
                endAdornment: (
                  <React.Fragment>
                    {subLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              variant={option?.variant || "outlined"}
            />
          );
        }}
      />
    </Fragment>
  );
}

export default SelectBranch;
