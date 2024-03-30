import { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid } from '@mui/material';
import { useAlert } from "../global/context-alert-dialog";
import { hostname } from "../../hostname";
import axios from "axios";

export default function DialogConfigPon(props) {
    const { openDialog, setOpenDialog, selectableRows, getPonPort } = props;

    const [adminState, setAdminState] = useState('');
    const [description, setDescription] = useState('');
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(0);
    const { setOpenAlert } = useAlert();

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.patch(
                `${hostname}/api/port/${selectableRows?.port_id}`,
                {
                    description,
                    "min_range": minRange,
                    "max_range":maxRange,
                    "admin_state": adminState
                }
            );
            if (data.status === "success") {
                setOpenAlert({
                    status: true,
                    type: "success",
                    message: "PON updated successfully.",
                });
                setOpenDialog(false);
                getPonPort();
            }
        } catch (err) {
            setOpenAlert({
                status: true,
                type: "error",
                message: "Failed to update PON.",
            });
        }
    };

    useEffect(() => {
        if (selectableRows) {
            setDescription(selectableRows.description || '');
            setMinRange(selectableRows.min_range || 0);
            setMaxRange(selectableRows.max_range || 0);
            setAdminState(selectableRows.admin_state || '');
        }
    }, [selectableRows]);

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={openDialog}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}
        >
            <DialogTitle>Configure PON port {selectableRows.port}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Admin state</FormLabel>
                            <RadioGroup aria-label="admin-state" name="admin_state" value={adminState} onChange={(e) => setAdminState(e.target.value)}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <FormControlLabel value="Enabled" control={<Radio />} label="Enabled" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel value="Disabled" control={<Radio />} label="Disabled" />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="description" label="Description" variant="outlined" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="minRange" label="Min Range" variant="outlined" name="minRange" helperText="Kilometer" value={minRange} onChange={(e) => setMinRange(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="maxRange" label="Max Range" variant="outlined" name="maxRange" helperText="Kilometer" value={maxRange} onChange={(e) => setMaxRange(e.target.value)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}
