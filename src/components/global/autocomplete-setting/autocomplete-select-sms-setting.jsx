import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, useSubscription, gql } from "@apollo/client";
import _ from "underscore";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
// import "./style.css";

function AutocompleteSelectSMSSetting(props) {
  const { value, setValue, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription($where: isr_sms_setting_bool_exp!, $order_by: [isr_sms_setting_order_by!]!) {
      isr_sms_setting(where: $where, order_by: $order_by) {
        id
        message_sms
        title_name
        deleted
        description
      }
    }
  `;
  let where = { deleted: { _eq: false } };
  const optionQuery = {
    where: where,
    order_by: { timestamp: "asc" }, // ### sort
  };
  const { data: subData, loading: subLoading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: optionQuery,
  });

  // ### Set Function
  const setUpdateSelecter = (listData) => {
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
    if (subData) {
      if (subData.isr_sms_setting) {
        setListSelecter(subData.isr_sms_setting);
        setUpdateSelecter(subData.isr_sms_setting);
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
            return option.title_name || "";
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
          return (
            <TextField
              {...params}
              label={option?.label == "" ? "" : option?.label || "เลือกรูปแบบ SMS"}
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

export default AutocompleteSelectSMSSetting;
