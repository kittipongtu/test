import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from 'axios';
import { hostname } from "../../../hostname";
import { useState } from "react";
import Swal from 'sweetalert2'

function CreatePermissionDialog({ open, setOpen, permission, setPermission, id, callback }) {
  const [disableButton, setDisableButton] = useState(true);

  const addPermission = async () => {
    let formData = [];
    await permission.forEach(element => {
      if (element.approved === true) {
        formData.push({
          role_id: id,
          permission_id: element.id,
        })
      }
    })
    try {
      await axios.post(
        `${hostname}/api/permission_group/create-many`,
        { component: formData }
      ).then(response => {
        if (response.status === 201) {
          Swal.fire(
            'Success',
            'Add Successfully',
            'success'
          )
          callback();
          setPermission([]);
          setDisableButton(true);
          setOpen(false);
        }
      });
    } catch (error) {
      if (error.response) {
        Swal.fire(
          'Failure',
          error.response.data.detail,
          'error'
        )
      } else {
        Swal.fire(
          'Failure',
          'An error occurred while add permission',
          'error'
        )
      }
    }
    // try {
    //   const { data } = await axiosInstance.post(`/api/permission_group/create-many`, {component: formData});
    //   if(data.status) {
    //     callback();
    //     setPermission([]);
    //     setDisableButton(true);
    //     setOpen(false);
    //   }
    // }catch(err) {
    //   alert(err);
    // }
  }

  const handlerOpenButton = async () => {
    const result = await permission.filter(item => item.approved === true);
    if (result.length !== 0) {
      setDisableButton(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        setDisableButton(true);
        setOpen(false);
      }}
      fullWidth
    >
      <DialogTitle>
        <b>{`ADD PERMISSION`}</b>
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          * Please check the information before clicking to confirm.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {permission?.length !== 0 ? (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              spacing={1.5}
            >
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" }}
              >
                <Table
                  sx={{
                    minWidth: 400,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Selected</TableCell>
                      <TableCell align="left">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permission?.map((item, index) => (
                      <TableRow
                        key={item.permission_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" width={30} scope="row">
                          <Checkbox
                            color="info"
                            value={item.approved}
                            onClick={(e) => {
                              let item = [...permission];
                              item[index].approved = e.target.checked;
                              setPermission(item);
                              handlerOpenButton();
                            }}
                          />
                        </TableCell>
                        <TableCell align="left" width={200}>
                          {`${item.permission_name} | ${item.permission_display_name}`}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                disabled={disableButton}
                sx={{ mt: 3, boxShadow: 0, borderRadius: "3px" }}
                variant="contained"
                color="success"
                onClick={addPermission}
              >
                ADD PERMISSION
              </Button>
            </Grid>
          ) : (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              spacing={1.5}
            >
              <Grid sx={{ textAlign: "center" }}>
                <img
                  src="/image/permission-have.svg"
                  style={{ maxWidth: "250px", maxHeight: "220px" }}
                />
              </Grid>
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                มีครบทุกสิทธิ์
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, boxShadow: 0 }}
                color="success"
                fullWidth
                onClose={() => {
                  setDisableButton(true);
                  setOpen(false);
                }}
              >
                ปิดหน้าต่าง
              </Button>
            </Grid>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePermissionDialog;
