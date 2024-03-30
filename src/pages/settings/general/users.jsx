import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UsersTable from '../../../components/settings/general/table/users-table'
import DialogAddUser from '../../../components/settings/general/dialog/add-user-dialog'
import PermissionComponent from '../../../components/settings/general/dialog/component-dialog'
import axios from 'axios';
import  { hostname } from "../../../hostname";
import ComponentInit from "../../../utils/component-init";

export default function UsersPage() {
    const [open, setOpen] = React.useState({
        type: false,
        status: ''
    });
    const [openDialogcomponent, setOpenDialogcomponent] = React.useState(false);
    const [userlist, setUserlist] = React.useState([])
    const [id, setId] = React.useState('')
    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [role, setRole] = React.useState('');
    const [restriction_group, setRestriction_group] = React.useState('');

    const handleClickOpen = () => {
        setId('')
        setOpen({
            status: true,
            description: 'ADD USER'
        });
    };

    const getUser = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/users`);
            if (data.status === "success") {
                setUserlist(data.users);
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
        const selectedUser = userlist.find(i => i.id === id)
        if (selectedUser) {
            setId(selectedUser.user_id)
            setFirstname(selectedUser.firstname)
            setLastname(selectedUser.lastname)
            setPhone(selectedUser.phone)
            setEmail(selectedUser.email)
            setRole(selectedUser.role_id)
            setRestriction_group(selectedUser.restriction_group_id)
            setOpen({
                status: true,
                description: 'Update USER'
            });
        }
    }

    React.useEffect(() => {
        getUser()
    }, []);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">
                    <b>Users</b>
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
                            <b>ADD USER</b>
                        </Button>
                    }
                    component_key="create-user-button"
                />
            </Stack>
            <UsersTable
                userList={userlist}
                handleUpdate={handleUpdate}
                handleManageComponent={handleManageComponent}
            />
            <DialogAddUser
                open={open}
                setOpen={setOpen}
                id={id}
                firstname={firstname}
                setFirstname={setFirstname}
                lastname={lastname}
                setLastname={setLastname}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                role={role}
                setRole={setRole}
                restriction_group={restriction_group}
                setRestriction_group={setRestriction_group}
            />
        </>
    );
}
