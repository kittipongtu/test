import React, { Fragment} from "react";
import {
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";

export default function AlertDocument(props) {
  const { option } = props;
  // ### Set Props
  return (
    <Fragment>
      {option.show ? (
        <Grid item xs={12}>
          <Alert severity={option.severity}>
            <AlertTitle>{option.title}</AlertTitle>
            {option.message}
          </Alert>
        </Grid>
      ) : (
        ""
      )}
    </Fragment>
  );
}
