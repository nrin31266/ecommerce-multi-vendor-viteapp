import { Button } from "@mui/material";
import React, { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DealTable from "./components/DealTable/DealTable";
import DealCategoryTable from "./components/DealCategoryTable/DealCategoryTable";
import CreateDealForm from "./components/CreateDealForm/CreateDealForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tags = ["Deals", "Categories", "Create Deal"];

const Deals = () => {
  const [active, setActive] = useState(tags[0]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActive(newValue);
  };
  return (
    <div>
       <div>
       <Tabs value={active} onChange={handleChange} 
          textColor="inherit"
>
          {
            tags.map((tag, index) => (
              <Tab
                key={index}
                label={tag}
                value={tag}
              />))
          }
        </Tabs>
       </div>
       <div className="mt-5">
        {
          active === "Deals" && <DealTable />
        }
        {
          active === "Categories" && <DealCategoryTable />
        }
        {
          active === "Create Deal" && <CreateDealForm />
        }
       </div>
    </div>
  );
};

export default Deals;
