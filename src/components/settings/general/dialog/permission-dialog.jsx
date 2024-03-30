import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import  { hostname } from "../../../../hostname";
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogPermission(props) {
    const { open, setOpen, id, setId, name, display, setName, description, setDescription, setDisplay, getPermission } = props;


    const handleClose = () => {
        setId('')
        setName('')
        setDescription('')
        setDisplay('')
        setOpen({
            status: false,
            description: ''
        });
    };

    const submit = () => {
        if (id) {
            update()
        } else {
            create()
        }
    }

    const create = async () => {
        try {
            const response = await axios.post(`${hostname}/api/permission`, {
                permission_name: name,
                permission_display_name: display,
                permission_description: description,
            });

            if (response.status === 201) {
                getPermission()
                Swal.fire(
                    'Success',
                    `Permission created successfully`,
                    'success'
                )
                handleClose()
            }
        } catch (error) {
            console.error('An error occurred:', error);
            if (error.response) {
                Swal.fire(
                    'Failure',
                    error.response.data.detail,
                    'error'
                )
            } else {
                Swal.fire(
                    'Failure',
                    'An error occurred while creating the site.',
                    'error'
                )
            }
        }
    }

    const update = async () => {
        try {
            const response = await axios.patch(`${hostname}/api/permission/${id}`, {
                permission_name: name,
                permission_display_name: display,
                permission_description: description,
            });
            if (response.status === 200) {
                getPermission()
                Swal.fire(
                    'Success',
                    `Update Permission successfully`,
                    'success'
                )
                handleClose()
            }
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
                    'Update Permission Failed',
                    'error'
                )
            }
        }
    }


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
                                label="Permission Name"
                                name="permission_name"
                                variant="outlined"
                                fullWidth
                                size='small'
                                sx={{ marginTop: 1 }}
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Permission Display"
                                name="permission_display"
                                variant="outlined"
                                fullWidth
                                size='small'
                                value={display}
                                onChange={(event) => {
                                    setDisplay(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Permission Description"
                                name="permission_description"
                                variant="outlined"
                                fullWidth
                                size='small'
                                multiline
                                minRows={2}
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button onClick={submit} color='success'>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}