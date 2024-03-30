import axios from "axios";
import { useState } from "react";
import { hostname } from "../../../hostname"
import Snackbar from "../../../utils/snackbar";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, DialogActions, Button } from "@mui/material";

function DeletePermission({ open, setOpen, role, permission, callback }) {
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    type: "",
    msg: "",
  });

    const deleteData = async () => {
        try {
            const {data} = await axios.delete(`${hostname}/api/permission-group/delete-by-permission/${permission.permission_id}/role/${role.role_id}`);
            if(data.status === 'success') {
                callback();
                setOpenSnackbar({
                  status: true,
                  type: "success",
                  msg: "ลบรายการนี้สำเร็จ",
                });
                setOpen(false);
            }
        }catch(err) {
            alert(err);
        }
    }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
      <DialogTitle>ต้องการลบรายการนี้</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            คุณแน่ใจหรือไม่ว่าต้องการลบ {permission?.permissions?.permission_name} ออกจาก {role?.role_name} ?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mr: "15px", mb: "15px", mt: "8px" }}>
        <Button onClick={() => setOpen(false)} color="inherit">
          ยกเลิก
        </Button>
        <Button onClick={() => deleteData()} color="danger" variant="contained">
          ตกลง
        </Button>
      </DialogActions>
      <Snackbar values={openSnackbar} setValues={setOpenSnackbar} />
    </Dialog>
  );
}

export default DeletePermission;
