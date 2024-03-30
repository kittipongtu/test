import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { HomeCard } from "../components/home/home-card";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import StorageIcon from "@mui/icons-material/Storage";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorIcon from "@mui/icons-material/Error";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoIcon from "@mui/icons-material/Info";
import ColumnChart from "../utils/apexcharts/column-charts";
import AreaChart from "../utils/apexcharts/area-charts";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useEffect } from "react";
import axios from "axios";
import { hostname } from "../hostname";

const styles = {
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    boxSizing: "border-box",
  },
  chart: {
    width: "100%",
    height: "100%",
  },
};

const OLTsData = [
  { name: "TH-MDH-DNS-02", status: "192 days, 09:13,", temp: 53 },
  { name: "OLT-Parnter-A", status: "8 days, 11:46,", temp: 36 },
];

const InfoData = [
  { info: "Auto configuration backup saved", createdAt: "5 hours ago" },
  {
    info: "ONU HWTCE61A3C4A gpon-onu_0/0/7:14 deleted",
    createdAt: "7 hours ago",
  },
  {
    info: "ONU HWTC0A4879A2 gpon-onu_0/0/2:74 deleted",
    createdAt: "7 hours ago",
  },
  { info: "gpon-onu_0/0/7:8 CATV disabled", createdAt: "7 hours ago" },
  {
    info: "gpon-onu_0/0/7:8 ONU HWTC02563FA6 gpon-onu_0/0/7:8 authorized",
    createdAt: "7 hours ago",
  },
  { info: "Auto configuration backup saved", createdAt: "1 day ago" },
  { info: "Auto configuration backup saved", createdAt: "2 days ago" },
  {
    info: "ONU HWTC413CE830 gpon-onu_0/0/6:1 deleted",
    createdAt: "3 days ago",
  },
  { info: "gpon-onu_0/0/6:19 CATV disabled", createdAt: "3 days ago" },
  {
    info: "gpon-onu_0/0/6:19 ONU HWTCBF11CCA8 gpon-onu_0/0/6:19 authorized",
    createdAt: "3 days ago",
  },
];

