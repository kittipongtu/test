import * as React from 'react';
import { Button, Checkbox, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import DialogAddSpeed from "./dialog";
import axios from 'axios';
import { hostname } from "../../hostname";

export default function Upload() {
  const [data, setData] = React.useState([])
  const [id, setId] = React.useState('')
  const [openDialog, setOpenDialog] = React.useState({
    type: '',
    status: false
  })
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRows, setTotalRows] = React.useState(0);

  const handleClickOpen = () => {
    setId('')
    setOpenDialog({
      status: true,
      tyoe: 'upload'
    });
  };

  const getUpload = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/speed_profile?skip=${page * rowsPerPage}&limit=${rowsPerPage}`);
      if (data.status === "success") {
        setData(data.data.filter(i => i.type === "UPLOAD"));
        setTotalRows(data.pagination.total_records);
      } else {
        Swal.fire(
          'Failure',
          'Unable to load data',
          'error'
        )
      }
    } catch (error) {
      alert(error)
      console.log(error);
    }
  }
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
    setPage(0); // Reset page when rowsPerPage changes
  };

  React.useEffect(() => {
    getUpload()
  }, [page, rowsPerPage]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">
          <b>Upload Settings</b>
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ boxShadow: 0, borderRadius: "3px" }}
          color="primary"
          onClick={handleClickOpen}
        >
          <AddIcon />
          <b>add</b>
        </Button>
      </Stack>
      <MUIDataTable
        data={data}
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
            name: "profile_name",
            label: "Name",
            options: {
              customBodyRender: (value) => (
                <b style={{ color: "#217DBB", textDecoration: "underline" }}>
                  {value}
                </b>
              ),
            },
          },
          {
            name: "speed",
            label: "Speed",
            options: {
              customBodyRender: (value) => <b>{value}</b>,
            },
          },
          {
            name: "type",
            label: "Type",
            options: {
              customBodyRender: (value) => <b>{value}</b>,
            },
          },
          {
            name: "default",
            label: "Default",
            options: {
              customBodyRender: (value) => <Checkbox checked={value} />,
            },
          },
          {
            name: "ONUs",
            label: "ONUs",
            options: {
              customBodyRender: (value) => (
                <b style={{ color: "#217DBB", textDecoration: "underline" }}>
                  {value}
                </b>
              ),
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
      {openDialog.status &&
        <DialogAddSpeed
          open={openDialog}
          setOpen={setOpenDialog}
          getData={getUpload}
        />
      }
    </>
  );
}
