import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import ComponentInit from "../../../..//utils/component-init";

export default function UsersTable(props) {
    const { userList, handleUpdate } = props;

    return (
        <>
            <MUIDataTable
                data={userList}
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
                        name: "firstname",
                        label: "First Name",
                    },
                    {
                        name: "lastname",
                        label: "Last Name",
                    },
                    {
                        name: "role_name",
                        label: "Role",
                    },
                    {
                        name: "restriction_group_name",
                        label: "restriction_group_name",
                    },
                    {
                        name: "permission_description",
                        label: "Status",
                    },
                    {
                        name: "permission_description",
                        label: "Last login",
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
                                        component_key="edit-user-button"
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
                                        component_key="delete-user-button"
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
