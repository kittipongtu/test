import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import ComponentInit from "../../../../utils/component-init";

export default function RestrictionTable(props) {
    const { restrictionGroup, handleDelete, handleUpdate } = props;




    return (
        <>
            <MUIDataTable
                data={restrictionGroup}
                options={{
                    viewColumns: false,
                    filter: true,
                    print: false,
                    download: false,
                    selectableRows: false,
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
                        name: "restriction_group_name",
                        label: "Restriction group",
                    },
                    {
                        name: "zonetext",
                        label: "Zones",
                    },
                    {
                        name: "olttext",
                        label: "OLTs",
                    },
                    {
                        name: "id",
                        label: "Action",
                        options: {
                            customBodyRenderLite: (index) => {
                                let element = restrictionGroup[index];
                                return (
                                    <Stack
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "column", md: "row" },
                                        }}
                                    >
                                        <ComponentInit
                                            children={
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="warning"
                                                    sx={{
                                                        boxShadow: 0,
                                                        borderRadius: "3px",
                                                        mr: { xs: 0, md: 1 },
                                                        mb: { xs: 1, md: 0 }
                                                    }}
                                                    onClick={() => {
                                                        handleUpdate(element)
                                                    }}
                                                >
                                                    <b>EDIT</b>
                                                </Button>
                                            }
                                            component_key="edit-user-button"
                                        />
                                        <ComponentInit
                                            children={
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="error"
                                                    sx={{
                                                        boxShadow: 0,
                                                        borderRadius: "3px",
                                                        mr: { xs: 0, md: 1 },
                                                        mb: { xs: 1, md: 0 }
                                                    }}
                                                    onClick={() => {
                                                        handleDelete(element.id)
                                                    }}
                                                >
                                                    <b>Delete</b>
                                                </Button>
                                            }
                                            component_key="delete-user-button"
                                        />
                                    </Stack>
                                );
                            },
                        },
                    },
                ]}
            />
        </>
    );
}
