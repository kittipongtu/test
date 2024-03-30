import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { hostname } from "../../hostname";
import axios from "axios";
import { useAlert } from "../global/context-alert-dialog";

function CreateRoleDialog({ open, setOpen, callback }) {
  const [roleDetail, setRoleDetail] = useState({});
  const { openAlert, setOpenAlert } = useAlert();

  const addRole = async () => {
    try {
      const { data } = await axios.post(`${hostname}/api/role`, roleDetail);
      if (data.status === "success") {
        setOpenAlert({
          status: true,
          type: "success",
          message: "เพิ่มสิทธิ์การใช้งานสำเร็จ",
        });
        callback();
        setOpen(false);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle><b>{`เพิ่มสิทธิ์การเริ่มต้นของระบบ`}</b></DialogTitle>
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
              size="small"
              required
              label="ชื่อสิทธิ์"
              variant="outlined"
              onChange={(e) =>
                setRoleDetail({
                  ...roleDetail,
                  ["role_name"]: e.target.value,
                })
              }
            />
            <TextField
              size="small"
              required
              label="ชื่อที่แสดงผล (Display)"
              variant="outlined"
              onChange={(e) =>
                setRoleDetail({
                  ...roleDetail,
                  ["role_display_name"]: e.target.value,
                })
              }
            />
            <TextField
              size="small"
              required
              label="รายละเอียด"
              variant="outlined"
              onChange={(e) =>
                setRoleDetail({
                  ...roleDetail,
                  ["role_description"]: e.target.value,
                })
              }
            />
            {/* <Autocomplete
              multiple
              id="tags-standard"
              options={company}
              required
              getOptionLabel={(option) => option.short_name}
              onChange={(e) =>
                setRoleDetail({
                  ...roleDetail,
                  ["role_company"]: e.target.value,
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="สาขาที่กำหนดสิทธิ์"
                />
              )}
            /> */}
            <Stack spacing={0.5}>
              <Button
                sx={{ boxShadow: 0 }}
                color="primaryCustom"
                disabled={
                  roleDetail?.role_name === undefined ||
                  roleDetail?.role_display_name === undefined ||
                  roleDetail?.role_description === undefined ||
                  roleDetail?.role_name === "" ||
                  roleDetail?.role_display_name === "" ||
                  roleDetail?.role_description === ""
                }
                variant="contained"
                size="small"
                onClick={() => addRole()}
              >
                <SaveIcon fontSize="small" />
                <b>เพิ่มสิทธิ์เข้าใช้งาน</b>
              </Button>
              <Button
                sx={{ boxShadow: 0 }}
                color="danger"
                variant="contained"
                onClick={() => setOpen(false)}
                size="small"
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
export default CreateRoleDialog;
