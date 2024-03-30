import React, { useRef, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

// ### Sound
import NotificationSoundSuccess from "./sound/notification/noti-sound-01.wav";
import NotificationSoundInfo from "./sound/notification/noti-sound-04.wav";
import NotificationSoundWarning from "./sound/notification/noti-sound-02-alert.wav";
import NotificationSoundError from "./sound/notification/noti-sound-03.wav";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomizedSnackbars(props) {
  const audioPlayerSuccess = useRef("noti-success");
  const audioPlayerInfo = useRef("noti-info");
  const audioPlayerWarning = useRef("noti-warning");
  const audioPlayerError = useRef("noti-error");

  const [notiVolume, setNotiVolume] = useState(0.5);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    let tempValue = { ...props.values };
    tempValue.status = false;
    props.setValues({ ...tempValue });
  };

  // ### Set Use Effect
  useEffect(() => {
    if (props.values.status) {
      switch (props.values.type) {
        case "success":
          audioPlayerSuccess.current.volume = notiVolume;
          audioPlayerSuccess.current.play();
          break;
        case "info":
          audioPlayerInfo.current.volume = notiVolume;
          audioPlayerInfo.current.play();
          break;
        case "warning":
          audioPlayerWarning.current.volume = notiVolume;
          audioPlayerWarning.current.play();
          break;
        case "error":
          audioPlayerError.current.volume = notiVolume;
          audioPlayerError.current.play();
          break;
      }
    }
  }, [props.values.status]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={props.values.status}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Alert onClose={handleClose} severity={props.values.type}>
          {props.values.message}
        </Alert>
      </Snackbar>
      <audio ref={audioPlayerSuccess} src={NotificationSoundSuccess} />
      <audio ref={audioPlayerInfo} src={NotificationSoundInfo} />
      <audio ref={audioPlayerWarning} src={NotificationSoundWarning} />
      <audio ref={audioPlayerError} src={NotificationSoundError} />
    </div>
  );
}