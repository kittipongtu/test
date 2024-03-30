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
  const [where, setWhere] = useState({ deleted: { _eq: false }, group: { _eq: "maliwan" } });
  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription($where: isr_partners_bool_exp!, $order_by: [isr_partners_order_by!]!) {
      isr_partners(where: $where, order_by: $order_by) {
        short_name
        name
        partners_no
        id
      }
    }
  `;
  const optionQuery = {
    // where: where,
    where: option?.where,
    order_by: {}, // ### sort
  };
  const { data: subData, loading: subLoading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: optionQuery,
  });

  // ### Set Use Effect
  useEffect(() => {
    if (subData) {
      let partnersList = subData.isr_partners;
      if (partnersList) {
        let pluckData = _.pluck(partnersList, "name");
        let unionData = _.union(pluckData);
        setListSelecter(unionData);
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
              label={option?.label == "" ? "" : option?.label || "เลือกบริษัทประกันภัย"}
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
