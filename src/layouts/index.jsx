import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComp from "../components/layouts/drawer";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { hostname } from "../hostname";
import Store from "../redux/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const textColorWhite = "white"

const pathToState = [
  {
    path: "/",
    value: 0,
  },
  {
    path: "/unconfigured",
    value: 1,
  },
  {
    path: "/configured",
    value: 2,
  },
  {
    path: "/graphs",
    value: 3,
  },
  {
    path: "/diagnostics",
    value: 4,
  },
  {
    path: "/report/authorization",
    value: 5,
  },
  {
    path: "/report/export",
    value: 5,
  },
  {
    path: "/report/import",
    value: 5,
  },
  {
    path: "/save-config",
    value: 6,
  },
  {
    path: "/setting/zones",
    value: 7,
  },
  {
    path: "/setting/odbs",
    value: 7,
  },
  {
    path: "/setting/onu-types",
    value: 7,
  },
  {
    path: "/setting/speed-profiles",
    value: 7,
  },
  {
    path: "/setting/olts/vpn",
    value: 7,
  },
  {
    path: "/setting/general",
    value: 7,
  },
  {
    path: "/setting/billing",
    value: 7,
  },
];

const Header = () => {
  const navigate = useNavigate();
  const [beforeValue, setBeforeValue] = useState(null);
  const [reportDropdown, setReportDropdown] = useState(null);
  const [settingDropdown, setSettingDropdown] = useState(null);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  let permission = Store?.getState().permission;
  let role = Store?.getState().role;
  const getStateToNav = async () => {

    const { value } = await pathToState.find(
      (item) => item.path === window.location.pathname
    );
    await Store.dispatch({ type: "SET_PAGE", payload: value });
    return value;
  };

  const handleReportTabClick = (event) => {
    setReportDropdown(event.currentTarget);
  };

  const handleSettingTabClick = (event) => {
    setSettingDropdown(event.currentTarget);
  };

  const handleMenuClose = () => {
    setReportDropdown(null);
    setSettingDropdown(null);
    Store.dispatch({ type: "SET_PAGE", payload: beforeValue });
  };

  const handleOnClickMenu = () => {
    setReportDropdown(null);
    setSettingDropdown(null);
  };

  const onLogOut = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/auth/logout`);
      if (data.status === "success") {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <AppBar
        sx={{
          // background: `linear-gradient(290deg, #620000 0%, #c16100 100%)`,
          // background: `#ed7117`,
          backgroundImage: `url(${"/images/login-img.avif"})`,
          backgroundPosition: "start",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "47px",
          boxShadow: 0,
          mt: -0.1,
        }}
      >
        <Toolbar sx={{ mt: { md: -1, xs: -0.5, sm: -1 } }}>
          <img
            className="pointer"
            src="/images/company/S__30949567-removebg-preview.png"
            width={105}
            style={{ height: "47px" }}
            onClick={() => navigate("/")}
          />
          {/* <Typography variant="h5" sx={{ color: "#FFF" }}>
            LOGO
          </Typography> */}
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: '0', color: 'white' }}
                indicatorColor="warning"
                textColor="secondary"
                value={Store.getState().page}
                defaultValue={getStateToNav()}
                onChange={(e, value) => {
                  setBeforeValue(Store.getState().page);
                  Store.dispatch({ type: "SET_PAGE", payload: value });
                }}
              >
                <Tab
                  label="Home"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    textDecoration:
                      Store.getState().page !== 0 ? "none" : "underline",
                  }}
                  onClick={() => navigate("/")}
                />
                <Tab
                  label="Unconfigured"
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    textDecoration:
                      Store.getState().page !== 1 ? "none" : "underline",
                  }}
                  onClick={() => navigate("/unconfigured")}
                />
                <Tab
                  label="Configured"
                  sx={{
                    color: "#ffffff",
                    fontSize: "15px",
                    textDecoration:
                      Store.getState().page !== 2 ? "none" : "underline",
                  }}
                  onClick={() => navigate("/configured")}
                />
                <Tab
                  label="Graphs"
                  sx={{
                    color: "#ffffff",
                    fontSize: "15px",
                    textDecoration:
                      Store.getState().page !== 3 ? "none" : "underline",
                  }}
                  onClick={() => navigate("/graphs")}
                />
                <Tab
                  label="Diagnostics"
                  sx={{
                    color: "#ffffff",
                    textDecoration:
                      Store.getState().page !== 4 ? "none" : "underline",
                    fontSize: "15px",
                  }}
                  onClick={() => navigate("/diagnostics")}
                />
                <Tab
                  label={
                    <Stack direction="row">
                      <Typography
                        sx={{
                          mt: 0.1,
                          fontSize: "15px",
                          textDecoration:
                            Store.getState().page !== 5 ? "none" : "underline",
                          color: "#ffffff",
                          ml: 1,
                        }}
                      >
                        Reports
                      </Typography>
                      <ArrowDropDownIcon
                        sx={{
                          mt: -0.1,
                          color: "#ffffff",
                        }}
                      />
                    </Stack>
                  }
                  sx={{}}
                  aria-controls="tab-report"
                  aria-haspopup="true"
                  onClick={handleReportTabClick}
                />
                <Tab
                  label="Save Config"
                  sx={{
                    color: "#ffffff",
                    fontSize: "15px",
                    textDecoration:
                      Store.getState().page !== 6 ? "none" : "underline",
                  }}
                />

                <Tab
                  label={
                    <Stack direction="row">
                      <Typography
                        sx={{
                          mt: 0.1,
                          ml: 1,
                          fontSize: "15px",
                          textDecoration:
                            Store.getState().page !== 7 ? "none" : "underline",
                          color: "#ffffff",
                        }}
                      >
                        Settings
                      </Typography>
                      <ArrowDropDownIcon
                        sx={{
                          mt: -0.1,
                          color: "#ffffff",
                        }}
                      />
                    </Stack>
                  }
                  sx={
                    {
                      // background: Store.getState().page !== 7 ? "" : "#FFF",
                    }
                  }
                  aria-controls="tab-setting"
                  aria-haspopup="true"
                  onClick={handleSettingTabClick}
                />
              </Tabs>
              <Menu
                id="tab-report"
                anchorEl={reportDropdown}
                keepMounted
                open={Boolean(reportDropdown)}
                onClose={handleMenuClose}
                sx={{ boxShadow: 0 }}
                PaperProps={{
                  style: {
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/report/authorization");
                    handleOnClickMenu();
                  }}
                >
                  Authorization
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/report/export");
                    handleOnClickMenu();
                  }}
                >
                  Export
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/report/import");
                    handleOnClickMenu();
                  }}
                >
                  Import
                </MenuItem>
              </Menu>
              <Menu
                id="tab-setting"
                anchorEl={settingDropdown}
                keepMounted
                open={Boolean(settingDropdown)}
                onClose={handleMenuClose}
                sx={{ boxShadow: 0 }}
                PaperProps={{
                  style: {
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/setting/zones");
                    handleOnClickMenu();
                  }}
                >
                  Zones
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/setting/odbs");
                    handleOnClickMenu();
                  }}
                >
                  ODBs
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/setting/onu-types");
                    handleOnClickMenu();
                  }}
                >
                  ONU types
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/setting/olts");
                    handleOnClickMenu();
                  }}
                >
                  OLTs
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/setting/vpn");
                    handleOnClickMenu();
                  }}
                >
                  VPN & TR069
                </MenuItem>
                {(permission?.includes("general-page") || role === "SU") && (
                  <MenuItem
                    onClick={() => {
                      navigate("/setting/general");
                      handleOnClickMenu();
                    }}
                  >
                    General
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    navigate("/setting/billing");
                    handleOnClickMenu();
                  }}
                >
                  Billing
                </MenuItem>
              </Menu>
              <Button
                size="small"
                sx={{ boxShadow: 0, borderRadius: "3px", marginLeft: "auto" }}
                variant="contained"
                color="danger"
                onClick={onLogOut}
              >
                <PowerSettingsNewIcon
                  fontSize="small"
                  sx={{ mr: 0.5, fontWeight: "bold" }}
                />
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Stack direction="column" sx={{ mt: 6 }}>
        <Outlet />
      </Stack>
    </React.Fragment>
  );
};

export default Header;
