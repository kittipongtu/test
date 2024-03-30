import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, useSubscription, gql } from "@apollo/client";
import _ from "underscore";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
import "./style.css";

function AutocompleteSeelctCompany(props) {
  const { select, setSelect, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);
  const [where, setWhere] = useState({
    deleted: { _eq: false },
    company_header: { _neq: "A" },
    company_branch_no: { _eq: "00000" },
  });

  // ### Set Function
  const setUpdateSelecter = (listData) => {
    if (!select?.company_header) {
      setSelect(listData[0]);
    } else {
      let queryList = _.findWhere(listData, {
        company_header: select.company_header,
      });
      if (queryList) {
        setSelect(queryList);
      } else {
        setSelect(listData[0]);
      }
    }
  };

  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription($order_by: [company_order_by!]!, $where: company_bool_exp!) {
      company(distinct_on: company_name, order_by: $order_by, where: $where) {
        company_name
        company_id
        company_header
        branchRef2
      }
    }
  `;
  // let where = {};
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
      if (subData.company) {
        setListSelecter(subData.company);
        setUpdateSelecter(subData.company);
      }
    }
  }, [subData, subLoading]);

  return (
    <Fragment>
      <Autocomplete
        disabled={option?.disabled ? true : false}
        disableClearable
        autoHighlight
        id="branch"
        options={listSelecter}
        getOptionLabel={(option) => {
          if (typeof option == "object") {
            return option.company_name || "";
          } else {
            return "";
          }
        }}
        isOptionEqualToValue={(option, value) => option.company_header === value.company_header}
        value={select}
        onChange={(event, newValue) => {
          setSelect(newValue);
        }}
        renderInput={(params) => {
          const newInportProps = { ...params.InputProps };
          return (
            <TextField
              {...params}
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
              variant={option?.variant || "outlined"}
            />
          );
        }}
      />
    </Fragment>
  );
}

export default AutocompleteSeelctCompany;
