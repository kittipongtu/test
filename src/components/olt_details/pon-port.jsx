import { useState, useEffect } from 'react';
import { Button, Container, Stack, Typography, Box, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import DialogConfigPon from "./dialog-config-pon";
import axios from "axios";
import { hostname } from "../../hostname";
import Swal from 'sweetalert2'
import CachedIcon from '@mui/icons-material/Cached';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Oltcard({ olt_id }) {
    const [ponList, setPonList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectableRows, setSelectableRows] = useState({});

    const getPonPort = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/board/pon-port/${olt_id}`);
            if (data.status === "success") {
                setPonList(data.data);
            }
        } catch (error) {
            console.error("Error fetching OLT data:", error);
        }
    };

    const handleEditPon = (data) => {
        setOpenDialog(true);
        setSelectableRows(data);
    };

    useEffect(() => {
        getPonPort();
    }, [olt_id]);

    return (
        <>
            <Container sx={{ mt: 3 }} style={{ padding: 0 }}>
                {ponList.map((item, index) => (
                    <Box key={index} sx={{ mb: 6 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6" gutterBottom>
                                {`OLT slot ${item.slot}, board type: ${item.board_type}`}
                            </Typography>
                        </Stack>
                        <MUIDataTable
                            data={item.port}
                            options={{
                                viewColumns: false,
                                filter: false,
                                print: false,
                                download: false,
                                selectableRows: false,
                                search: true,
                                rowsPerPage: 8,
                                rowsPerPageOptions: [5, 10, 15, 20],
                                textLabels: {
                                    body: {
                                        noMatch: "Information not found.",
                                    },
                                },
                            }}
                            columns={[
                                { name: "port", label: "Port" },
                                { name: "type", label: "Type" },
                                { name: "admin_state", label: "Admin state" },
                                { name: "status", label: "Status" },
                                {
                                    name: "software_version_id",
                                    label: "ONUs",
                                    options: {
                                        customBodyRenderLite: (index) => {
                                            const element = item.port[index];
                                            return (
                                                <Stack
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Link href="#" underline="none">
                                                        {`Online:${element.onu_online}`}
                                                    </Link>
                                                    <Link href="#" underline="none">
                                                        {`Total:${element.total}`}
                                                    </Link>
                                                </Stack>
                                            );
                                        },
                                    },
                                },
                                { name: "software_version_id", label: "Average signal" },
                                { name: "description", label: "Description" },
                                {
                                    name: "software_version_id",
                                    label: "Range",
                                    options: {
                                        customBodyRenderLite: (index) => {
                                            const element = item.port[index];
                                            return (
                                                <Stack
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    {`${element.min_range} - ${element.max_range} km`}
                                                </Stack>
                                            );
                                        },
                                    },
                                },
                                { name: "software_version_id", label: "TX Power" },
                                {
                                    name: "",
                                    label: "Action",
                                    options: {
                                        customBodyRenderLite: (index) => {
                                            const element = item.port[index];
                                            return (
                                                <Stack
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Button
                                                        startIcon={<AddCircleIcon />}
                                                        size="small"
                                                        onClick={() => handleEditPon(element)}
                                                    >
                                                        <b>Configure</b>
                                                    </Button>
                                                    <Button
                                                        startIcon={<CachedIcon />}
                                                        size="small"
                                                    >
                                                        <b>Reboot ONUs</b>
                                                    </Button>
                                                </Stack>
                                            );
                                        },
                                    },
                                },
                            ]}
                        />
                    </Box>
                ))}
            </Container>
            <DialogConfigPon
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                selectableRows={selectableRows}
                getPonPort={getPonPort}
            />
        </>
    );
}
