import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { hostname } from "../../../../hostname";
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogSite(props) {
    const { open, setOpen, id, setId, name, setName, description, setDescription, getSite } = props;


    const handleClose = () => {
        setName('')
        setDescription('')
        setOpen({
            type: false,
            status: ''
        })
    };

    const submit = () => {
        if (name === "" || name.includes(' ')) {
            Swal.fire(
                'Failure',
                'Please enter site name',
                'error'
            )
            return
        }
        if (id) {
            update()
        } else {
            create()
        }
    }

    const create = async () => {
        try {
            const response = await axios.post(`${hostname}/api/site`, {
                site_name: name,
                site_description: description,
            });

            if (response.status === 201) {
                getSite()
                Swal.fire(
                    'Success',
                    `Site created successfully`,
                    'success'
                )
                handleClose()
            }
        } catch (error) {
            console.error('An error occurred:', error);
            if (error.response) {
                if (error.response.status === 400) {
                    Swal.fire(
                        'Failure',
                        error.response.data.detail,
                        'error'
                    )
                } else {
                    Swal.fire(
                        'Failure',
                        error.response.data.detail || 'An error occurred while creating the site.',
                        'error'
                    )
                }
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
            const response = await axios.patch(`${hostname}/api/site/${id}`, {
                site_name: name,
                site_description: description,
            });
            if (response.status === 200) {
                getSite()
                Swal.fire(
                    'Success',
                    `Update Site successfully`,
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
                    'Update Site Failed',
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
                                label="Site Name"
                                name="site_name"
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
                                label="Site Description"
                                name="site_description"
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
                    <Button
                        onClick={submit}
                        color='success'
                        disabled={
                            name === ""
                        }
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}