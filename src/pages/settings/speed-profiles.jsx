import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Download from "../../components/speed-profiles/download";
import Upload from "../../components/speed-profiles/upload";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SpeedProfiles(props) {
  const { oltId } = props;
  const [value, setValue] = React.useState(0);
  const [profile_name, setProfile_name] = React.useState('')
  const [suffixprefix, setSuffixprefix] = React.useState(false)
  const [speed, setSpeed] = React.useState('')
  const [defaultspeed, setDefaultspeed] = React.useState(false)
  const [type, setType] = React.useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container sx={{ mt: 1 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
            >
              <Tab label="download" {...a11yProps(0)} />
              <Tab label="upload" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Download
              profile_name={profile_name}
              setProfile_name={setProfile_name}
              oltId={oltId}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Upload />
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
