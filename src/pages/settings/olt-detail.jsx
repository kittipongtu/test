import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Container, Tab, Typography, Box } from '@mui/material';
import Oltcard from "../../components/olt_details/olt-card";
import SpeedProfile from "../../pages/settings/speed-profiles";
import OltDetail from "../../components/olt_details";
import PonPort from "../../components/olt_details/pon-port";
import Vlans from "../vlans";
import { useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    tab: { 
        '& #simple-tabpanel-3': {
          padding: '0px',
          },
        },
    }));

export default function BasicTabs() {
    const location = useLocation();
    const [value, setValue] = React.useState(0);
    const { id } = location.state;
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ mt: 3 }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="OLT details" {...a11yProps(0)} />
                        <Tab label="Speed Profile" {...a11yProps(1)} />
                        <Tab label="OLT cards" {...a11yProps(2)} />
                        <Tab label="PON ports" {...a11yProps(3)} />
                        <Tab label="VLANs" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <OltDetail olt_id={id} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <SpeedProfile oltId={id} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Oltcard olt_id={id} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <PonPort olt_id={id} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <Vlans olt_id={id}/>
                </CustomTabPanel>
            </Box>
        </Container>

    );
}
