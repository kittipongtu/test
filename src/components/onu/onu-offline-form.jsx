import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AutocompleteOlt from "../autocomplete/olt";
import Grid from '@mui/material/Grid';

export default function OnuformDailog(props) {
    const { openDialog, setOpenDialog } = props;

    const [olt, setOlt] = useState('');

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email;
        console.log(email);
        handleClose();
    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AutocompleteOlt setValue={setOlt} value={olt} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">PON type</FormLabel>
                                <RadioGroup row name="row-radio-buttons-group">
                                    <FormControlLabel value="GPON" control={<Radio />} label="GPON" />
                                    <FormControlLabel value="EPON" control={<Radio />} label="EPON" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="Name"
                                name="Name"
                                label="Name"
                                fullWidth
                                size='small'
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                margin="dense"
                                id="Addressorcomment"
                                name="Addressorcomment"
                                label="Address or comment"
                                fullWidth
                                size='small'
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                margin="dense"
                                id="ONUExternalID"
                                name="ONUExternalID"
                                label="ONU external ID"
                                fullWidth
                                size='small'
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
