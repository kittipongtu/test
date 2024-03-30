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
    subscription MySubscription(
      $order_by: [car_models_order_by!]!
      $where: car_models_bool_exp!
    ) {
      car_models(order_by: $order_by, where: $where) {
        id_ai
        name
      }
    }
  `;
  let where = {};
  const optionQuery = {
    where: where,
    order_by: { id_ai: "asc" }, // ### sort
  };
  const { data: subData, loading: subLoading } = useSubscription(
    COMMENTS_SUBSCRIPTION,
    {
      variables: optionQuery,
    }
  );

  // ### Set Function
  const setUpdateSelecter = (listData) => {
    if (!value?.id_ai) {
      setValue(listData[0]);
    } else {
      let queryList = _.findWhere(listData, {
        id_ai: value.id_ai,
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
      if (subData.car_models) {
        setListSelecter(subData.car_models);
        setUpdateSelecter(subData.car_models);
      }
    }
  }, [subData, subLoading]);

  return (
    <Fragment>
      <Autocomplete
        loading={subLoading}
        disabled={option?.disabled ? true : false}
        disableClearable
        autoHighlight
        id="branch"
        options={listSelecter}
        getOptionLabel={(option) => {
          if (typeof option == "object") {
            return option.name || "";
          } else {
            return "";
          }
        }}
        isOptionEqualToValue={(option, value) => option.id_ai === value.id_ai}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label={option?.label == "" ? "" : option?.label || "เลือกรุ่นรถ"}
              size="small"
              InputProps={{
                ...params.InputProps,
                style: option?.style || {},
                endAdornment: (
                  <React.Fragment>
                    {subLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
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
