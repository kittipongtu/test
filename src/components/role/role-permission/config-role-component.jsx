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
import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react";
import { hostname } from "../../../hostname";

function ConfigRoleComponent({ open, setOpen, component, setComponent }) {

  const updateConfig = async () => {
    let formData = [];
    await component.forEach(element => {
      formData.push({ permission_group_id: element.permission_group_id, isActive: element.isActive });
    })
    try {
      const { data } = await axios.put(`${hostname}/api/permission_group/activate-config`, formData);
      if (data.status === "success") {
        Swal.fire(
          'Success',
          `${data.message}`,
          'success'
        )
        setOpen(false);
        setComponent([]);
      } else {
        Swal.fire(
          'Failure',
          `${data.message}`,
          'error'
        )
      }
    } catch (err) {
      alert(err);
    }
  }
  console.log(component)

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
      >
        <DialogTitle>
          {`ADD PERMISSION`}
          <Typography variant="subtitle2" sx={{ color: "red" }} onClick={() => console.log(component)}>
            * Please verify the information before pressing confirm.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
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
                      <TableCell>Choose</TableCell>
                      <TableCell align="left">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {component?.length !== 0 && component?.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" width={30} scope="row">
                          <Checkbox
                            color="info"
                            checked={item.isActive}
                            onClick={(e) => {
                              let items = [...component];
                              items[index].isActive = e.target.checked;

                              setComponent(items);
                            }}
                          />
                        </TableCell>
                        {/* {item.permission_component &&
                          <TableCell align="left" width={200}>
                            {`${item.permission_component.permission_component_name} | ${item.permission_component.permission_component_display_name}`}
                          </TableCell>
                        } */}
                        {item &&
                          <TableCell align="left" width={200}>
                            {`${item.permission_component_name} | ${item.permission_component_display_name}`}
                          </TableCell>
                        }
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                //   disabled={disableButton}
                sx={{ mt: 3, boxShadow: 0, borderRadius: "3px" }}
                variant="contained"
                color="success"
                onClick={updateConfig}
              >
                บันทึก
              </Button>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>

  );
}

export default ConfigRoleComponent;
