import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import FilledInput from '@mui/material/FilledInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import  { hostname } from "../../../../hostname";
import Swal from 'sweetalert2'
import FormHelperText from '@mui/material/FormHelperText';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddUser(props) {
    const { open, setOpen, id, firstname, setFirstname, lastname, setLastname, phone, setPhone, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, role, setRole, restriction_group, setRestriction_group, getUser } = props;

    const [showPassword, setShowPassword] = React.useState(false);
    const [restrictiongroupList, setRestrictiongroupList] = React.useState([])
    const [rolelist, setRolelist] = React.useState([])
    const [errors, setErrors] = React.useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        restriction_group: '',
    });

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleChangeRestriction = (event) => {
        setRestriction_group(event.target.value);
    };

    const handleClose = () => {
        setOpen({
            status: false,
            description: ''
        });
    };

    const submit = () => {
        if (id) {
            update();
        } else {
            const isValid = validateForm();
            if (isValid) {
                create();
            }
        }
    };

    const clear = () => {

    }

    const create = async () => {
        try {
            await axios.post(
                `${hostname}/api/auth/register`,
                {
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    role: role,
                    restriction_group: restriction_group
                }
            ).then(response => {
                console.log(response)
                if (response.status === 201) {
                    clear();
                    Swal.fire(
                        'Success',
                        'Add Successfully',
                        'success'
                    )
                    getUser();
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
                    'An error occurred while creating the user',
                    'error'
                )
            }
        }
    }

    const update = async () => {
        try {
            const response = await axios.patch(`${hostname}/api/users/${id}`, {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                role: role,
                restriction_group: restriction_group
            });

            // Handle the response
            console.log(response.data);
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getRole = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/role`);
            if (data.status === "success") {
                setRolelist(data.role);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getRestriction_group = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/restriction_group`);
            if (data.status === "success") {
                setRestrictiongroupList(data.restriction_groups);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            restriction_group: '',
        };

        // Validate firstname
        if (firstname.trim() === '') {
            newErrors.firstname = 'First Name is required';
            valid = false;
        }

        // Validate lastname
        if (lastname.trim() === '') {
            newErrors.lastname = 'Last Name is required';
            valid = false;
        }

        // Validate phone (customize this validation as needed)
        if (!/^[0-9]{10}$/.test(phone)) {
            newErrors.phone = 'Invalid phone number';
            valid = false;
        }

        // Validate email (customize this validation as needed)
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        // Validate password (customize this validation as needed)
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        // Validate confirmPassword
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        // Validate role
        if (role === '') {
            newErrors.role = 'Role is required';
            valid = false;
        }

        // Validate restriction_group
        if (restriction_group === '') {
            newErrors.restriction_group = 'Restriction group is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    React.useEffect(() => {
        getRole()
        getRestriction_group()
    }, []);


    return (
        <>
            <Dialog
                open={open.status}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={"xs"}
                scroll={"body"}
                fullWidth
            >
                <DialogTitle>{open.description}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="First Name"
                                name="firstname"
                                variant="outlined"
                                fullWidth
                                size='small'
                                sx={{ marginTop: 1 }}
                                value={firstname}
                                onChange={(event) => {
                                    setFirstname(event.target.value);
                                }}
                            />
                            <FormHelperText error>{errors.firstname}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Last Name"
                                name="lastname"
                                variant="outlined"
                                fullWidth
                                size='small'
                                value={lastname}
                                onChange={(event) => {
                                    setLastname(event.target.value);
                                }}
                            />
                            <FormHelperText error>{errors.lastname}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone"
                                name="phone"
                                variant="outlined"
                                fullWidth
                                size='small'
                                value={phone}
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                }}
                            />
                            <FormHelperText error>{errors.phone}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                size='small'
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                            <FormHelperText error>{errors.email}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                size='small'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormHelperText error>{errors.password}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                size='small'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormHelperText error>{errors.confirmPassword}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ margin: 0 }}>Role</InputLabel>
                                <Select
                                    size='small'
                                    value={role}
                                    onChange={handleChangeRole}
                                >
                                    {rolelist.length !== 0 &&
                                        rolelist.map((item) => {
                                            return (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >{`${item.role_name}`}</MenuItem>
                                            );
                                        })}
                                </Select>
                                <FormHelperText error>{errors.role}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Restriction group</InputLabel>
                                <Select
                                    size='small'
                                    value={restriction_group}
                                    onChange={handleChangeRestriction}
                                >
                                    {restrictiongroupList.length !== 0 &&
                                        restrictiongroupList.map((item) => {
                                            return (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >{`${item.restriction_group_name}`}</MenuItem>
                                            );
                                        })}
                                </Select>
                                <FormHelperText error>{errors.restriction_group}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button
                        onClick={submit}
                        color='success'
                    // disabled={
                    //     password !== confirmPassword ||
                    //     firstname === '' ||
                    //     lastname === '' ||
                    //     phone === '' ||
                    //     email === '' ||
                    //     role === '' ||
                    //     restriction_group === ''
                    // }
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}