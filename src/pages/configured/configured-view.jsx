import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { configuredData } from "../../mockup/configured";
import { Button, Grid, Stack, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import PublicIcon from "@mui/icons-material/Public";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { hostname } from "../../hostname";
import CardStatus from "./detail-status";
import LoadingButton from '@mui/lab/LoadingButton';

const StatusIcon = (status) => {
  if (status === "online") {
    return (
      <PublicIcon
        size="small"
        sx={{
          fontSize: "18px",
          marginBottom: "-4px",
          color: "#4db14b",
        }}
      />
    );
  } else if (status === "offline") {
    return (
      <LinkOffIcon
        size="small"
        sx={{
          fontSize: "18px",
          marginBottom: "-4px",
          color: "red",
        }}
      />
    );
  } else if (status === "UNPLUG") {
    return (
      <PowerOffIcon
        size="small"
        sx={{
          fontSize: "18px",
          marginBottom: "-4px",
          color: "#AAAA",
        }}
      />
    );
  } else {
    <DoNotDisturbAltIcon
      size="small"
      sx={{
        fontSize: "18px",
        marginBottom: "-4px",
        color: "#AAAA",
      }}
    />;
  }
};

export default function ConfiguredView() {
  let { id } = useParams();
  const [configured, setConfigured] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [typeStatus, setTypeStatus] = useState('');

  const getData = async () => {
    const data = await configuredData.find((item) => item.id === id);
    setConfigured(data);
  };

  const getonu_detail = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/onu/${id}`);
      if (data.status === "success") {
        setConfigured(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getStatus = async (type) => {
    setLoadingStatus(true);
    setTypeStatus(type);
  }

  useEffect(() => {
    getonu_detail()
  }, [id]);

  // useEffect(() => getData(), []);
  return (
    <Container>
      <Stack direction="column" sx={{ mb: 5 }}>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 3,
            pb: 2,
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <Grid item xs={12} md={6}>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" } }}
                    >
                      <b>OLT</b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "end", md: "start" } }}
                    >
                      <LaunchIcon
                        sx={{
                          color: "#217dbb",
                          fontSize: "16px",
                          mt: 0.9,
                          mr: 2,
                          ml: 0.5,
                        }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    <b>{`${configured.name_olt}`}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" } }}
                    >
                      <b>Board</b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "end", md: "start" } }}
                    >
                      <LaunchIcon
                        sx={{
                          color: "#217dbb",
                          fontSize: "16px",
                          mt: 0.9,
                          mr: 2,
                          ml: 0.5,
                        }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    <b>{`${configured.board}`}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" } }}
                    >
                      <b>Port</b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "end", md: "start" } }}
                    >
                      <LaunchIcon
                        sx={{
                          color: "#217dbb",
                          fontSize: "16px",
                          mt: 0.9,
                          mr: 2,
                          ml: 0.5,
                        }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    <b>{`${configured.port}`}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" }, mr: 4.5 }}
                    >
                      <b>ONU</b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    <b>{`${configured.onu}`}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" }, mr: 4.5 }}
                    >
                      <b>SN</b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    <b>{`${configured.sn}`}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" } }}
                    >
                      <b>ONU type</b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "end", md: "start" } }}
                    >
                      <LaunchIcon
                        sx={{
                          color: "#217dbb",
                          fontSize: "16px",
                          mt: 0.9,
                          mr: 2,
                          ml: 0.5,
                        }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    <b>{`${configured.onutype}`}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" } }}
                    >
                      <b>Zone</b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "end", md: "start" } }}
                    >
                      <LaunchIcon
                        sx={{
                          color: "#217dbb",
                          fontSize: "16px",
                          mt: 0.9,
                          mr: 2,
                          ml: 0.5,
                        }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    {/* <b>{`${configured.Zone}`}</b> */}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" } }}
                    >
                      <b>Port</b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "end", md: "start" } }}
                    >
                      <LaunchIcon
                        sx={{
                          color: "#217dbb",
                          fontSize: "16px",
                          mt: 0.9,
                          mr: 2,
                          ml: 0.5,
                        }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    {/* <b>{`${configured.Port}`}</b> */}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" }, mr: 4.5 }}
                    >
                      <b>ODB (Splitter)</b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    {/* <b>{`${configured["ODB"]}`}</b> */}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" }, mr: 4.5 }}
                    >
                      <b>Address or comment</b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    {/* <b>{`${configured["Address or comment"]}`}</b> */}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" }, mr: 4.5 }}
                    >
                      <b>Authorization date</b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    {/* <b>{`${configured["Auth date"]}`}</b> */}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: { xs: "space-between", md: "end" },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: { xs: "start", md: "end" }, mr: 4.5 }}
                    >
                      <b>ONU external ID</b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    textAlign="start"
                    sx={{ color: "#217dbb" }}
                  >
                    {/* <b>{`${configured["SN / MAC"]}`}</b> */}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="column">
              <Stack direction="row" justifyContent="center">
                <Typography variant="h5" sx={{ mb: 1 }} textAlign="center">
                  <b>Detail</b>
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <img src="https://atelfiber.smartolt.com/content/img/1_eth_0_voip_0_catv.png" />
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        textAlign: "end",
                        fontSize: { md: "16px", xs: "14px" },
                        mr: 4.5,
                      }}
                    >
                      <b>Status</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "start",
                        fontSize: { md: "16px", xs: "14px" },
                      }}
                    >
                      {/* {configured["StatusDetail"] !== null &&
                        `${configured.runstate}`
                        getStatusIcon(configured.runstate)
                        }  */}

                      {configured.runstate?.charAt(0).toUpperCase() +
                        configured.runstate?.slice(1).toLowerCase()}
                      {StatusIcon(configured.runstate)}
                      {configured["StatusDetail"] !== null &&
                        `(${configured["StatusDetail"]})`}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        textAlign: "end",
                        fontSize: { md: "16px", xs: "14px" },
                        mr: 4.5,
                      }}
                    >
                      <b>ONU/OLT Rx signal</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "start",
                        fontSize: { md: "16px", xs: "14px" },
                      }}
                    >
                      {/* {configured["ONU/OLT Rx signal"]} */}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        textAlign: "end",
                        fontSize: { md: "16px", xs: "14px" },
                        mr: 4.5,
                      }}
                    >
                      <b>Attached VLANs</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      className="pointer"
                      variant="subtitle1"
                      sx={{
                        textAlign: "start",
                        color: "#217dbb",
                        fontSize: { md: "16px", xs: "14px" },
                      }}
                    >
                      {/* {configured["VLAN"]} */}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        textAlign: "end",
                        fontSize: { md: "16px", xs: "14px" },
                        mr: 4.5,
                      }}
                    >
                      <b>ONU mode</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      className="pointer"
                      variant="subtitle1"
                      sx={{
                        textAlign: "start",
                        color: "#217dbb",
                        fontSize: { md: "16px", xs: "14px" },
                      }}
                    >
                      {/* {configured["ONU mode"]} */}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        textAlign: "end",
                        fontSize: { md: "16px", xs: "14px" },
                        mr: 4.5,
                      }}
                    >
                      <b>Mgmt IP</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      className="pointer"
                      variant="subtitle1"
                      sx={{
                        textAlign: "start",
                        color: "#217dbb",
                        fontSize: { md: "16px", xs: "14px" },
                      }}
                    >
                      {/* {configured["Mgmt IP"]} */}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
              {/* {configured["WAN setup mode"] !== null && (
                <Stack direction="row" justifyContent="center">
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          textAlign: "end",
                          fontSize: { md: "16px", xs: "14px" },
                          mr: 4.5,
                        }}
                      >
                        <b>WAN setup mode</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        className="pointer"
                        variant="subtitle1"
                        sx={{
                          textAlign: "start",
                          color: "#217dbb",
                          fontSize: { md: "16px", xs: "14px" },
                        }}
                      >
                        {configured["WAN setup mode"]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              )} */}
            </Stack>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={1}>
          <Grid item xs={12} md={6} lg={2}>
            <LoadingButton
              onClick={() => getStatus('status')}
              loading={loadingStatus}
              fullWidth
              size="small"
              loadingPosition="end"
              variant="contained"
            >
              <span>Get Status</span>
            </LoadingButton>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
            >
              Show running-config
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
              onClick={() => getStatus('swinfo')}
            >
              SW Info
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="success"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
            >
              LIVE !
            </Button>
          </Grid>
        </Grid>
        {loadingStatus &&
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <CardStatus typeStatus={typeStatus} onuID={id} />
            </Grid>
          </Grid>
        }
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              Traffic/Signal
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
              justifyContent="center"
            >
              {/* <img
                src={configured["traffic img"]}
                style={{ marginRight: "1px" }}
                width="auto"
              />
              <img src={configured["signal img"]} width="auto" /> */}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              Speed profiles
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: 0,
                  border: "1px solid #ecf0f1",
                  bgcolor: "#f9f9f9",
                  borderRadius: "0px",
                  width: { xs: "100%", sm: "100%", lg: "79%" },
                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{}} align="left">
                        Service-port ID
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        User-VLAN
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        Download
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        Upload
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {/* {configured["Service-port ID"]} */}
                      </TableCell>
                      {/* <TableCell align="left">{configured["VLAN"]}</TableCell> */}
                      <TableCell align="left">
                        {/* {configured["Download"]} */}
                      </TableCell>
                      {/* <TableCell align="left">{configured["Upload"]}</TableCell> */}
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          size="small"
                          color="warning"
                          sx={{ boxShadow: "0", borderRadius: "3px" }}
                        >
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              Ethernet ports
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: 0,
                  border: "1px solid #ecf0f1",
                  bgcolor: "#f9f9f9",
                  borderRadius: "0px",
                  width: { xs: "100%", sm: "100%", lg: "79%" },
                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{}} align="left">
                        Port
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        Admin state
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        Mode
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        DHCP
                      </TableCell>
                      <TableCell sx={{}} align="left">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                  {
                     configured['EthernalAll']?.map((item, index) => {
                      return <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item["EthernetPort"]}
                      </TableCell>
                      <TableCell align="left">
                        {item["Admin state"]}
                      </TableCell>
                      <TableCell align="left">{item["Mode"]}</TableCell>
                      <TableCell align="left">{item["DHCP"]}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          size="small"
                          color="warning"
                          sx={{ boxShadow: "0", borderRadius: "3px" }}
                        >
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                    })
                  }
                    
                  </TableBody> */}
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={1}>
          <Grid item xs={12} md={6} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="warning"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
            >
              <RefreshIcon
                fontSize="small"
              />
              Reboot
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="warning"
              sx={{ bgcolor: "#FFCC00", boxShadow: 0, borderRadius: "3px" }}
            >
              <RefreshIcon
                fontSize="small"
              />
              Resync config
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="warning"
              sx={{ bgcolor: "#FFCC00", boxShadow: 0, borderRadius: "3px" }}
            >
              <RefreshIcon
                fontSize="small"
              />
              Restore default
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="warning"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
            >
              Disable ONU
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="danger"
              sx={{ boxShadow: 0, borderRadius: "3px" }}
            >
              <DeleteIcon
                fontSize="small"
              />
              Delete
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
