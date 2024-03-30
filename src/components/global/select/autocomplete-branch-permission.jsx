import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import _ from "underscore";
import store from "../../../redux/store";
import { useQuery, useSubscription, gql } from "@apollo/client";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
import "./style.css";

let branch = store?.getState().branch;
let user = store?.getState().user;

function SelectBranch(props) {
  const { value, setValue, option } = props;

  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Subscript Data
  // const COMMENTS_SUBSCRIPTION = gql`
  //   subscription MySubscription($order_by: [company_order_by!]!, $where: company_bool_exp!) {
  //     company(order_by: $order_by, where: $where) {
  //       navurl
  //       short_name
  //       tokenLineCreditNotification
  //       company_address
  //       company_branch_name
  //       company_header
  //       company_branch_no
  //       company_id
  //       company_name
  //       company_taxid
  //       branchRef2
  //       branchRef1
  //     }
  //   }
  // `;
  // let where = { company_header: { _eq: "H" }, deleted: { _eq: false } };
  // const optionQuery = {
  //   where: where,
  //   order_by: { company_id: "asc" }, // ### sort
  // };
  // const { data: subData, loading: subLoading } = useSubscription(COMMENTS_SUBSCRIPTION, {
  //   variables: optionQuery,
  // });

  const { data: subData, loading: subLoading } = store.getState().subCompany;

  // ### Set Use Effect
  useEffect(() => {
    let company = [];
    if (user?.company?.company_header == "A") {
      if (subData?.company) {
        company = _.where(subData?.company);
      }
    } else {
      company = branch;
    }

    if (option?.select_other) {
      company = option.select_other.concat(company);
    }

    if (!value?.company_id) {
      setValue(company[0] || []);
    } else {
      let getNewCompany = _.findWhere(company, {
        company_id: value.company_id,
      });
      if (getNewCompany) {
        setValue(getNewCompany);
      } else {
        setValue(company[0] || []);
      }
    }
    setListSelecter(company);
  }, [subData, subLoading, branch]);

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
              return `${option.company_name} [${option.company_branch_name}]` || "";
            } else {
              return "";
            }
          }}
        isOptionEqualToValue={(option, value) => option.company_id === value.company_id}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label={option?.label == "" ? "" : option?.label || "เลือกสาขา"}
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
