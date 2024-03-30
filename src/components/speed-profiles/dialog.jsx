import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import axios from 'axios';
import  { hostname } from "../../hostname";
import Swal from 'sweetalert2';
import Slide from '@mui/material/Slide';

// Removed unnecessary imports for better code readability

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAddSpeed(props) {
    const { open, setOpen, oltId, getData } = props;

    const [profilename, setProfilename] = React.useState('');
    const [suffixprefix, setSuffixprefix] = React.useState('');
    const [speed, setSpeed] = React.useState('');
    const [defaultspeed, setDefaultspeed] = React.useState(false); // changed the default state for defaultspeed to a boolean

    const handleClose = () => {
        setOpen({
            status: false,
            description: '',
        });
    };

    const submit = () => {
        const isValid = validateForm(); // Added a validateForm function

        if (isValid) {
            create();
        }
    };

    const clear = () => {
        // Add functionality to clear the form
        setProfilename('');
        setSuffixprefix('');
        setSpeed('');
        setDefaultspeed(false);
    };

    const create = async () => {
        try {
            const response = await axios.post(
                `${hostname}/api/speed_profile`,
                {
                    profile_name: profilename,
                    suffix_prefix: suffixprefix,
                    speed: speed,
                    default: defaultspeed,
                    oltId: oltId,
                    type: open.type === 'download' ? 'DOWNLOAD' : 'UPLOAD'
                }
            );

            if (response.status === 201) {
                // clear();
                Swal.fire('Success', 'Add Successfully', 'success');
                getData();
                handleClose();
            }
        } catch (error) {
            if (error.response) {
                Swal.fire('Failure', error.response.data.detail, 'error');
            } else {
                Swal.fire('Failure', 'An error occurred while creating the user', 'error');
            }
        }
    };

    const validateForm = () => {
        // Add form validation logic here
        if (profilename && speed) {
            return true;
        } else {
            Swal.fire('Validation Error', 'Please fill all the required fields', 'error');
            return false;
        }
    };

    return (
        <>
            <Dialog
                open={open.status}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={'xs'}
                scroll={'body'}
                fullWidth
            >
                <DialogTitle>{open.type === 'download' ? 'DOWNLOAD SPEED' : 'UPLOAD SPEED'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Profile name"
                                placeholder="Example: 100M"
                                name="profilename"
                                variant="outlined"
                                fullWidth
                                size="small"
                                sx={{ marginTop: 1 }}
                                value={profilename}
                                onChange={(event) => {
                                    setProfilename(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Use suffix and prefix</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="suffixprefix"
                                    name="suffixprefix"
                                    value={suffixprefix}
                                    onChange={(event) => {
                                        setSuffixprefix(event.target.value);
                                    }}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Speed (in kbps)"
                                placeholder="Example: 102400"
                                name="speed"
                                variant="outlined"
                                fullWidth
                                size="small"
                                sx={{ marginTop: 1 }}
                                value={speed}
                                onChange={(event) => {
                                    setSpeed(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel
                                    required
                                    control={<Checkbox checked={defaultspeed} onChange={(event) => setDefaultspeed(event.target.checked)} />}
                                    label={`Default ${open.type === 'download' ? 'download speed' : 'upload speed'} for new ONUs`}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={submit} color="success">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

