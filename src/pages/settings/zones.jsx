import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import DialogFormZone from "../../components/settings/dialog-form-zone";
import axios from 'axios';
import  { hostname } from "../../hostname";

export default function Zones() {
  const [open, setOpen] = React.useState({
    description: '',
    status: false
  });
  const [id, setId] = React.useState('')
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [zonelist, setZonelist] = React.useState([])

  const handleClickOpen = () => {
    setId('')
    setOpen({
      status: true,
      description: 'ADD ZONE'
    });
  };

  const getZone = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/zone`);
      if (data.status === "success") {
        setZonelist(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getZone()
  }, []);

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <div></div>
          <Button
            variant="contained"
            size="small"
            sx={{ boxShadow: 0, borderRadius: "3px" }}
            color="success"
            onClick={handleClickOpen}
          >
            <AddIcon />
            <b>ADD ZONE</b>
          </Button>
        </Stack>
        <MUIDataTable
          data={zonelist}
          title={
            <Typography variant="h5">
              <b>Zone Settings</b>
            </Typography>
          }
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
              name: "zone_name",
              label: "name",
            },
            {
              name: "zone_description",
              label: "description",
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
                        mb: { xs: 1, md: 0 },
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
        {open &&
          <DialogFormZone
            open={open}
            setOpen={setOpen}
            id={id}
            name={name}
            description={description}
            setId={setId}
            setName={setName}
            setDescription={setDescription}
            getZone={getZone}
          />
        }
      </Container>
    </>
  );
}
