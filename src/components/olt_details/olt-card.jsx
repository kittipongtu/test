import { useState, useEffect } from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import DialogFormOlt from "../../components/settings/dialog-fom-olt";
import axios from "axios";
import { hostname } from "../../hostname";
import Swal from 'sweetalert2'


export default function Oltcard(props) {
    const { olt_id } = props;
    const [boardlist, setBoardlist] = useState([]);
    const [openDialog, setOpenDialog] = useState({
        status: false,
        type: ""
    });

    const getolt = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/board/${olt_id}`);
            if (data.status === "success") {
                setBoardlist(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDetectcard = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/board/detect-card/${olt_id}`);
        } catch (error) {
            
        }
    }


    useEffect(() => {
        getolt()
    }, []);

    return (
        <>
            <Container sx={{ mt: 3 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ boxShadow: 0, borderRadius: "3px" }}
                            color="primary"
                        >
                            <b>Refresh OLT cards info</b>
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ boxShadow: 0, borderRadius: "3px" }}
                            color="primary"
                            onClick={handleDetectcard}
                        >
                            <b>Detect new cards</b>
                        </Button>
                    </Stack>
                </Stack>
                <MUIDataTable
                    data={boardlist}
                    options={{
                        viewColumns: false,
                        filter: false,
                        print: false,
                        download: false,
                        selectableRows: false,
                        search: true,
                        rowsPerPage: 5,
                        rowsPerPageOptions: [5, 10, 15, 20],
                        textLabels: {
                            body: {
                                noMatch: "Information not found.",
                            },
                        },
                    }}
                    columns={[
                        {
                            name: "slotid",
                            label: "Slot",
                            options: {
                                customBodyRender: (value) => <b>{value}</b>,
                            },
                        },
                        {
                            name: "boardname",
                            label: "Type",
                            options: {
                                customBodyRender: (value) => <b>{value}</b>,
                            },
                        },
                        {
                            name: "boardname",
                            label: "Real type",
                            options: {
                                customBodyRender: (value) => <b>{value}</b>,
                            },
                        },
                        {
                            name: "port",
                            label: "Ports",
                            options: {
                                customBodyRender: (value) => <b>{value}</b>,
                            },
                        },
                        {
                            name: "iptv_module",
                            label: "SW",
                            options: {
                                customBodyRender: (value) => <b>{value}</b>,
                            },
                        },
                        {
                            name: "status",
                            label: "Status",
                            //   options: {
                            //     customBodyRender: (value) => <b>{hardware_version.find(i => i.value === value).label}</b>,
                            //   },
                        },
                        {
                            name: "software_version_id",
                            label: "Role",
                            //   options: {
                            //     customBodyRender: (value) => <b>{software_version.find(i => i.value === value).label}</b>,
                            //   },
                        },
                        {
                            name: "software_version_id",
                            label: "Info updated",
                            //   options: {
                            //     customBodyRender: (value) => <b>{software_version.find(i => i.value === value).label}</b>,
                            //   },
                        },
                        {
                            name: "",
                            label: "",
                            options: {
                                customBodyRender: (value) => (
                                    <Stack
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "column", md: "row" },
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            sx={{
                                                boxShadow: 0,
                                                borderRadius: "3px",
                                                mr: { xs: 0, md: 1 },
                                                mb: { xs: 1, md: 0 },
                                            }}
                                        >
                                            <b>Reboot-card</b>
                                        </Button>
                                    </Stack>
                                ),
                            },
                        },
                    ]}
                />
            </Container>
        </>
    );
}
