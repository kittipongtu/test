import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import RoleTable from '../../../../components/settings/general/table/role-table'
import DialogRole from '../../../../components/settings/general/dialog/role-dialog'
import axios from 'axios';
import  { hostname } from "../../../../hostname";
import ComponentInit from "../../../../utils/component-init";

export default function RolePage() {
    const [open, setOpen] = React.useState({
        type: false,
        status: ''
    });
    const [rolelist, setRolelist] = React.useState([])
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalRows, setTotalRows] = React.useState(0);

    const handleClickOpen = () => {
        setOpen({
            status: true,
            description: 'ADD ROLE'
        });
    };

    const getRole = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/role?skip=${page * rowsPerPage}&limit=${rowsPerPage}`);
            if (data.status === "success") {
                setRolelist(data.data);
                setTotalRows(data.pagination.total_records);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id) => {
        const selectedRole = rolelist.find(i => i.id === id)
        if (selectedRole) {
            setId(selectedRole.id)
            setName(selectedRole.role_name)
            setDescription(selectedRole.role_description)
            setOpen({
                status: true,
                description: 'Update Role'
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
        getRole()
    }, [page, rowsPerPage]);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">
                    <b>Role</b>
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
                            <b>ADD ROLE</b>
                        </Button>
                    }
                    component_key="create-role-button"
                />

            </Stack>
            <RoleTable
                rolelist={rolelist}
                handleUpdate={handleUpdate}
                page={page}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <DialogRole
                open={open}
                setOpen={setOpen}
                id={id}
                setId={setId}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                getRole={getRole}
            />
        </>
    );
}
