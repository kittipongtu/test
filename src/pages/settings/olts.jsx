import { useState, useEffect } from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import DialogFormOlt from "../../components/settings/dialog-fom-olt";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import axios from 'axios';
import { hostname } from "../../hostname";

const hardware_version = [
  { "value": 1, "label": "ZTE-C300" },
  { "value": 2, "label": "ZTE-C320" },
  { "value": 3, "label": "ZTE-C220" },
  { "value": 5, "label": "Huawei-MA5600" },
  { "value": 6, "label": "Huawei-MA5603" },
  { "value": 7, "label": "Huawei-MA5608T" },
  { "value": 8, "label": "Huawei-MA5680T" },
  { "value": 9, "label": "Huawei-MA5683T" },
  { "value": 10, "label": "Huawei-MA5800-X2" },
  { "value": 11, "label": "Huawei-MA5800-X7" },
  { "value": 12, "label": "Huawei-MA5800-X15" },
  { "value": 13, "label": "Huawei-MA5800-X17" },
  { "value": 14, "label": "Huawei-MA5600T" },
  { "value": 15, "label": "ZTE-C600" },
  { "value": 16, "label": "ZTE-C650" },
  { "value": 17, "label": "ZTE-C680" },
  { "value": 18, "label": "ZTE-C350" },
  { "value": 19, "label": "ZTE-C610" },
  { "value": 20, "label": "ZTE-C620" },
  { "value": 21, "label": "Huawei-EA5800-X2" },
  { "value": 22, "label": "Huawei-EA5801-GP08" },
  { "value": 23, "label": "Huawei-EA5801E-GP16" },
  { "value": 24, "label": "Huawei-MA5801E-GP16" },
  { "value": 25, "label": "Huawei-EA5800-X7" }
];

const software_version = [
  { "value": 1, "label": "R008" },
  { "value": 2, "label": "R009" },
  { "value": 3, "label": "R011" },
  { "value": 4, "label": "R012" },
  { "value": 5, "label": "R013" },
  { "value": 6, "label": "R014" },
  { "value": 7, "label": "R015" },
  { "value": 8, "label": "R016" },
  { "value": 9, "label": "R017" },
  { "value": 10, "label": "R018" },
  { "value": 11, "label": "R019" },
  { "value": 12, "label": "R020" },
  { "value": 13, "label": "R021" }
];


export default function OLTs() {
  const [oltlist, setOltlist] = useState([]);
  const [openDialog, setOpenDialog] = useState({
    status: false,
    type: ""
  });

  const getolt = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/olt`);
      if (data.status === "success") {
        let results = data.results
        results.map((item, index) => {
          item.No = index + 1
          return item
        })
        setOltlist(results)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddOlt = () => {
    setOpenDialog({
      status: true,
      type: "create"
    });
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to Delete !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6fbf73',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deleted'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOlt(item)
      }
    })
  }

  const deleteOlt = async (item) => {
    try {
      let id = item
      const { data } = await axios.delete(`${hostname}/api/olt/${id}`);
      if (data.status === "success") {
        getolt()
      }
    } catch (error) {
      Swal.fire(
        'Failed !',
        'Cannot be Deleted!',
        'error'
      )
    }
  }

  useEffect(() => {
    getolt()
  }, []);

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">
            <b>OLT Settings</b>
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
              color="primary"
              onClick={handleAddOlt}
            >
              <AddIcon />
              <b>add</b>
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
              color="success"
            >
              <b>Export list</b>
            </Button>
          </Stack>
        </Stack>
        <MUIDataTable
          data={oltlist}
          options={{
            viewColumns: false,
            filter: false,
            print: false,
            download: false,
            selectableRows: false,
            search: true,
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
              name: "No",
              label: "No",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "name_olt",
              label: "name_olt",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "olt_ip_fqdn",
              label: "OLT IP",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "tcp_port",
              label: "Telnet/SSH TCP port",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "iptv_module",
              label: "IPTV",
              options: {
                customBodyRender: (value) => <b>{value}</b>,
              },
            },
            {
              name: "hardware_version_id",
              label: "OLT hardware version",
              options: {
                customBodyRender: (value) => <b>{hardware_version.find(i => i.value === value).label}</b>,
              },
            },
            {
              name: "software_version_id",
              label: "OLT SW version",
              options: {
                customBodyRender: (value) => <b>{software_version.find(i => i.value === value).label}</b>,
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
                    <Link to="/setting/olt-detail" state={{ id: value }} className="link">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        sx={{
                          boxShadow: 0,
                          borderRadius: "3px",
                          mr: { xs: 0, md: 1 },
                          mb: { xs: 1, md: 0 },
                        }}
                      >
                        <b>View</b>
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      size="small"
                      color="danger"
                      sx={{ boxShadow: 0, borderRadius: "3px" }}
                      onClick={() => handleDelete(value)}
                    >
                      <b>Delete</b>
                    </Button>
                  </Stack>
                ),
              },
            },
          ]}
        />
        {open &&
          <DialogFormOlt
            open={openDialog}
            setOpen={setOpenDialog}
            hardware_version={hardware_version}
            software_version={software_version}
          />
        }
      </Container>
    </>
  );
}
