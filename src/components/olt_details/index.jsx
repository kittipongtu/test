import { useState, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { TableContainer, Table, TableBody, TableCell, TableRow, Paper, Box, TableHead, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { hostname } from "../../hostname";
import { hardwareversionData } from "../data/hardware_version";
import { softwareversionData } from "../data/software_version";
import DialogFormOlt from "../../components/settings/dialog-fom-olt";

const useStyles = makeStyles({
    oddRow: {
        backgroundColor: '#f9f9f9',
    },
    evenRow: {
        backgroundColor: 'white',
    },
});

const OltDetail = ({ olt_id }) => {
    const [oltdetail, setOltdetail] = useState({});
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState({
        status: false,
        type: ""
    });

    const getOltDetail = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/olt/${olt_id}`);
            if (data.status === "success") {
                setOltdetail(data.results);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const keyoltDetail = {
        "Name": "name_olt",
        "OLT IP": "olt_ip_fqdn",
        "Reachable via VPN tunnel": "",
        "Telnet TCP port": "tcp_port",
        "OLT telnet username": "username",
        "OLT telnet password": "password",
        "SNMP read-only community": "snmp_read",
        "SNMP read-write community": "snmp_write",
        "SNMP UDP port": "udp_port",
        "IPTV module": "iptv_module",
        "OLT hardware version": "hardware_version_id",
        "OLT software version": "software_version_id",
        "Supported PON types": "pon_type",
    };

    const handleEditOlt = () => {
        setOpenDialog({
            status: true,
            type: "update"
        });
    }

    useEffect(() => {
        getOltDetail();
    }, [olt_id]);

    const renderOltDetail = useMemo(() => {
        return Object.keys(keyoltDetail).map((key, index) => (
            <TableRow key={index} className={index % 2 === 0 ? classes.evenRow : classes.oddRow}>
                <TableCell component="th" scope="row">
                    {key}
                </TableCell>
                {key === "OLT hardware version" ? (
                    <TableCell>
                        {oltdetail[keyoltDetail[key]] && hardwareversionData.find(data => data.value === oltdetail[keyoltDetail[key]])?.label}
                    </TableCell>
                ) : key === "OLT software version" ? (
                    <TableCell>
                        {oltdetail[keyoltDetail[key]] && softwareversionData.find(data => data.value === oltdetail[keyoltDetail[key]])?.label}
                    </TableCell>
                ) : key === "IPTV module" ? (
                        <TableCell>
                            {oltdetail[keyoltDetail[key]] ? 'enable' : 'disabled'}
                    </TableCell>
                ) : (
                    <TableCell>{oltdetail[keyoltDetail[key]]}</TableCell>
                )}
            </TableRow>
        ));
    }, [oltdetail]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Button variant="contained" onClick={handleEditOlt}>Edit OLT settings</Button>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>OLT setting</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderOltDetail}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4} style={{ minWidth: '350px', maxWidth: '350px' }} sx={{ marginLeft: 2 }}>
                    <img src="../images/Huawei-MA5608T.png" style={{ maxWidth: '100%', height: 'auto' }} alt="OLT" />
                </Grid>
            </Grid>
            {openDialog.status &&
                <DialogFormOlt
                    open={openDialog}
                    setOpen={setOpenDialog}
                    OldOltData={oltdetail}
                    callback={getOltDetail}
                />
            }
        </Box>
    );
};

export default OltDetail;
