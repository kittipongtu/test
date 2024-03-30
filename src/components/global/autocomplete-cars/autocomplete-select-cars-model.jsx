import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, useSubscription, gql } from "@apollo/client";
import _ from "underscore";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
import "./style.css";

function AutocompleteTambom(props) {
  const { payload, setPayload, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);
  const [where, setWhere] = useState({});
  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription($where: isr_car_model_bool_exp!, $order_by: [isr_car_model_order_by!]!) {
      isr_car_model(where: $where, order_by: $order_by) {
        model_name
        model_id
        brand_id
      }
    }
  `;
  const optionQuery = {
    where: where,
    order_by: {}, // ### sort
  };
  const { data: subData, loading: subLoading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: optionQuery,
  });

  // ### Set Use Effect
  useEffect(() => {
    if (subData) {
      let provinceList = subData.isr_car_model;
      if (provinceList) {
        let pluckData = _.pluck(provinceList, "model_name");
        let unionData = _.union(pluckData);
        setListSelecter(unionData);
      }
    }
  }, [subData, subLoading]);

  useEffect(() => {
    let brand = option?.relationbrand;
    let newWhere = { ...where };
    if (brand) {
      newWhere.isr_car_brand = {
        brand_name: { _ilike: `%${brand}%` },
      };
      setWhere(newWhere);
    } else {
      delete newWhere.isr_car_brand;
      setWhere(newWhere);
    }
  }, [option?.relationbrand]);

  return (
    <Fragment>
      <Autocomplete
        loading={subLoading}
        freeSolo={option?.freeSolo ? true : false}
        autoSelect={option?.autoSelect ? true : false}
        disabled={option?.disabled ? true : false}
        disableClearable
        autoHighlight
        options={listSelecter}
        value={payload[option?.name] ? payload[option?.name] : ""}
        onChange={(event, newValue) => {
          let newObject = { ...payload };
          newObject[option?.name] = newValue;
          setPayload(newObject);
        }}
        onInputChange={(event, newValue) => {
          let newObject = { ...payload };
          newObject[option?.name] = newValue;
          setPayload(newObject);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              required={option?.required ? true : false}
              label={option?.label == "" ? "" : option?.label || "เลือกทะเบียนจังหวัด"}
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
              InputLabelProps={{
                shrink: true,
              }}
              variant={option?.variant || "outlined"}
            />
          );
        }}
      />
    </Fragment>
  );
}

export default AutocompleteTambom;
