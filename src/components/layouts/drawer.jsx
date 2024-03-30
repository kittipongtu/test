import React, { useState } from "react";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router";
import Store from "../../redux/store";
import axios from "axios";
import { hostname } from "../../hostname";

const pages = [
  { name: "Home", page: "/" },
  { name: "Unconfigured", page: "/unconfigured" },
  { name: "Configured", page: "/configured" },
  { name: "Graphs", page: "/graphs" },
  { name: "Diagnostics", page: "/diagnostics" },
  { name: "Reports" },
  { name: "Save Config" },
  { name: "Settings" },
];
const DrawerComp = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

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
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Stack
          direction="column"
          sx={{ height: "100%", justifyContent: "space-between" }}
        >
          <Stack direction="row" justifyContent="center" sx={{ mb: -26, ml: -2.5}}>
            <img src="/images/company/S__30949566.jpg" width={200} />
          </Stack>
          <List sx={{ width: "250px" }}>
            {pages.map((value, index) => (
              <ListItemButton
                key={index}
                onClick={() => {
                  navigate(value.page || "/");
                  setOpenDrawer(false);
                  Store.dispatch({ type: "SET_PAGE", payload: index });
                }}
              >
                <ListItemIcon sx={{ p: -2 }}>
                  <ListItemText>{value.name}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
          <Stack direction="row" sx={{ justifyContent: "center", m: 1 }}>
            <Button
              size="small"
              sx={{ boxShadow: 0, borderRadius: "3px", marginLeft: "auto" }}
              variant="contained"
              color="danger"
              onClick={onLogOut}
            >
              <PowerSettingsNewIcon fontSize="small" sx={{ mr: 0.5 }} />
              Logout
            </Button>
          </Stack>
        </Stack>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
