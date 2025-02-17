import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { colors } from "../../../../../data/filter/colors";

const FilterSection = () => {
  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r border-gray-200">
        <p className="text-lg font-semibold">Filters</p>
        <Button size="small" className="text-cyan-600 font-semibold">
          Clear All
        </Button>
      </div>
      <Divider />
      <FormControl>
        <FormLabel sx={{color: 'var(--primary-color)',
          fontWeight: 'bold',
          fontSize: '16px',
          pb: '14px'
        }} id="colors">Colors</FormLabel>
        <RadioGroup
          aria-labelledby="colors"
          defaultValue=""
          name="colors"
          color="var(--primary-color)"
          
        >
          {
            colors.map((item)=><FormControlLabel value="female" control={<Radio />} label="Female" />)
          }
          
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default FilterSection;
