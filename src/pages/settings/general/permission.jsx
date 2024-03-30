import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PermissionTable from '../../../components/settings/general/table/permission-table'
import DialogPermission from '../../../components/settings/general/dialog/permission-dialog'
import PermissionComponent from '../../../components/settings/general/dialog/component-dialog'
import axios from 'axios';
import  { hostname } from "../../../hostname";
import ComponentInit from "../../../utils/component-init";

export default function PermissionPage() {
    const [open, setOpen] = React.useState({
        type: false,
        status: ''
    });
    const [openDialogcomponent, setOpenDialogcomponent] = React.useState(false);
    const [permissionlist, setPermissionlist] = React.useState([])
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [display, setDisplay] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [component, setComponent] = React.useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalRows, setTotalRows] = React.useState(0);

    const handleClickOpen = () => {
        setId('')
        setOpen({
            status: true,
            description: 'ADD PERMISSIONS'
        });
    };

    const getPermission = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/permission`);
            if (data.status === "success") {
                setPermissionlist(data.data);
                setTotalRows(data.pagination.total_records);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleManageComponent = async (id) => {
        setId(id);
        setOpenDialogcomponent(true);
    }

    const handleUpdate = async (id) => {
        const selectedPermission = permissionlist.find(i => i.id === id)
        if (selectedPermission) {
            setId(selectedPermission.id)
            setName(selectedPermission.permission_name)
            setDisplay(selectedPermission.permission_display_name)
            setDescription(selectedPermission.permission_description)
            setOpen({
                status: true,
                description: 'Update Permissions'
            });
        }
    }

    const handleChangePage = (newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (rowsPerPage) => {
        setRowsPerPage(rowsPerPage);
        setPage(0); // Reset page when rowsPerPage changes
      };

    React.useEffect(() => {
        getPermission()
    }, [page, rowsPerPage]);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">
                    <b>Permission</b>
                </Typography>
                <ComponentInit
                    children={
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ boxShadow: 0, borderRadius: "3px" }}
                            color="success"
                            onClick={handleClickOpen}
                        >
                            <AddIcon />
                            <b>ADD PERMISSION</b>
                        </Button>
                    }
                    component_key="create-permission-button"
                />

            </Stack>
            <PermissionTable
                permissionlist={permissionlist}
                handleUpdate={handleUpdate}
                handleManageComponent={handleManageComponent}
                page={page}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <DialogPermission
                open={open}
                setOpen={setOpen}
                id={id}
                setId={setId}
                name={name}
                display={display}
                setName={setName}
                description={description}
                setDescription={setDescription}
                setDisplay={setDisplay}
                getPermission={getPermission}
            />
            {openDialogcomponent &&
                <PermissionComponent
                    permissionId={id}
                    open={openDialogcomponent}
                    setOpen={setOpenDialogcomponent}
                    component={component}
                    setComponent={setComponent}
                />
            }
        </>
    );
}
