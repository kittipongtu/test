import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import ComponentInit from "../../../../utils/component-init";

export default function PermissionTable(props) {
    const { permissionlist, handleUpdate, handleManageComponent, page, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage } = props;

    return (
        <>
            <MUIDataTable
                data={permissionlist}
                options={{
                    viewColumns: false,
                    filter: true,
                    print: false,
                    download: false,
                    selectableRows: false,
                    rowsPerPageOptions: [5, 10, 15, 20],
                    serverSide: true,
                    pagination: true,
                    count: totalRows,
                    page: page,
                    rowsPerPage: rowsPerPage,
                    onChangePage: handleChangePage,
                    onChangeRowsPerPage: handleChangeRowsPerPage,
                    textLabels: {
                        body: {
                            noMatch: "Information not found.",
                        },
                    },
                }}
                columns={[
                    {
                        name: "permission_name",
                        label: "Permission Name",
                    },
                    {
                        name: "permission_display_name",
                        label: "Permission Display",
                    },
                    {
                        name: "permission_description",
                        label: "Permission Description",
                    },
                    {
                        name: "id",
                        label: "Action",
                        options: {
                            customBodyRender: (value) => (
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
                                                color="info"
                                                sx={{ boxShadow: 0, borderRadius: "3px", marginRight: "5px" }}
                                                onClick={(e) => {
                                                    handleManageComponent(value);
                                                }}
                                            >
                                                <b>Components </b>
                                            </Button>
                                        }
                                        component_key="manage-components-button"
                                    />
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
                                                onClick={(e) => {
                                                    handleUpdate(value);
                                                }}
                                            >
                                                <b>Edit</b>
                                            </Button>
                                        }
                                        component_key="edit-permission-button"
                                    />
                                    <ComponentInit
                                        children={
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="danger"
                                                sx={{ boxShadow: 0, borderRadius: "3px", marginRight: "5px" }}
                                            >
                                                <b>Delete </b>
                                            </Button>
                                        }
                                        component_key="delete-permission-button"
                                    />
                                </Stack>
                            ),
                        },
                    },
                ]}
            />
        </>
    );
}