const boxShadow =
  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px";

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: 1,
          maxWidth: "1300px",
        }}
      >
        <Stack direction="column" sx={{ mb: 7 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} lg={3}>
              <HomeCard
                value={20}
                color="#0064C8"
                topText="Waiting autholization"
                topValue={20}
                buttomLeft="EPON:0"
                buttomRight="GPON:0"
                logo={<AutoFixHighIcon sx={{ fontSize: "65px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <HomeCard
                value={20}
                color="#4DB14B"
                topText="Online"
                topValue={0}
                buttomLeft="Total authorized:1"
                buttomRight=""
                logo={<StorageIcon sx={{ fontSize: "65px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <HomeCard
                value={20}
                color="#4C4B4B"
                topText="Total Offline"
                topValue={0}
                buttomLeft="PwrFail: - Los: -"
                buttomRight="N/A:-"
                logo={<ClearIcon sx={{ fontSize: "65px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <HomeCard
                value={20}
                color="#ED7117"
                topText="Low Signals"
                topValue={0}
                buttomLeft="Warning:-"
                buttomRight="Crutucal:-"
                logo={<ErrorIcon sx={{ fontSize: "65px" }} />}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 1 }} spacing={2}>
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  height: "auto",
                  borderRadius: "4px",
                  boxShadow: boxShadow,
                  mt: 2,
                }}
              >
                <Card
                  sx={{
                    height: "30px",
                    borderRadius: "0px",
                    boxShadow: 0,
                    p: 0.5,
                    bgcolor: "#4C4B4B",
                    color: "#FFF",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row">
                      <SignalCellularAltIcon />
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                        Network status
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                        More graphs
                      </Typography>
                      <ArrowDropDownIcon sx={{ mt: 0.4 }} />
                    </Stack>
                  </Stack>
                </Card>
                <Stack sx={{ width: "auto" }}>
                  <Box style={styles.card}>
                    <div style={styles.chart}>
                      <AreaChart />
                    </div>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "auto",
                  borderRadius: "4px",
                  boxShadow: boxShadow,
                  mt: 2,
                }}
              >
                <Card
                  sx={{
                    height: "30px",
                    borderRadius: "0px",
                    boxShadow: 0,
                    p: 0.5,
                    bgcolor: "#4C4B4B",
                    color: "#FFF",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row">
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                        OLTs
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                        All
                      </Typography>
                      <ArrowDropDownIcon sx={{ mt: 0.4 }} />
                    </Stack>
                  </Stack>
                </Card>
                <Stack
                  direction="column"
                  sx={{ m: 2, justifyContent: "center" }}
                >
                  <List
                    sx={{
                      width: "100%",
                      m: 0,
                      p: 0,
                      borderRadius: "4px",
                      border: ".5px solid rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {OLTsData.map((value) => (
                      <ListItem
                        key={value}
                        disableGutters
                        sx={{ border: ".5px solid rgba(0, 0, 0, 0.05)" }}
                        className="pointer"
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{ width: "100%", mx: 1 }}
                          spacing={1}
                        >
                          <Stack direction="row">
                            <SettingsSuggestIcon sx={{ color: "#555555" }} />
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "#555555", mt: 0.5 }}
                            >
                              {value.name}
                            </Typography>
                          </Stack>
                          <Stack direction="row">
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "#555555",
                                fontStyle: "italic",
                                mt: 0.5,
                                mr: 1,
                              }}
                            >
                              {value.status}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: value.temp >= 45 ? "orange" : "#555555",
                                
                                fontStyle: "italic",
                                mt: 0.5,
                              }}
                            >
                              {value.temp}°C
                            </Typography>
                          </Stack>
                        </Stack>
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  height: "auto",
                  borderRadius: "4px",
                  boxShadow: boxShadow,
                  mt: 2,
                }}
              >
                <Card
                  sx={{
                    height: "30px",
                    borderRadius: "0px",
                    boxShadow: 0,
                    p: 0.5,
                    bgcolor: "#4C4B4B",
                    color: "#FFF",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row">
                      <SignalCellularAltIcon />
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                        ONU authorizations per day
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                <Stack sx={{ width: "auto" }}>
                  <Box style={styles.card}>
                    <div style={styles.chart}>
                      <ColumnChart />
                    </div>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "auto",
                  borderRadius: "4px",
                  boxShadow: boxShadow,
                  mt: 2,
                }}
              >
                <Card
                  sx={{
                    height: "30px",
                    borderRadius: "0px",
                    boxShadow: 0,
                    p: 0.5,
                    bgcolor: "#4C4B4B",
                    color: "#FFF",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row">
                      <InfoIcon fontSize="small" sx={{ mt: 0.5 }} />
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                        Info
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                <Stack
                  direction="column"
                  sx={{ m: 2, justifyContent: "center" }}
                >
                  <List
                    sx={{
                      width: "100%",
                      m: 0,
                      p: 0,
                      borderRadius: "4px",
                      border: ".5px solid rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {InfoData.map((value) => (
                      <ListItem
                        key={value.info}
                        disableGutters
                        sx={{ border: ".5px solid rgba(0, 0, 0, 0.05)" }}
                        className="pointer"
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{ width: "100%", mx: 1 }}
                          spacing={1}
                        >
                          <Stack direction="row">
                            <SettingsSuggestIcon sx={{ color: "#555555" }} />
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "#555555",
                                mt: 0.5,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: {
                                  md: "160px",
                                  sm: "120px",
                                  xs: "200px",
                                },
                                whiteSpace: "nowrap",
                              }}
                            >
                              {value.info}
                            </Typography>
                          </Stack>
                          <Stack direction="row">
                            <Typography
                              variant="subtitle2"
                              sx={{
                                textAlign: "end",
                                color: "#555555",
                                fontStyle: "italic",
                                mt: 0.5,
                                mr: 1,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: {
                                  md: "100px",
                                  sm: "40px",
                                  xs: "60px",
                                },
                              }}
                              noWrap
                            >
                              {value.createdAt}
                            </Typography>
                          </Stack>
                        </Stack>
                      </ListItem>
                    ))}
                  </List>
                    <Stack direction="row" sx={{ width: "100%", justifyContent: "center" }}>
                    <Button variant="contained" color="success" size="small" fullWidth sx={{ mt: 1, borderRadius: "4px", boxShadow: 0 }}>View All Info</Button>
                    </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}
