import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../../../../data/filter/colors";
import { priceRanges } from "../../../../../data/filter/price";
import { discounts } from "../../../../../data/filter/discounts";
import { useSearchParams } from "react-router-dom";

interface FilterSectionProps {
  filterValues: Record<string, string>;
  onClearFilter: () => void;
  onAddFilterValue: (name: string, value: string) => void;
}

const FilterSection = ({
  filterValues,
  onAddFilterValue,
  onClearFilter,
}: FilterSectionProps) => {
  const [expandColor, setExpandColor] = useState(false);

  const updateFilterParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    onAddFilterValue(name, value);
  };

  const clearAllFilter = () => {
    onClearFilter();
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r border-gray-200">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={clearAllFilter}
          size="small"
          className="text-cyan-600 font-semibold"
        >
          Clear All
        </Button>
      </div>
      <Divider />
      <div className="lg:border-r-1 border-gray-200">
        
        <div className="px-9 space-y-9 ">
          <section>
            <FormControl>
              <FormLabel
                sx={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "16px",
                  pb: "14px",
                }}
                id="colors"
              >
                Color
              </FormLabel>
              <RadioGroup
                onChange={updateFilterParam}
                aria-labelledby="color"
                defaultValue=""
                name="color"
                color="var(--primary-color)"
                value={filterValues.colors ?? ""}
              >
                {colors
                  .slice(0, expandColor ? colors.length : 5)
                  .map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.hex}
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-1">
                          <p>{item.name}</p>
                          <div
                            className={`h-5 w-5 rounded-full ${
                              item.name === "White" && "border border-gray-200"
                            }`}
                            style={{ backgroundColor: item.hex }}
                          >
                            {" "}
                          </div>
                        </div>
                      }
                    />
                  ))}
              </RadioGroup>
            </FormControl>
            <div>
              <button
                onClick={() => setExpandColor((pre) => !pre)}
                className="text-[15px] flex items-center text-[var(--primary-color)] 
            hover:text-cyan-800 cursor-pointer"
              >
                {expandColor ? "hide" : `+${colors.length - 5} more`}
              </button>
            </div>
          </section>
        </div>
        <Divider />
        <div className="px-9 space-y-9">
          <section>
            <FormControl>
              <FormLabel
                sx={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "16px",
                  pb: "14px",
                }}
                id="colors"
              >
                Price Range
              </FormLabel>
              <RadioGroup
                onChange={updateFilterParam}
                aria-labelledby="price-range"
                defaultValue=""
                name="price-range"
                color="var(--primary-color)"
                value={
                  filterValues.minimumPrice && filterValues.maximumPrice
                    ? filterValues.minimumPrice +
                      "-" +
                      filterValues.maximumPrice
                    : ""
                }
              >
                {priceRanges.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={<Radio />}
                    label={
                      <div className="flex items-center gap-1">
                        <p>{item.name}</p>
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </section>
        </div>
        <Divider />
        <div className="px-9 space-y-9">
          <section>
            <FormControl>
              <FormLabel
                sx={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "16px",
                  pb: "14px",
                }}
                id="colors"
              >
                Discount
              </FormLabel>
              <RadioGroup
                onChange={updateFilterParam}
                aria-labelledby="discount"
                defaultValue=""
                name="discount"
                color="var(--primary-color)"
                value={filterValues.minimumDiscount ?? ""}
              >
                {discounts.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={<Radio />}
                    label={
                      <div className="flex items-center gap-1">
                        <p>{item.name}</p>
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
