import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import  { hostname } from "../../../../hostname";

function PermissionComponent({
    open,
    setOpen,
    component,
    setComponent,
    permission,
    permissionId
}) {
    const [createData, setCreateData] = React.useState({
        permission_component_name: '',
        permission_component_display_name: '',
        permission_component_description: ''
    });
    const [deleteData, setDeleteData] = React.useState({});

    const handleClsoeDialog = async () => {
        setCreateData({
            permission_component_name: '',
            permission_component_display_name: '',
            permission_component_description: ''
        })
        setOpen(false);
    }
    const refreshTable = async () => {
        try {
            const { data } = await axios.get(
                `${hostname}/api/permission_component/${permissionId}`
            );
            if (data.status === "success") {
                setComponent(data.component);
            }
        } catch (err) {
            alert(err);
        }
    };

    const createHandler = async () => {
        try {
            await axios.post(
                `${hostname}/api/permission_component/${permissionId}`,
                createData
            ).then(response => {
                if (response.status === 201) {
                    refreshTable();
                    setCreateData({
                        permission_component_name: '',
                        permission_component_display_name: '',
                        permission_component_description: ''
                    });
                    Swal.fire(
                        'Success',
                        'Add Component Successfully',
                        'success'
                    )
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
                    'Add Component Failed',
                    'error'
                )
            }
        }
    };

    const confirmDeleteComponent = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteHanlder(item)
            }
        })
    }

    const deleteHanlder = async (item) => {
        try {
            await axios.delete(`${hostname}/api/permission_component/delete_component/${item.id}`).then(response => {
                if (response.status === 204) {
                    refreshTable();
                    Swal.fire(
                        'Success',
                        'Delete Component Successfully',
                        'success'
                    )
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
                    'Delete Component Failed',
                    'error'
                )
            }
        }
    }

    React.useEffect(() => {
        refreshTable()
    }, []);

    return (
        <Dialog open={open} onClose={handleClsoeDialog} maxWidth="lg">
            <DialogTitle
                sx={{ fontWeight: "bold" }}
            >{`Manage Permission Component`}</DialogTitle>
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
                        <Box
                            sx={{
                                borderRadius: "3px",
                                mt: 10,
                                m: 1,
                                p: 2,
                                border: "1px solid #DCDCDC",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h6">ADD Component</Typography>
                            <TextField
                                sx={{ mt: 1 }}
                                size="small"
                                required
                                label="Name"
                                variant="outlined"
                                value={createData.permission_component_name}
                                onChange={(e) =>
                                    setCreateData({
                                        ...createData,
                                        ["permission_component_name"]: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                sx={{ mt: 1 }}
                                size="small"
                                required
                                label="Display"
                                variant="outlined"
                                value={createData.permission_component_display_name}
                                onChange={(e) =>
                                    setCreateData({
                                        ...createData,
                                        ["permission_component_display_name"]: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                sx={{ mt: 1 }}
                                size="small"
                                required
                                label="Description"
                                variant="outlined"
                                value={createData.permission_component_description}
                                onChange={(e) =>
                                    setCreateData({
                                        ...createData,
                                        ["permission_component_description"]: e.target.value,
                                    })
                                }
                            />
                            <Button
                                sx={{ boxShadow: 0, borderRadius: "3px", mt: 1 }}
                                variant="contained"
                                color="success"
                                disabled={
                                    createData?.permission_component_name === undefined ||
                                    createData?.permission_component_display_name ===
                                    undefined ||
                                    createData?.permission_component_description ===
                                    undefined ||
                                    createData?.permission_component_name === "" ||
                                    createData?.permission_component_display_name === "" ||
                                    createData?.permission_component_description === ""
                                }
                                onClick={createHandler}
                            >
                                Create Function
                            </Button>
                        </Box>
                        <MUIDataTable
                            title={`Component`}
                            data={component}
                            options={{
                                viewColumns: false,
                                alignItems: "center",
                                filter: true,
                                print: false,
                                download: false,
                                selectableRows: 'none',
                                rowsPerPage: 10,
                                //   rowsPerPageOptions: [10, 25, 50, 100, { value: component.length, label: 'All' }],
                                textLabels: {
                                    body: {
                                        noMatch: "Information not found.",
                                    },
                                },
                            }}
                            columns={[
                                {
                                    name: "permission_component_name",
                                    label: "Component Name",
                                },
                                {
                                    name: "permission_component_display_name",
                                    label: "Component Display",
                                },
                                {
                                    name: "permission_component_description",
                                    label: "Description",
                                },
                                {
                                    name: "",
                                    label: "",
                                    options: {
                                        customBodyRenderLite: (index) => {
                                            let element = component[index];
                                            return (
                                                <Stack
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        flexDirection: { md: "row", xs: "column" },
                                                    }}
                                                >
                                                    <Button
                                                        color="danger"
                                                        sx={{ boxShadow: 0, borderRadius: "3px" }}
                                                        variant="contained"
                                                        size="small"
                                                        onClick={() => {
                                                            confirmDeleteComponent(element)
                                                        }}
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
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default PermissionComponent;
