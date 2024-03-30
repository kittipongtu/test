import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack } from "@mui/material";

export default function VPNSetting() {
  return (
    <div>
      <Accordion
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          defaultChecked={true}
          sx={{ bgcolor: "#ECF0F1" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>INFO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">
            VPN tunnels use Open VPN to establish a secure L3 tunnel between
            your site and SmartOLT server.
            <br />
            <br />
            Your endpoint has to be a device from which you have access to all
            your ONU/OLT devices and which supports OpenVPN client, preferably a
            Mikrotik/RouterOS gateway.
            <br />
            <br />
            The tunnel subnet must be an unused private /24 subnet, routed
            inside your network. You can use the default 10.69.69.0/24 if it's
            not yet allocated inside your network.
            <br />
            <br />
            If you have multiple sites that are not interconnected and you have
            no route exchange between sites, you must setup a tunnel for each
            site to route the management subnets you have in each site.
            <br />
            <br />
            If your address space for ONU management is overlapping between
            sites please contact technical support.
            <br />
            <br />
            TR069 flow diagram:
          </Typography>
          <Stack direction="row" justifyContent="center">
            <img src="https://atelfiber.smartolt.com/content/img/TR069_flow.png" />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={{ bgcolor: "#ECF0F1" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Tunnel Status
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>No tunnel setup yet!</Typography>
          <Button
            variant="contained"
            size="small"
            color="success"
            sx={{ mt: 4, boxShadow: 0, borderRadius: "3px" }}
          >
            <b>Create a new tunnel</b>
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
