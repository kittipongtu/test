import {
  Button,
  ButtonGroup,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from 'react';
import PublicIcon from "@mui/icons-material/Public";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import * as React from "react";
import MUIDataTable from "mui-datatables";
import { configuredData } from "../../mockup/configured";
import { useNavigate } from "react-router";
import axios from "axios";
import { hostname } from "../../hostname";

export default function Configured() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedSignal, setSelectedSignal] = useState("ALL");
  const [ontList, setOnuList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRows, setTotalRows] = React.useState(0);

  const handleButtonClick = (key) => {
    setSelectedButton(key);
  };

  const handleStatusClick = (key) => {
    setSelectedStatus(key);
  };

  const handleSignalClick = (key) => {
    setSelectedSignal(key);
  };

  const getonu = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/onu`);
      if (data.status === "success") {
        setOnuList(data.data);
        setTotalRows(data.pagination.total_records);
      }
    } catch (error) {
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
  getonu()
}, [page, rowsPerPage]);

  return (
    <>
      <Stack
        direction="column"
        sx={{ mt: { md: -13, xs: -1 }, p: { md: 15, xs: 3 } }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={4}>
            <Typography variant="subtitle2">
              Search
            </Typography>
            <TextField
              inputProps={{
                style: {
                  height: "15px",
                },
              }}
              placeholder="SN, IP, name or address"
              color="warning"
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={2}>
            <Typography variant="subtitle2">
              OLT
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} lg={1}>
            <Typography variant="subtitle2">
              Board
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={2} lg={1}>
            <Typography variant="subtitle2">
              Port
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={2} lg={1}>
            <Typography variant="subtitle2">
              Zone
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={2} lg={1}>
            <Typography variant="subtitle2">
              ODB
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={2} lg={1}>
            <Typography variant="subtitle2">
              VLAN
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={2} lg={1}>
            <Typography variant="subtitle2">
              ONU type
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Stack
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            mt: 0.5,
            mb: 3,
          }}
          spacing={2}
        >
          <ButtonGroup
            variant="outlined"
            size="small"
            color="warning"
            sx={{ height: "30px", mt: 2, mr: { xs: 0, md: 4 } }}
          >
            <Button
              className={
                selectedButton === "ALL" ? "selectedButton" : "unselectedButton"
              }
              key="ALL"
              onClick={() => handleButtonClick("ALL")}
            >
              ALL
            </Button>
            <Button
              className={
                selectedButton === "EPON"
                  ? "selectedButton"
                  : "unselectedButton"
              }
              key="EPON"
              onClick={() => handleButtonClick("EPON")}
            >
              EPON
            </Button>
            <Button
              className={
                selectedButton === "GPON"
                  ? "selectedButton"
                  : "unselectedButton"
              }
              key="GPON"
              onClick={() => handleButtonClick("GPON")}
            >
              GPON
            </Button>
          </ButtonGroup>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="subtitle2"
              sx={{
                mt: { xs: 0.5, md: 0.6 },
                display: { xs: "none", md: "contents" },
              }}
            >
              STATUS
            </Typography>
            <ButtonGroup
              variant="outlined"
              size="small"
              color="warning"
              sx={{ height: "30px" }}
            >
              <Button
                className={
                  selectedStatus === "ALL"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="ALL"
                onClick={() => handleStatusClick("ALL")}
              >
                ALL
              </Button>
              <Button
                className={
                  selectedStatus === "ONLINE"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="ALL"
                onClick={() => handleStatusClick("ONLINE")}
              >
                <b>
                  <PublicIcon
                    size="small"
                    sx={{ fontSize: "20px", marginTop: "5px", color: "green" }}
                  />
                </b>
              </Button>
              <Button
                className={
                  selectedStatus === "LOSS"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="LOSS"
                onClick={() => handleStatusClick("LOSS")}
              >
                <b>
                  <LinkOffIcon
                    size="small"
                    sx={{ fontSize: "20px", marginTop: "5px", color: "red" }}
                  />
                </b>
              </Button>
              <Button
                className={
                  selectedStatus === "UNPLUG"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="UNPLUG"
                onClick={() => handleStatusClick("UNPLUG")}
              >
                <b>
                  <PowerOffIcon
                    size="small"
                    sx={{ fontSize: "20px", marginTop: "5px", color: "#000" }}
                  />
                </b>
              </Button>
              <Button
                className={
                  selectedStatus === "DISABLED"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="DISABLED"
                onClick={() => handleStatusClick("DISABLED")}
              >
                <b>
                  <DoNotDisturbAltIcon
                    size="small"
                    sx={{ fontSize: "20px", marginTop: "5px", color: "#000" }}
                  />
                </b>
              </Button>
            </ButtonGroup>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ pl: { xs: 0, md: 4 } }}>
            <Typography variant="subtitle2" sx={{ mt: { xs: 0.5, md: 0.6 } }}>
              SIGNAL
            </Typography>
            <ButtonGroup
              variant="outlined"
              size="small"
              color="warning"
              sx={{ height: "30px" }}
            >
              <Button
                className={
                  selectedSignal === "ALL"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="ALL"
                onClick={() => handleSignalClick("ALL")}
              >
                ALL
              </Button>
              <Button
                className={
                  selectedSignal === "good"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="good"
                onClick={() => handleSignalClick("good")}
              >
                <b>
                  <SignalCellularAltIcon
                    size="small"
                    sx={{ fontSize: "20px", marginTop: "5px", color: "green" }}
                  />
                </b>
              </Button>
              <Button
                className={
                  selectedSignal === "warning"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="warning"
                onClick={() => handleSignalClick("warning")}
              >
                <b>
                  <SignalCellularAltIcon
                    size="small"
                    sx={{
                      fontSize: "20px",
                      marginTop: "5px",
                      color:
                        selectedSignal === "warning"
                          ? "#FFF !important"
                          : "orange",
                    }}
                  />
                </b>
              </Button>
              <Button
                className={
                  selectedSignal === "critical"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="critical"
                onClick={() => handleSignalClick("critical")}
              >
                <b>
                  <SignalCellularAltIcon
                    size="small"
                    sx={{ fontSize: "20px", marginTop: "5px", color: "red" }}
                  />
                </b>
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
        <MUIDataTable
          data={ontList}
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
              name: "onu.runstate",
              label: "Status",
              options: {
                customBodyRenderLite: (index) => {
                  let element = ontList[index];
                  if (element.onu.runstate === "online") {
                    return (
                      <PublicIcon
                        size="small"
                        sx={{
                          fontSize: "25px",
                          marginTop: "5px",
                          color: "#4db14b",
                        }}
                      />
                    );
                  } else if (element.onu.runstate === "offline") {
                    return (
                      <LinkOffIcon
                        size="small"
                        sx={{
                          fontSize: "25px",
                          marginTop: "5px",
                          color: "red",
                        }}
                      />
                    );
                  } else if (element.onu.runstate === "UNPLUG") {
                    return (
                      <PowerOffIcon
                        size="small"
                        sx={{
                          fontSize: "25px",
                          marginTop: "5px",
                          color: "#AAAA",
                        }}
                      />
                    );
                  } else {
                    <DoNotDisturbAltIcon
                      size="small"
                      sx={{
                        fontSize: "25px",
                        marginTop: "5px",
                        color: "#AAAA",
                      }}
                    />;
                  }
                },
              },
            },
            {
              name: "id",
              label: "View",
              options: {
                customBodyRenderLite: (index) => {
                  let element = ontList[index];
                  return (
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        sx={{ boxShadow: 0, borderRadius: "3px" }}
                        onClick={() => navigate(`/configured/view/${element.onu.id}`)}
                      >
                        View
                      </Button>
                    </Stack>
                  );
                },
              },
            },
            {
              name: "description",
              label: "Name",
              options: {
                customBodyRenderLite: (index) => {
                  let element = ontList[index];
                  return (
                    <lable>{element.onu ? element.onu.description : ''}</lable>
                  );
                },
              },
            },
            {
              name: "sn",
              label: "SN / MAC",
              options: {
                customBodyRenderLite: (index) => {
                  let element = ontList[index];
                  return (
                    <lable>{element.onu ? element.onu.sn : ''}</lable>
                  );
                },
              },
            },
            {
              name: "ONU",
              label: "	ONU",
              options: {
                customBodyRenderLite: (index) => {
                  let element = ontList[index];
                  return (
                    <lable>{element.olt ? `${element.olt.name_olt} gpon-onu_${element.onu.frame}/${element.onu.slot}/${element.onu.gpon}:${element.onu.ont_id}` : ''}</lable>
                  );
                },
              },
            },
            {
              name: "Zone",
              label: "Zone",
            },
            {
              name: "ODB",
              label: "ODB",
            },
            {
              name: "Signal",
              label: "Signal",
              options: {
                customBodyRender: (value) => {
                  if (value === "good") {
                    return (
                      <SignalCellularAltIcon
                        size="small"
                        sx={{
                          fontSize: "25px",
                          marginTop: "5px",
                          color: "green",
                        }}
                      />
                    );
                  } else if (value === "warning") {
                    return (
                      <SignalCellularAltIcon
                        size="small"
                        sx={{
                          fontSize: "25px",
                          marginTop: "5px",
                          color: "orange",
                        }}
                      />
                    );
                  } else if (value === "-") {
                    return "-";
                  } else {
                    return (
                      <SignalCellularAltIcon
                        size="small"
                        sx={{
                          fontSize: "25px",
                          marginTop: "5px",
                          color: "red",
                        }}
                      />
                    );
                  }
                },
              },
            },
            {
              name: "B/R",
              label: "B/R",
              options: {
                customBodyRender: (value) => {
                  return (
                    <span
                      style={{
                        background: value === "Router" ? "#264f7b" : "#92adc2",
                        padding: "2px 10px 2px 10px",
                        borderRadius: "4px",
                        color: "#FFF",
                        fontSize: "12px",
                      }}
                    >
                      {value}
                    </span>
                  );
                },
              },
            },
            {
              name: "VLAN",
              label: "VLAN",
            },
            {
              name: "VoIP",
              label: "VoIP",
            },
            {
              name: "TV",
              label: "TV",
              options: {
                customBodyRender: (value) => {
                  if (value !== "") {
                    return (
                      <span
                        style={{
                          background: "#4db14b",
                          padding: "2px 10px 2px 10px",
                          borderRadius: "4px",
                          color: "#FFF",
                          fontSize: "12px",
                        }}
                      >
                        {value}
                      </span>
                    );
                  }
                },
              },
            },
            {
              name: "Type",
              label: "Type",
              options: {
                customBodyRenderLite: (index) => {
                  let element = ontList[index];
                  return (
                    <lable>{element.board ? element.board.boardname : ''}</lable>
                  );
                },
              },
            },
            {
              name: "Auth date",
              label: "Auth date",
            },
          ]}
        />
      </Stack>
    </>
  );
}
