import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'

import axios from 'axios';
import  { hostname } from "../../../../hostname";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogRestrictionGroup(props) {
    const { open, setOpen, id, setId, name, setName, description, setDescription, selectedZones, setSelectedZones, selectedOlts, setSelectedOlts, getRestriction_group } = props;
    const [zonelist, setZonelist] = React.useState([])
    const [oltlist, setOltlist] = React.useState([])



    const handleChangeZone = (event, values) => {
        setSelectedZones(values);
    };

    const handleChangeOlt = (event, values) => {
        setSelectedOlts(values);
    };

    const handleClose = () => {
        setId('')
        setName('')
        setSelectedZones([])
        setSelectedOlts([])
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
        setOpen({
            status: false,
            description: ''
        });
    }

    const create = async () => {
        try {
            const zoneid = selectedZones.map(zone => zone.id);
            const oltid = selectedOlts.map(olt => olt.id);
            await axios.post(
                `/api/restriction_group`,
                {
                    restriction_group_name: name,
                    restriction_group_description: description,
                    zone: zoneid,
                    olt: oltid
                }
            ).then(response => {
                if (response.status === 201) {
                    clear();
                    Swal.fire(
                        'Success',
                        'Add Successfully',
                        'success'
                    )
                    getRestriction_group();
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
                    'An error occurred while creating the Restriction Group.',
                    'error'
                )
            }
        }
    }

    const update = async () => {
        try {
            const zoneid = selectedZones.map(zone => zone.id);
            const oltid = selectedOlts.map(olt => olt.id);
            const response = await axios.patch(`${hostname}/api/restriction_group/${id}`, {
                restriction_group_name: name,
                restriction_group_description: description,
                zone: zoneid,
                olt: oltid
            });
            if (response.status === 200) {
                clear();
                Swal.fire(
                    'Success',
                    `Update successfully`,
                    'success'
                )
                getRestriction_group();
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
                    'Update Failed',
                    'error'
                )
            }
        }
    }

    const getZone = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/zone`);
            if (data.status === "success") {
                setZonelist(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getOlt = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/olt`);
            if (data.status === "success") {
                setOltlist(data.results);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getZone()
        getOlt()
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
                                label="Restriction group name"
                                name="role_name"
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
                            <Autocomplete
                                multiple
                                size='small'
                                id="multiple-values"
                                options={[...zonelist,]}
                                value={selectedZones}
                                onChange={handleChangeZone}
                                disableCloseOnSelect
                                getOptionLabel={(option) => `${option.zone_name}`}
                                // isOptionEqualToValue={(option, value) => option === value}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Allowed zones" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                size='small'
                                id="multiple-values"
                                options={[...oltlist,]}
                                value={selectedOlts}
                                onChange={handleChangeOlt}
                                disableCloseOnSelect
                                getOptionLabel={(option) => `${option.name_olt}`}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Allowed Olts" />
                                )}
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