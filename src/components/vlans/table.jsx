import { useState, useEffect } from 'react';
import { Button, Container, Stack, Typography, Box, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { hostname } from "../../hostname";
import Swal from 'sweetalert2'
import CachedIcon from '@mui/icons-material/Cached';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function VlansTable(props) {

    useEffect(() => {
    }, []);

    return (
        <>
            <MUIDataTable
                // data={}
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
                    { name: "port", label: "VLAN-ID" },
                    { name: "type", label: "Description" },
                    { name: "admin_state", label: "ONUs" },
                    // {
                    //     name: "",
                    //     label: "Action",
                    //     options: {
                    //         customBodyRenderLite: (index) => {
                    //             const element = item.port[index];
                    //             return (
                    //                 <Stack
                    //                     direction="column"
                    //                     justifyContent="center"
                    //                     alignItems="center"
                    //                 >
                    //                     <Button
                    //                         startIcon={<AddCircleIcon />}
                    //                         size="small"
                    //                         onClick={() => handleEditPon(element)}
                    //                     >
                    //                         <b>Configure</b>
                    //                     </Button>
                    //                     <Button
                    //                         startIcon={<CachedIcon />}
                    //                         size="small"
                    //                     >
                    //                         <b>Reboot ONUs</b>
                    //                     </Button>
                    //                 </Stack>
                    //             );
                    //         },
                    //     },
                    // },
                ]}
            />
        </>
    );
}
