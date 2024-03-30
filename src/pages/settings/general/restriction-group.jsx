import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import RestrictionTable from '../../../components/settings/general/table/restriction-group-table'
import DialogRestrictionGroup from '../../../components/settings/general/dialog/restriction-group-dialog'
import axios from 'axios';
import  { hostname } from "../../../hostname";
import Swal from 'sweetalert2'
import ComponentInit from "../../..//utils/component-init";

export default function RestrictionGroupPage(props) {
    const { zoneList, oltList } = props;
    const [open, setOpen] = React.useState({
        type: false,
        status: ''
    });
    const [restriction_group, setRestriction_group] = React.useState([])
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('');
    const [selectedZones, setSelectedZones] = React.useState([]);
    const [selectedOlts, setSelectedOlts] = React.useState([]);


    const handleClickOpen = () => {
        setOpen({
            status: true,
            description: 'ADD Restriction Group'
        });
    };

    const getRestriction_group = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/restriction_group`);
            if (data.status === "success") {
                data.restriction_groups.map((item, index) => {
                    if (item.olt.length === oltList.length) {
                        item.olttext = 'ALL';
                    } else {
                        let oltitem = []
                        for (let index = 0; index < item.olt.length; index++) {
                            const element = item.olt[index];
                            let olt = oltList.find(i => i.id === element)
                            if (olt) {
                                oltitem.push(olt.name_olt)
                            }
                        }
                        item.olttext = oltitem.join(',')
                    }
                    if (item.zone.length === zoneList.length) {
                        item.zonetext = 'ALL';
                    } else {
                        let zoneitem = []
                        for (let index = 0; index < item.zone.length; index++) {
                            const element = item.olt[index];
                            let zone = zoneList.find(i => i.id === element)
                            if (zone) {
                                zoneitem.push(zone.zone_name)
                            }
                        }
                        item.zonetext = zoneitem.join(',')
                    }
                    return item;
                });
                setRestriction_group(data.restriction_groups);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (item) => {
        if (item) {
            setId(item.id)
            setName(item.restriction_group_name)
            setDescription(item.restriction_group_description)
            if (item.zone) {
                let zone = []
                for (let index = 0; index < item.zone.length; index++) {
                    const element = item.zone[index];
                    let zoneitem = zoneList.find(i => i.id === parseInt(element))
                    if (zoneitem) {
                        zone.push(zoneitem)
                    }
                }
                setSelectedZones(zone)
            }
            if (item.olt) {
                let olt = []
                for (let index = 0; index < item.olt.length; index++) {
                    const element = item.olt[index];
                    let oltitem = oltList.find(i => i.id === element)
                    if (oltitem) {
                        olt.push(oltitem)
                    }
                }
                setSelectedOlts(olt)
            }
            setOpen({
                status: true,
                description: 'Update Restriction Group'
            });
        }
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Delete Restriction Group!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRestrictionGroup(item)
            }
        })
    }

    const deleteRestrictionGroup = async (id) => {
        try {
            await axios.delete(`${hostname}/api/restriction_group/${id}`).then(response => {
                if (response.status === 204) {
                    getRestriction_group();
                    Swal.fire(
                        'Success',
                        'Delete Successfully',
                        'success'
                    )
                }
            });
        } catch (error) {
            console.error('An error occurred:', error);
            if (error.response) {
                Swal.fire(
                    'Failure',
                    error.response.data.detail,
                    'error'
                )
            } else {
                Swal.fire(
                    'Failure',
                    'An error occurred while creating the role.',
                    'error'
                )
            }
        }
    }

    React.useEffect(() => {
        getRestriction_group()
    }, []);



    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">
                    <b>Restriction Group</b>
                </Typography>
                <ComponentInit
                    children={
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ boxShadow: 0, borderRadius: "3px" }}
                            color="success"
                            onClick={handleClickOpen}
                        >
                            <AddIcon />
                            <b>ADD Restriction Group</b>
                        </Button>
                    }
                    component_key="create-user-button"
                />
            </Stack>
            <RestrictionTable
                restrictionGroup={restriction_group}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
            <DialogRestrictionGroup
                open={open}
                setOpen={setOpen}
                id={id}
                setId={setId}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                selectedZones={selectedZones}
                setSelectedZones={setSelectedZones}
                selectedOlts={selectedOlts}
                setSelectedOlts={setSelectedOlts}
                getRestriction_group={getRestriction_group}
            />
        </>
    );
}
