import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";

export default function OBDs() {
  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">
            <b>OLTs Settings</b>
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ boxShadow: 0, borderRadius: "3px" }}
            color="primary"
          >
            <AddIcon />
            <b>add</b>
          </Button>
        </Stack>
        <MUIDataTable
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
        />
      </Container>
    </>
  );
}
