import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react'
import Address from './../../../customer/pages/Account/components/Address/Address';
import PersonalDetails from './components/PersonalDetails/PersonalDetails';
import BusinessDetails from './components/BusinessDetails/BusinessDetails';
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const accountTabs = [
  {label : "Personal Details", render: <PersonalDetails/>},
  {label: "Business Details", render: <BusinessDetails/>},
  {label: "Bank Details", render: <div>Bank Details</div>},
  {label: "Pickup Address", render: <div>Pickup Address</div>}
];

const Account = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }
  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {accountTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
        {accountTabs.map((tab, index) => (
          <TabPanel
            key={index}
            value={value}
            index={index}
            dir={theme.direction}
          >
            <div className='text-center text-2xl text-[var(--primary-color)] font-semibold mb-8'>
              {tab.label}
            </div>
            {tab.render}
          </TabPanel>
        ))}
      </Box>
  )
}

export default Account