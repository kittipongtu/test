import { useState, useEffect } from 'react';
import { Button, Container, Stack, Typography, Box, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import DialogConfigPon from "../components/olt_details/dialog-config-pon";
import axios from "axios";
import { hostname } from "../hostname";
import Swal from 'sweetalert2'
import CachedIcon from '@mui/icons-material/Cached';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VlansTable from '../components/vlans/table'
import DialogVlans from '../components/vlans/dialog-vlans'

export default function Vlans(props) {
    const [openDialog, setOpenDialog] = useState({
        status: false,
        title: ''
    });
    
    const handleAddVlans = () => {
        setOpenDialog({
            status: true,
            title: 'ADD VLANS'
        });
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <Container sx={{ mt: 3 }} style={{ padding: 0 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ boxShadow: 0, borderRadius: "3px" }}
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddVlans}
                        >
                            <b>Add VLAN</b>
                        </Button>
                    </Stack>
                </Stack>
               <VlansTable />
               <DialogVlans openDialog={openDialog} setOpenDialog={setOpenDialog} />
            </Container>
        </>
    );
}
