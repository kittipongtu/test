import { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid } from '@mui/material';
import { useAlert } from "../global/context-alert-dialog";
import { hostname } from "../../hostname";
import axios from "axios";

export default function DialogVlans(props) {
    const { openDialog, setOpenDialog, selectableRows, getPonPort } = props;

    const [vlanid, setVlanid] = useState('');
    const [description, setDescription] = useState('');
    const { setOpenAlert } = useAlert();

    const handleClose = () => {
        setOpenDialog({
            status: false,
            title: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.patch(
                `${hostname}/api/port/${selectableRows?.port_id}`,
                {
                    // description,
                    // "min_range": minRange,
                    // "max_range":maxRange,
                    // "admin_state": adminState
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

    // useEffect(() => {
    //     if (selectableRows) {
    //         setDescription(selectableRows.description || '');
    //         setMinRange(selectableRows.min_range || 0);
    //         setMaxRange(selectableRows.max_range || 0);
    //         setAdminState(selectableRows.admin_state || '');
    //     }
    // }, [selectableRows]);

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={openDialog.status}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}
        >
            <DialogTitle>{openDialog.title}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth id="description" size="small" label="VLAN-ID" variant="outlined" name="description" value={vlanid} onChange={(e) => setVlanid(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth id="minRange" size="small" label="Description" variant="outlined" name="minRange" value={description} onChange={(e) => setDescription(e.target.value)} />
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
