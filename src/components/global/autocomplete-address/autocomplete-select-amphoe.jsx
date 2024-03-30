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
  const { reference } = option;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);
  const [where, setWhere] = useState({});
  const [tempInput, setTempInput] = useState("");
  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription($where: postcode_bool_exp!, $order_by: [postcode_order_by!]!, $limit: Int!) {
      postcode(where: $where, order_by: $order_by, limit: $limit, distinct_on: amphoe) {
        id
        amphoe
      }
    }
  `;
  const optionQuery = {
    where: where,
    order_by: {}, // ### sort
    limit: 100,
  };
  const { data: subData, loading: subLoading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: optionQuery,
  });

  // ### Set Function
  const handleAutoCompleteChange = (event, newValue) => {
    let newObject = { ...payload };
    newObject[option?.name] = newValue;
    setPayload(newObject);
  };

  const handleBlur = () => {
    if (tempInput) {
      let newObject = { ...payload };
      newObject[option?.name] = tempInput;
      setPayload(newObject);
    } else {
      let newObject = { ...payload };
      newObject[option?.name] = "";
      setPayload(newObject);
    }
  };

  const handleInputChange = (event, newValue) => {
    let newWhere = { ...where };
    newWhere.amphoe = { _ilike: `%${newValue}%` };

    setWhere(newWhere);
    setTempInput(newValue);
  };

  // ### Reject Value
  const setDefaultValueInput = (unionData) => {
    let payloadValue = payload[option?.name];
    if (payloadValue) {
      // let checkValue = unionData.includes(payloadValue);
      // if (!checkValue) {
      //   if (unionData.length == 1) {
      //     setFirstValueInput(unionData[0]);
      //   } else {
      //     if (!payload[option?.name]) {
      //       setFirstValueInput("");
      //     }
      //   }
      // }
    } else {
      if (unionData.length == 1) {
        // setFirstValueInput(unionData[0]);
      }
    }
  };

  const setFirstValueInput = (value) => {
    let newObject = { ...payload };
    newObject[option?.name] = value;
    setPayload(newObject);
  };

  // ### Set Use Effect
  useEffect(() => {
    if (subData) {
      let postcodeList = subData.postcode;
      if (postcodeList) {
        let pluckData = _.pluck(postcodeList, "amphoe");
        let unionData = _.union(pluckData);

        // ### Set Default Value Input
        setDefaultValueInput(unionData);

        // ### Set Option Select
        setListSelecter(unionData);
      }
    }
  }, [subData, subLoading]);

  // ### Set Filter
  useEffect(() => {
    let newWhere = { ...where };
    if (payload[reference?.zipcode || "zipcode"]) {
      newWhere.zipcode = { _ilike: `%${payload[reference?.zipcode || "zipcode"]}%` };
    } else {
      delete newWhere.zipcode;
    }

    if (payload[reference?.province || "province"]) {
      newWhere.province = { _ilike: `%${payload[reference?.province || "province"]}%` };
    } else {
      delete newWhere.province;
    }

    if (payload[reference?.amphoe || "amphoe"]) {
      newWhere.amphoe = { _ilike: `%${payload[reference?.amphoe || "amphoe"]}%` };
    } else {
      delete newWhere.amphoe;
    }

    if (payload[reference?.tambon || "tambon"]) {
      newWhere.tambon = { _ilike: `%${payload[reference?.tambon || "tambon"]}%` };
    } else {
      delete newWhere.tambon;
    }
    setWhere(newWhere);
  }, [
    payload[reference?.zipcode || "zipcode"],
    payload[reference?.province || "province"],
    payload[reference?.amphoe || "amphoe"],
    payload[reference?.tambon || "tambon"],
  ]);

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
        onChange={handleAutoCompleteChange}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        renderInput={(params) => {
          const newInportProps = { ...params.InputProps };
          return (
            <TextField
              {...params}
              required={option?.required ? true : false}
              label={option?.label == "" ? "" : option?.label || "เลือกตำบล"}
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
