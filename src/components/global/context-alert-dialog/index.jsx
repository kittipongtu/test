import { createContext, useContext, useState, Fragment } from "react";
import AlertDialog from "../alert-dialog";

const AlertDialogContext = createContext({
  openAlert: {
    status: false,
    type: "",
    message: "",
  },
  setOpenAlert: null,
});

export function AlertProvider({ children }) {
  const [openAlert, setOpenAlert] = useState(false);
  const value = { openAlert, setOpenAlert };
  return (
    <Fragment>
      <AlertDialogContext.Provider value={value}>
        {children}
      </AlertDialogContext.Provider>
      <AlertDialog values={openAlert} setValues={setOpenAlert} />
    </Fragment>
  );
}

export function useAlert() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertDialogProvider");
  }
  return context;
}