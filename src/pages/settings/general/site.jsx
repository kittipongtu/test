import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import SiteTable from '../../../components/settings/general/table/site-table'
import DialogSite from '../../../components/settings/general/dialog/site-dialog'
import axios from 'axios';
import { hostname } from "../../../hostname";
import Swal from "sweetalert2"

export default function SitePage() {
    const [open, setOpen] = React.useState({
        type: false,
        status: ''
    });
    const [sitelist, setSitelist] = React.useState([])
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalRows, setTotalRows] = React.useState(0);

    const handleClickOpen = () => {
        setOpen({
            status: true,
            description: 'ADD SITE'
        });
    };

    const getSite = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/site?skip=${page * rowsPerPage}&limit=${rowsPerPage}`);
            if (data.status === "success") {
                setSitelist(data.data);
                setTotalRows(data.pagination.total_records);
            } else {
                Swal.fire(
                    'Failure',
                    'Unable to load data',
                    'error'
                )
            }
        } catch (error) {
            alert(error)
            console.log(error);
        }
    }

    const handleUpdate = async (id) => {
        const selectedSite = sitelist.find(i => i.id === id)
        if (selectedSite) {
            setId(selectedSite.id)
            setName(selectedSite.site_name)
            setDescription(selectedSite.site_description)
            setOpen({
                status: true,
                description: 'Update SITE'
            });
        }
    }

    const handleDelete = async (id) => {
        const selectedSite = sitelist.find(i => i.id === id)
        if (selectedSite) {
            Swal.fire({
                title: 'Are you sure?',
                text: `You want to Delete Site!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#6fbf73',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Save'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteSite(selectedSite.id)
                }
            })
        }
    }

    const deleteSite = async (id) => {
        try {
            await axios.delete(
                `${hostname}/api/site/${id}`
            ).then(response => {
                if (response.status === 204) {
                    getSite()
                    Swal.fire(
                        'Success',
                        'Delete Site Successfully',
                        'success'
                    )
                }
            });
        } catch (error) {
            Swal.fire(
                'Failure',
                'Delete Site Failed',
                'error'
            )
        }
    }

    const handleChangePage = (newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (rowsPerPage) => {
        setRowsPerPage(rowsPerPage);
        setPage(0); // Reset page when rowsPerPage changes
      };

    React.useEffect(() => {
        getSite()
    }, [page, rowsPerPage]);

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">
                    <b>Site</b>
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ boxShadow: 0, borderRadius: "3px" }}
                    color="success"
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                    <b>ADD SITE</b>
                </Button>
            </Stack>
            <SiteTable
                siteList={sitelist}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                page={page}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <DialogSite
                open={open}
                setOpen={setOpen}
                id={id}
                setId={setId}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                getSite={getSite}
            />
        </>
    );
}
