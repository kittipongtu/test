import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import ComponentInit from "../../../../utils/component-init";

export default function RoleTable(props) {
    const { rolelist, handleUpdate, page, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage } = props;

    return (
        <>
            <MUIDataTable
                data={rolelist}
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
                        name: "role_name",
                        label: "Role Name",
                    },
                    {
                        name: "role_description",
                        label: "Role Description",
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
                                            <Link
                                                to={`/setting/role/${value}`}
                                                style={{ textDecoration: "none" }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="info"
                                                    sx={{ boxShadow: 0, borderRadius: "3px", marginRight: "5px" }}
                                                >
                                                    <b>Detail </b>
                                                </Button>
                                            </Link>
                                        }
                                        component_key="edit-role-button"
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
                                        component_key="delete-role-button"
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
