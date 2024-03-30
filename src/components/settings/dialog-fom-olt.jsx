import * as React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, RadioGroup, FormLabel, Radio } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2'
import axios from "axios";
import { hostname } from "../../hostname";
import "../../style/sweetalert-dialog.css"
import { hardwareversionData } from "../data/hardware_version";
import { softwareversionData } from "../data/software_version";

export default function DialogFormOlt(props) {
    const { open, setOpen, OldOltData, callback } = props;
    const isFullWidth = true;
    const [dataOlt, setDataOlt] = React.useState({});
    const handleClose = () => {
        setOpen({
            status: false,
            type: ""
        });
    };

    const handleSave = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to ${open.type === "create" ? "Add Olt" : "Update OLT"} !`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6fbf73',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Save'
        }).then((result) => {
            if (result.isConfirmed) {
                if (open.type === "create") {
                    handleAdd()
                } else {
                    handleUpdate()
                }
            }
        })

    }

    const handleAdd = async () => {
        try {
            const { data } = await axios.post(`${hostname}/api/olt`, dataOlt);
            if (data.status === "success") {
                setOpen({
                    status: false,
                    type: ""
                })
                Swal.fire(
                    'Success',
                    `${data.message}`,
                    'success'
                )
            }
        } catch (err) {
            console.log(err);
            Swal.fire(
                'Failure',
                `${err.message}`,
                'error'
            )
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`${hostname}/api/olt/${OldOltData.id}`, dataOlt);
            if (response.status === 200) {
                setOpen({
                    status: false,
                    type: ""
                })
                callback();
                Swal.fire(
                    'Success',
                    `Update Olt successfully`,
                    'success'
                )  
            }
        } catch (err) {
            console.log(err);
        }
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const generateRandomText = (length) => {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;

    };

    const handleChangeData = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        let newData = { ...dataOlt };

        if (key) {
            newData[key] = value;
            setDataOlt(newData);
        } else {
            return;
        }
    };

    React.useEffect(() => {
        let newData = { ...dataOlt }
        if (open.type === "create") {
            newData.
                newData.snmp_write = generateRandomText(10)
            newData.snmp_read = generateRandomText(10)
            newData.hardware_version_id = 21
            newData.software_version_id = 1
            newData.pon_type = "GPON"
            setDataOlt(newData)
        }
    }, []);

    React.useEffect(() => {
        let newData = { ...dataOlt }
        if (open.type === "update") {
            newData.name_olt = OldOltData.name_olt
            newData.olt_ip_fqdn = OldOltData.olt_ip_fqdn
            newData.tcp_port = OldOltData.tcp_port
            newData.udp_port = OldOltData.udp_port
            newData.username = OldOltData.username
            newData.hardware_version_id = OldOltData.hardware_version_id
            newData.software_version_id = OldOltData.software_version_id
            newData.snmp_read = OldOltData.snmp_read
            newData.snmp_write = OldOltData.snmp_write
            newData.pon_type = OldOltData.pon_type
            newData.iptv_module = OldOltData.iptv_module === "yes" ? true : false
            setDataOlt(newData)
        }
    }, [OldOltData]);

    return (
        <div>
            <Dialog
                open={open.status}
                fullWidth={isFullWidth}
            >
                <DialogTitle>
                    {open.type === "create" ? "Add" : "Update"} OLT
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name_olt"
                        name="name_olt"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChangeData}
                        defaultValue={dataOlt.name_olt}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="olt_ip_fqdn"
                        name="olt_ip_fqdn"
                        label="OLT IP or FQDN"
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChangeData}
                        defaultValue={dataOlt.olt_ip_fqdn}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tcp_port"
                        name="tcp_port"
                        label="Telnet TCP port"
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChangeData}
                        defaultValue={dataOlt.tcp_port}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        name="username"
                        label="OLT telnet username"
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChangeData}
                        defaultValue={dataOlt.username}
                    />
                    <TextField
                        sx={{ marginTop: '1vh' }}
                        autoFocus
                        id="password"
                        name="password"
                        label="OLT telnet password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChangeData}
                    />
                    <TextField
                        sx={{ marginTop: '17px' }}
                        autoFocus
                        margin="dense"
                        id="snmp_read"
                        name="snmp_read"
                        label="SNMP read-only community"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={dataOlt.snmp_write}
                        helperText="Will be automatically created on the OLT"
                        onChange={handleChangeData}
                        defaultValue={dataOlt.olt_ip_fqdn}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="snmp_write"
                        name="snmp_write"
                        label="SNMP read-write community"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={dataOlt.snmp_read}
                        helperText="Will be automatically created on the OLT"
                        onChange={handleChangeData}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="udp_port"
                        name="udp_port"
                        label="SNMP UDP port"
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChangeData}
                        defaultValue={dataOlt.udp_port}
                    />
                    IPTV module <FormControlLabel control={<Checkbox name="iptv_module" checked={dataOlt.iptv_module} onChange={handleChangeData} />} label="Enable" sx={{ marginLeft: "1vh" }} />
                    <FormControl fullWidth size="small" sx={{ marginTop: "1vh" }}>
                        <InputLabel id="select-hardware-version-label">OLT hardware version</InputLabel>
                        <Select
                            labelId="select-hardware-version-label"
                            id="select-hardware-version"
                            name="hardware_version_id"
                            label="OLT hardware version"
                            value={dataOlt.hardware_version_id}
                            onChange={handleChangeData}
                        >
                            {hardwareversionData.map(version => (
                                <MenuItem key={version.value} value={version.value}>
                                    {version.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small" sx={{ marginTop: "2vh" }}>
                        <InputLabel id="select-software-version-label">OLT software version</InputLabel>
                        <Select
                            labelId="select-software-version-label"
                            id="select-software-version"
                            name="software_version_id"
                            label="OLT software version"
                            value={dataOlt.software_version_id}
                            onChange={handleChangeData}
                        >
                            {softwareversionData.map(version => (
                                <MenuItem key={version.value} value={version.value}>
                                    {version.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginTop: '2vh' }}>
                        <FormLabel id="pon_type-radio-buttons-group-label">Supported PON types</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="pon_type-radio-buttons-group-label"
                            name="pon_type"
                            value={dataOlt.pon_type}
                        >
                            <FormControlLabel value="GPON" control={<Radio />} label="GPON" />
                            <FormControlLabel value="EPON" control={<Radio />} label="EPON" />
                            <FormControlLabel value="GPONEPON" control={<Radio />} label="GPON+EPON" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        color='success'
                        onClick={handleSave}
                        variant="contained"
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
