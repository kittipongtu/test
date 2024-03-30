import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import  { hostname } from "../../hostname";
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogZone(props) {
    const { open, setOpen, id, name, setName, description, setDescription, getZone } = props;


    const handleClose = () => {
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

    const clear = () => {
        setName('')
        setDescription('')
        setOpen(false);
    }

    const create = async () => {
        try {
            await axios.post(
                `${host}/api/zone`,
                {
                    zone_name: name,
                    zone_description: description,
                }
            ).then(response => {
                if (response.status === 201) {
                    clear()
                    getZone();
                    Swal.fire(
                        'Success',
                        'Add Zone Successfully',
                        'success'
                    )
                }
            });
        } catch (err) {
            Swal.fire(
                'Failure',
                'Add Zone Failed',
                'error'
            )
        }
    }

    const update = async () => {
        try {
            const response = await axios.post(`${host}/api/endpoint`, {
                // Request data here
            });

            // Handle the response
            console.log(response.data);
        } catch (error) {
            // Handle errors
            console.error(error);
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
                                label="Zone Name"
                                name="zone_name"
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
                                label="Zone Description"
                                name="zone_description"
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