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
  import { useState } from "react";
  import PublicIcon from "@mui/icons-material/Public";
  import PowerOffIcon from "@mui/icons-material/PowerOff";
  import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
  import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
  import LinkOffIcon from "@mui/icons-material/LinkOff";
  import * as React from "react";
  import MUIDataTable from "mui-datatables";
  import { configuredData } from "../mockup/configured";
  import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
  
  export default function Diagnostics() {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState("ALL");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedSignal, setSelectedSignal] = useState("ALL");
  
    const handleButtonClick = (key) => {
      setSelectedButton(key);
    };
  
    const handleStatusClick = (key) => {
      setSelectedStatus(key);
    };
  
    const handleSignalClick = (key) => {
      setSelectedSignal(key);
    };
  
    return (
      <>
        <Stack
          direction="column"
          sx={{ mt: { md: -13, xs: -1 }, p: { md: 15, xs: 3 } }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={4}>
              <Typography variant="subtitle2">
                <b>Search</b>
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
                <b>OLT</b>
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
                  <b>any</b>
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} lg={1}>
              <Typography variant="subtitle2">
                <b>Board</b>
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
                  <b>any</b>
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={2} lg={1}>
              <Typography variant="subtitle2">
                <b>Port</b>
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
                  <b>any</b>
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={2} lg={1}>
              <Typography variant="subtitle2">
                <b>Zone</b>
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
                  <b>any</b>
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={2} lg={1}>
              <Typography variant="subtitle2">
                <b>ODB</b>
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
                  <b>any</b>
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={2} lg={1}>
              <Typography variant="subtitle2">
                <b>VLAN</b>
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
                  <b>any</b>
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={2} lg={1}>
              <Typography variant="subtitle2">
                <b>ONU type</b>
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
                  <b>any</b>
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
                <b>ALL</b>
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
                <b>EPON</b>
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
                <b>GPON</b>
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
                <b>STATUS</b>
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
                  <b>ALL</b>
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
                <b>SIGNAL</b>
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
                  <b>ALL</b>
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
            data={configuredData}
            options={{
              viewColumns: false,
              filter: false,
              search: false,
              print: false,
              download: false,
              selectableRows: false,
              rowsPerPage: 10,
              rowsPerPageOptions: [],
              textLabels: {
                body: {
                  noMatch: "Information not found.",
                },
              },
              customHeadRender: (columnMeta, updateDirection) => {
                return (
                  <th
                    key={columnMeta.index}
                    onClick={() => updateDirection(columnMeta.index)}
                    style={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    {columnMeta.label}
                  </th>
                );
              },
            }}
            columns={[
              {
                name: "Status",
                label: "Status",
                options: {
                  customBodyRender: (value) => {
                    if (value === "ONLINE") {
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
                    } else if (value === "LOSS") {
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
                    } else if (value === "UNPLUG") {
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
                name: "Signal Value",
                label: "Signal Value",
              },
              {
                name: "Distance",
                label: "Distance"
              },
              {
                name: "Name",
                label: "Name",
              },
              {
                name: "SN / MAC",
                label: "SN / MAC",
                options: {
                    customBodyRenderLite: index => {
                        let element = configuredData[index];
                        return <Link to={`/configured/view/${element.id}`}>
                            <b>{element['SN / MAC']}</b>
                        </Link>
                    }
                }
              },
              {
                name: "Zone",
                label: "Zone",
                options: {
                  customBodyRender: (value) => {
                    return <b>{value}</b>;
                  },
                },
              },
              {
                name: "ODB",
                label: "ODB",
              },
              {
                name: "ONU",
                label: "ONU",
              },
              {
                name: "Auth date",
                label: "Last status change",
              },
            ]}
          />
        </Stack>
      </>
    );
  }
  