import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import _ from "underscore";
import { useQuery, useSubscription, gql } from "@apollo/client";
import moment from "moment";

// ### Icon
import CircularProgress from "@mui/material/CircularProgress";

// ### Style
import "./style.css";

function SelectTimeBooking(props) {
  const { value, setValue, option } = props;
  // ### List Selecter
  const [listSelecter, setListSelecter] = useState([]);

  // ### Set Function
  // --- Verify Full Queue Booking
  const setVerifyFullQueue = (listData) => {
    let countData = listData.length;
    for (let i = 0; i < countData; i++) {
      let getVal = listData[i];
      let countBooking = getVal?.car_check_bookings_aggregate?.aggregate?.count || 0;
      let queueSlot = getVal.queue_slot;
      if (countBooking >= queueSlot) {
        if (countData == i + 1) {
          setValue({});
        }
        continue;
      } else {
        setValue(getVal);
        break;
      }
    }
  };

  // --- Update Select On Open Modal
  const setUpdateSelecter = (listData) => {
    console.log("value", value);
    if (!value?.id) {
      // setVerifyFullQueue(listData);
      if (listData[0]) {
        if (option?.payload?.ignore_id) {
          let queryList = _.findWhere(listData, {
            id: option?.payload?.ignore_id,
          });
          if (queryList) {
            setValue(queryList);
          } else {
            setVerifyFullQueue(listData);
          }
        } else {
          setVerifyFullQueue(listData);
        }
      } else {
        setValue({});
      }
    } else {
      if (listData[0]) {
        let queryList = _.findWhere(listData, {
          id: value.id,
        });
        if (queryList) {
          setValue(queryList);
        } else if (option?.payload?.ignore_id) {
          let queryList = _.findWhere(listData, {
            id: option?.payload?.ignore_id,
          });
          if (queryList) {
            setValue(queryList);
          } else {
            setVerifyFullQueue(listData);
          }
        } else {
          setVerifyFullQueue(listData);
        }
      } else {
        setValue({});
      }
    }
  };

  // ### Subscript Data
  const COMMENTS_SUBSCRIPTION = gql`
    subscription MySubscription(
      $where: car_check_schedule_bool_exp!
      $order_by: [car_check_schedule_order_by!]!
      $where1: car_check_booking_bool_exp!
    ) {
      car_check_schedule(where: $where, order_by: $order_by) {
        booking_jobs_type
        schedule_default_id
        schedule_range_id
        end_time
        queue_slot
        schedule_date
        start_time
        company_id
        id
        car_check_bookings_aggregate(where: $where1) {
          aggregate {
            count
          }
        }
      }
    }
  `;
  const optionPayload = option?.payload;
  let where = {
    company_id: { _eq: optionPayload?.branch?.company_id || 0 },
    booking_jobs_type: { _eq: optionPayload?.type?.id || "" },
    schedule_date: { _eq: optionPayload?.schedule_date || null },
  };
  let whereBooking = {
    deleted: { _eq: false },
    state: { _nin: ["Cancel", "CustomerCancel"] },
  };
  // console.log("option", option);
  // if (option?.payload?.ignore_id) {
  //   whereBooking.id = { _neq: option?.payload?.ignore_id };
  // }
  const optionQuery = {
    where: where,
    where1: whereBooking,
    order_by: { start_time: "asc" }, // ### sort
  };
  const { data: subData, loading: subLoading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: optionQuery,
  });

  // ### Set Use Effect
  useEffect(() => {
    if (subData) {
      if (subData.car_check_schedule) {
        setListSelecter(subData.car_check_schedule);
        setUpdateSelecter(subData.car_check_schedule);
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
        // getOptionLabel={(option) => option.label || ""}
        getOptionLabel={(option) => {
          if (typeof option == "object" && option?.start_time) {
            let startTime = moment(option.start_time, "HH:mm").format("HH:mm");
            let endTime = moment(option.end_time, "HH:mm").format("HH:mm");
            let countBooking = option?.car_check_bookings_aggregate?.aggregate?.count || 0;

            let label = `${startTime} ~ ${endTime} (${countBooking}/${option.queue_slot})${
              countBooking >= option.queue_slot ? " เต็ม" : ""
            }`;
            return label || "";
          } else {
            return "";
          }
        }}
        getOptionDisabled={(option) => {
          let countBooking = option?.car_check_bookings_aggregate?.aggregate?.count || 0;
          let queueSlot = option.queue_slot;
          if (countBooking >= queueSlot) {
            return true;
          } else {
            return false;
          }
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => {
          const newInportProps = { ...params.InputProps };
          return (
            <TextField
              {...params}
              label={option?.label == "" ? "" : option?.label || "เลือกช่วงเวลานัดหมาย"}
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

export default SelectTimeBooking;
