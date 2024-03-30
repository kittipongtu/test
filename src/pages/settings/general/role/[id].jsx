import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import CreatePermissionDialog from "../../../../components/role/role-permission/create-permission-dialog";
import ConfigRoleComponent from "../../../../components/role/role-permission/config-role-component";
import DeletePermission from "../../../../components/role/role-permission/delete-permission";
import { hostname } from "../../../../hostname";

function RoleDetail() {
  const [role, setRole] = useState({});
  const [createPermission, setCreatePermission] = useState([]);
  const [permission, setPermission] = useState([]);
  const [component, setComponent] = useState([]);
  const [openConfigComponent, setOpenConfigComponent] = useState(false);
  const [openCreatePermission, setOpenCreatePermission] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [openDeletePermission, setOpenDeletePermission] = useState(false);
  const { id } = useParams();

  const getPermissionByRoleId = async () => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/permission_group/get-permission/by-role/${id}`
      );
      if (data.status === "success") {
        setPermission(data.result);
        setRole(data.roleData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCreatePermission = async () => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/permission_group/get-by-not/role/${id}`
      );
      if (data.status === "success") {
        setCreatePermission(data.permissions);
        setOpenCreatePermission(true);
      }
    } catch (err) {
      alert(err);
    }
  }

  const getComponent = async (permissionId) => {
    try {
      const { data } = await axios.get(`${hostname}/api/permission_group/get-component/role/${id}/permission/${permissionId}`)
      if (data.status === "success") {
        setComponent(data.result);
        setOpenConfigComponent(true);
      }
    } catch (err) {
      alert(err);
    }
  }

  const deletePermissionHandler = async (element) => {
    setDeleteData(element);
    setOpenDeletePermission(true);
  }

  useEffect(() => {
    getPermissionByRoleId();
  }, []);
  return (
    <>
      <Stack
        direction="column"
        sx={{ mt: { md: -13, xs: -1 }, p: { md: 15, xs: 3 } }}
      >
        {/* <Box sm={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link to="/setting/role" style={{ textDecoration: "none" }}>
              <Typography variant="subtitle2" sx={{ color: "#043478" }}>
                จัดการสิทธิ์เริ่มต้น
              </Typography>
            </Link>
            <Typography
              variant="subtitle2"
              sx={{ color: "grey", textDecoration: "none" }}
            >{`จัดการสิทธิ์ ${role.role_description}`}</Typography>
          </Breadcrumbs>
        </Box> */}
        <Grid container>
          <Grid item xs={12} md={12}>
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <Grid item xs={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Details of rights of{" "}
                  {`${role.role_description}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#888888" }}
                >{`Settings(permission)`}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  color="info"
                  sx={{ boxShadow: 0 }}
                  variant="contained"
                  size="small"
                  onClick={() => getCreatePermission()}
                >
                  <AddIcon fontSize="small" />
                  <b>{`ADD PERMISSION ${role.role_name}`}</b>
                </Button>
              </Grid>
            </Stack>
            <Stack sx={{ mt: 2 }}>
              <MUIDataTable
                // title={`permission ของ ${role.role_display_name}`}
                data={permission}
                options={{
                  viewColumns: false,
                  filter: true,
                  print: false,
                  download: false,
                  selectableRows: 'none',
                  rowsPerPage: 10,
                  rowsPerPageOptions: [10, 25, 50, 100],
                  textLabels: {
                    body: {
                      noMatch: "Information not found.",
                    },
                  },
                }}
                columns={[
                  {
                    name: "permissions",
                    label: "Permission Name",
                    options: {
                      sort: true,
                      filter: true,
                      customBodyRender: (value) => {
                        return `${value?.permission_name}`;
                      },
                    },
                  },
                  {
                    name: "permissions",
                    label: "Permission (Display)",
                    options: {
                      sort: true,
                      filter: true,
                      customBodyRender: (value) => {
                        return `${value?.permission_display_name}`;
                      },
                    },
                  },
                  {
                    name: "permissions",
                    label: "Description",
                    options: {
                      sort: true,
                      filter: true,
                      customBodyRender: (value) => {
                        return `${value?.permission_description}`;
                      },
                    },
                  },
                  {
                    name: "",
                    label: "",
                    options: {
                      sort: false,
                      filter: false,
                      customBodyRenderLite: (index) => {
                        let element = permission[index];
                        return (
                          <Stack
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: { md: "row", sx: "column" }
                            }}
                          >
                            <Button
                              color="warning"
                              sx={{ boxShadow: 0, borderRadius: "3px", mr: { md: 1, xs: 0 } }}
                              variant="contained"
                              size="small"
                              onClick={() => getComponent(element.permission_id)}
                            >
                              <ManageAccountsIcon fontSize="small" sx={{ marginTop: "-2px" }} />
                              Config
                            </Button>
                            <Button
                              color="danger"
                              sx={{ boxShadow: 0, borderRadius: "3px", mt: { md: 0, xs: 1 } }}
                              variant="contained"
                              size="small"
                              onClick={() => deletePermissionHandler(element)}
                            >
                              <DeleteIcon fontSize="small" />
                              Delete
                            </Button>
                          </Stack>
                        );
                      },
                    },
                  },
                ]}
              />
            </Stack>
            <CreatePermissionDialog open={openCreatePermission} setOpen={setOpenCreatePermission} permission={createPermission} setPermission={setCreatePermission} id={id} callback={getPermissionByRoleId} />
            <ConfigRoleComponent open={openConfigComponent} setOpen={setOpenConfigComponent} id={id} component={component} setComponent={setComponent} />
            <DeletePermission open={openDeletePermission} setOpen={setOpenDeletePermission} callback={getPermissionByRoleId} role={role} permission={deleteData} />
          </Grid>
        </Grid>
      </Stack>

    </>
  );
}

export default RoleDetail;
