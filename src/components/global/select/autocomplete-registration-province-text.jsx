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

  // ### Set Function
  const setUpdateSelecter = (listData) => {
    if (!value?.name_th) {
      setValue(listData[0]);
    } else {
      let queryList = _.findWhere(listData, {
        id: value.name_th,
      });
      if (queryList) {
        setValue(queryList);
      } else {
        setValue(listData[0]);
      }
    }
  };

  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription(
      $order_by: [license_plate_province_order_by!]!
      $where: license_plate_province_bool_exp!
    ) {
      license_plate_province(order_by: $order_by, where: $where) {
        timestamp
        name_th
        name_en
        id
      }
    }
  `;
  let where = {};
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
      let prvinceList = subData.license_plate_province;
      if (prvinceList) {
        let pluckData = _.pluck(prvinceList, "name_th");
        let unionData = _.union(pluckData);
        setListSelecter(unionData);
        // setUpdateSelecter(subData.license_plate_province);
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
        // getOptionLabel={(option) => option.name_th}
        // getOptionLabel={(option) => {
        //   if (typeof option == "object") {
        //     return option.name_th || "";
        //   } else {
        //     return "";
        //   }
        // }}
        // isOptionEqualToValue={(option, value) => option.name_th === value.name_th}
        value={value || ""}
        onChange={(event, newValue) => {
          setValue(newValue);
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
              // sx={{fontSize:"small"}}
              variant={option?.variant || "outlined"}
              // variant="standart"
              // required
            />
          );
        }}
      />
    </Fragment>
  );
}

export default SelectBranch;
