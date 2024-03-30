import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";

export default function SiteTable(props) {
    const { siteList, handleUpdate, handleDelete, page, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage } = props;

    return (
        <>
            <MUIDataTable
                data={siteList}
                count={100}
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
                        name: "site_name",
                        label: "Site Name",
                    },
                    {
                        name: "site_description",
                        label: "Site Description",
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
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="danger"
                                        sx={{ boxShadow: 0, borderRadius: "3px" }}
                                        onClick={(e) => {
                                            handleDelete(value);
                                        }}
                                    >
                                        <b>Delete</b>
                                    </Button>
                                </Stack>
                            ),
                        },
                    },
                ]}
            />
        </>
    );
}
