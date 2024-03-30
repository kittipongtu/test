import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Box';
import Grid from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import SitePage from '../settings/general/site'
import RolePage from '../settings/general/role/role'
import PermissionPage from '../settings/general/permission'
import UsersPage from '../settings/general/users'
import RestrictionGroupPage from '../settings/general/restriction-group'
import axios from 'axios';
import  { hostname } from "../../hostname";
import Store from "../../redux/store";
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

export default function General() {
    const [value, setValue] = React.useState('');
    const [zonelist, setZonelist] = React.useState([]);
    const [oltlist, setOltlist] = React.useState([]);
    let permission = Store?.getState().permission;
    let role = Store?.getState().role;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getZone = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/zone`);
            if (data.status === "success") {
                setZonelist(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getolt = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/olt`);
            if (data.status === "success") {
                setOltlist(data.results)
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getZone()
        getolt()
    }, []);

    return (
        <>
            <Stack
                direction="column"
                sx={{ mt: { md: -13, xs: -1 }, p: { md: 15, xs: 3 } }}
            >
                <Grid container spacing={2}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {(permission?.includes("site-tab") || role === "SU") && (
                                    <Tab label="Site" value="1" />
                                )}
                                {(permission?.includes("role-tab") || role === "SU") && (
                                    <Tab label="Role" value="2" />
                                )}
                                {(permission?.includes("permission-tab") || role === "SU") && (
                                    <Tab label="Permission" value="3" />
                                )}
                                {(permission?.includes("users-tab") || role === "SU") && (
                                    <Tab label="Users" value="4" />
                                )}
                                {(permission?.includes("sirestriction_groupe-tab") || role === "SU") && (
                                    <Tab label="Restriction group" value="5" />
                                )}
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <SitePage />
                        </TabPanel>
                        <TabPanel value="2">
                            <RolePage />
                        </TabPanel>
                        <TabPanel value="3">
                            <PermissionPage />
                        </TabPanel>
                        <TabPanel value="4">
                            <UsersPage />
                        </TabPanel>
                        <TabPanel value="5">
                            <RestrictionGroupPage zoneList={zonelist} oltList={oltlist} />
                        </TabPanel>
                    </TabContext>
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Site" {...a11yProps(1)} />
                            <Tab label="Role" {...a11yProps(2)} />
                            <Tab label="Permission" {...a11yProps(3)} />
                            <Tab label="Users" {...a11yProps(4)} />
                            <Tab label="Restriction group" {...a11yProps(5)} />
                        </Tabs>
                    </Box>
                    <TabPanel value="1">
                        <SitePage />
                    </TabPanel>
                    <TabPanel value="2">
                        <RolePage />
                    </TabPanel>
                    <TabPanel value="3">
                        <PermissionPage />
                    </TabPanel>
                    <TabPanel value="4">
                        <UsersPage />
                    </TabPanel>
                    <TabPanel value="5">
                        <RestrictionGroupPage zoneList={zonelist} oltList={oltlist} />
                    </TabPanel> */}
                </Grid>
            </Stack>
        </>
    )
}