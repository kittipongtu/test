import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";

let mockData = [
  {
    id: 1,
    "PON type": "GPON",
    "ONU type": "HG8010C",
    "Ethernet ports": "1",
    Wifi: "0",
    "VoIP ports": "0",
    CATV: "1",
    "Allow custom profiles": "yes",
    Capability: "Bridging/Routing",
  },
  {
    id: 2,
    "PON type": "GPON",
    "ONU type": "HG8010H",
    "Ethernet ports": "1",
    Wifi: "0",
    "VoIP ports": "0",
    CATV: "0",
    "Allow custom profiles": "yes",
    Capability: "Bridging",
  },
  {
    id: 3,
    "PON type": "GPON",
    "ONU type": "HG8120C",
    "Ethernet ports": "2",
    Wifi: "0",
    "VoIP ports": "1",
    CATV: "0",
    "Allow custom profiles": "yes",
    Capability: "Bridging/Routing",
  },
  {
    id: 4,
    "PON type": "GPON",
    "ONU type": "HG8240H",
    "Ethernet ports": "4",
    Wifi: "4",
    "VoIP ports": "2",
    CATV: "0",
    "Allow custom profiles": "yes",
    Capability: "Bridging/Routing",
  },
];

export default function ONUTypes() {
  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">
            <b>ONU-types Settings</b>
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ boxShadow: 0, borderRadius: "3px" }}
            color="success"
          >
            <AddIcon />
            <b>add</b>
          </Button>
        </Stack>
        <MUIDataTable
          data={mockData}
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
              name: "PON type",
              label: "PON type",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "ONU type",
              label: "ONU type",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "Ethernet ports",
              label: "Ethernet ports",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "Wifi",
              label: "Wifi",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "VoIP ports",
              label: "VoIP ports",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "CATV",
              label: "CATV",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "Allow custom profiles",
              label: "Allow custom profiles",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "Capability",
              label: "Capability",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
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
                    >
                      <b>Edit</b>
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="danger"
                      sx={{ boxShadow: 0, borderRadius: "3px" }}
                    >
                      <b>Delete</b>
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
