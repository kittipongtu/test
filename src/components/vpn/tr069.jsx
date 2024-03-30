import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack } from "@mui/material";

export default function TR069() {
  return (
    <div style={{}}>
      <Accordion
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ bgcolor: "#ECF0F1" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>INFO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">
            In order to use TR069 protocol in your network you must have a VPN
            tunnel configured and a TR069 profile defined and attached to each
            OLT where you want this service to be avaliable.
            <br />
            <br />
            For each ONU you must select the configured profile in order to
            activate TR069. The profile contains just the minimum info required
            and customizable to the user and we autocomplete the form with the
            recommended settings, making things as easy as possible.
            <br />
            <br />
          </Typography>
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
            Defined profiles
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>No TR069 profile defined yet!</Typography>
          <Button variant="contained" size="small" color="success" sx={{ mt: 4, boxShadow: 0, borderRadius: "3px" }}><b>Add a new profile</b></Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
