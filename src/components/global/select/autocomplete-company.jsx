import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, useSubscription, gql } from "@apollo/client";
import _ from "underscore";

function SelectCompany(props) {
  const { value, setValue } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState({});
  const [loadding, setLoadding] = React.useState(false);

  // ### Set Use Effect
  useEffect(() => {
    const list = [
      { id: "", label: "ทั้งหมด" },
      { id: "ex1", label: "สำนักงานใหญ่" },
      { id: "ex2", label: "นาคา" },
      { id: "ex3", label: "ภูเก็ต" },
      { id: "ex4", label: "เมืองกระบี่" },
      { id: "ex5", label: "ประชาสโมสร" },
      { id: "ex6", label: "บุรีรัมย์" },
      { id: "ex7", label: "นางรอง" },
      { id: "ex8", label: "สุรินทร์" },
      { id: "ex9", label: "วีรวัฒน์โยธิน" },
    ];
    setListSelecter(list);
  }, []);

  // Function
  const velifyLabelInput = () => {
    let getLabel = _.findWhere(listSelecter, { id: value });
    return getLabel ? getLabel.label : "";
  };

  return (
    <Fragment>
      <Autocomplete
        disablePortal
        autoHighlight
        id="company"
        options={listSelecter}
        // renderOption={(props, option) => {
        //   return <li style={{backgroundColor:"red"}} {...props}>{option.label}</li>
        // }}
        value={velifyLabelInput()}
        onChange={(event, newValue) => {
          setValue(newValue.id);
        }}
        renderInput={(params) => {
          const newInportProps = { ...params.InputProps };
          return (
            <TextField
              {...params}
              label="เลือกบริษัท"
              size="small"
              InputProps={newInportProps}
            />
          );
        }}
      />
    </Fragment>
  );
}

export default SelectCompany;
