import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { hostname } from "../../hostname";
import axios from "axios";
import swal from "sweetalert"
import { useAlert } from "../global/context-alert-dialog";

function EditRoleDialog({ open, setOpen, emit, setEmit, callback }) {
  const { openAlert, setOpenAlert } = useAlert();

  const editRole = async () => {
    try {
      const { data } = await axios.patch(
        `${hostname}/api/role/${emit?.role_id}`,
        emit
      );
      if (data.status === "success") {
        setEmit({});
        callback();
        setOpenAlert({
          status: true,
          type: "success",
          message: "แก้ไขรายละเอียดสำเร็จ",
        })
        setOpen(false);
      }
    } catch (err) {
      swal("failed!", err, "error");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle><b>{`แก้ไขรายละเอียดสิทธิ์`}</b></DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              mt: 1,
            }}
            spacing={1.5}
          >
            <TextField
              value={emit?.role_name}
              size="small"
              required
              label="ชื่อสิทธิ์"
              variant="outlined"
              onChange={(e) =>
                setEmit({
                  ...emit,
                  ["role_name"]: e.target.value,
                })
              }
            />
            <TextField
              value={emit?.role_display_name}
              size="small"
              required
              label="ชื่อที่แสดงผล (Display)"
              variant="outlined"
              onChange={(e) =>
                setEmit({
                  ...emit,
                  ["role_display_name"]: e.target.value,
                })
              }
            />
            <TextField
              value={emit?.role_description}
              size="small"
              required
              label="รายละเอียด"
              variant="outlined"
              onChange={(e) =>
                setEmit({
                  ...emit,
                  ["role_description"]: e.target.value,
                })
              }
            />
            <Stack spacing={0.5}>
              <Button
                sx={{ boxShadow: 0 }}
                color="primaryCustom"
                disabled={
                  emit?.role_name === undefined ||
                  emit?.role_display_name === undefined ||
                  emit?.role_description === undefined ||
                  emit?.role_name === "" ||
                  emit?.role_display_name === "" ||
                  emit?.role_description === ""
                }
                variant="contained"
                size="small"
                onClick={() => editRole()}
              >
                <SaveIcon fontSize="small" />
                <b>แก้ไขสิทธิ์เข้าใช้งาน</b>
              </Button>
              <Button
                sx={{ boxShadow: 0 }}
                color="danger"
                size="small"
                variant="contained"
                onClick={() => setOpen(false)}
              >
                <b>ยกเลิก</b>
              </Button>
            </Stack>
          </Stack>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default EditRoleDialog;
