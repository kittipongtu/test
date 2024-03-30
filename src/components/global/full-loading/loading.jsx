import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop(props) {
  const { loading, setLoading } = props;

  return (
    <div>
      <Backdrop
        // sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        sx={{ color: "#fff", zIndex: 999999 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
