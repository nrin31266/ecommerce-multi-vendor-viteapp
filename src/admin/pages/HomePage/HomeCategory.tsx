import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit, UploadTwoTone } from "@mui/icons-material";
import {
  deleteHomeCategory,
  EHomeCategorySection,
  fetchHomeCategory,
  IHomeCategory,
} from "../../../states/admin/homeCategorySlide";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import AddUpdateHomeCategoryModel from "./components/AddUpdateHomeCategoryModel/AddUpdateHomeCategoryModel";
import { getAllCategories } from "../../../states/admin/categorySlide";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

// export enum EHomeCategorySection {
//   ELECTRONICS_CATEGORY = "ELECTRONICS_CATEGORY",
//   MEN_CATEGORY = "MEN_CATEGORY",
//   WOMEN_CATEGORY = "WOMEN_CATEGORY",
//   HOME_FURNITURE_CATEGORY = "HOME_FURNITURE_CATEGORY",
// }
const mathHomeCategorySection = (
  tabIndex: number
): EHomeCategorySection | null => {
  switch (tabIndex) {
    case 0:
      return EHomeCategorySection.ELECTRIC_CATEGORY;
    case 1:
      return EHomeCategorySection.MEN_CATEGORY;
    case 2:
      return EHomeCategorySection.WOMEN_CATEGORY;
    case 3:
      return EHomeCategorySection.HOME_FURNITURE_CATEGORY;
    default:
      return null;
  }
};
const homeCategoryTabs = [
  {
    label: "Electronics",
    section: EHomeCategorySection.ELECTRIC_CATEGORY,
  },
  {
    label: "Men",
    section: EHomeCategorySection.MEN_CATEGORY,
  },
  {
    label: "Women",
    section: EHomeCategorySection.WOMEN_CATEGORY,
  },
  {
    label: "Home & Furniture",
    section: EHomeCategorySection.HOME_FURNITURE_CATEGORY,
  },
];
const HomeCategory = () => {
  const { tabIndex } = useParams();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const homeCategory = useAppSelector((state) => state.homeCategory);
  const categoryState = useAppSelector((state) => state.adminCategory);
  const [isOpenAddUpdateHCModel, setIsOpenAddUpdateHCModel] = useState(false);
  const [homeCategorySelected, setHomeCategorySelected] =
    useState<IHomeCategory | null>(null);
  const initialIndex = Number(tabIndex);
  const [value, setValue] = React.useState(initialIndex);
  const hasInitialized = React.useRef(false);

  // Chỉ chạy 1 lần khi mount để lấy data từ tabIndex trên URL
  useEffect(() => {
    if (!hasInitialized.current) {
      dispatch(getAllCategories());

      const section = mathHomeCategorySection(initialIndex);
      if (section) {
        dispatch(fetchHomeCategory({ section }));
      }
      hasInitialized.current = true;
    }
  }, [dispatch, initialIndex]); // có dispatch ở đây để khỏi bị ESLint warning

  // Khi user chọn tab khác => gọi API theo tab đó
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const section = mathHomeCategorySection(newValue);
    dispatch(fetchHomeCategory({ section }));
  };

  return (
    <div>
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
            {homeCategoryTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
        {homeCategoryTabs.map((tab, index) => (
          <TabPanel
            key={index}
            value={value}
            index={index}
            dir={theme.direction}
          >
            {tab.label}
          </TabPanel>
        ))}
      </Box>
      <div>
        <Button
          onClick={() => {
            setIsOpenAddUpdateHCModel(true);
          }}
          variant="contained"
        >
          Add
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category id</TableCell>
                <TableCell>Section</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homeCategory.data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-contain"
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.categoryIds}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.homeCategorySection}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <IconButton
                      onClick={() => {
                        setHomeCategorySelected(item);
                        setIsOpenAddUpdateHCModel(true);
                      }}
                    >
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(deleteHomeCategory(item.id));
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <AddUpdateHomeCategoryModel
        isVisible={isOpenAddUpdateHCModel}
        onClose={() => {
          setIsOpenAddUpdateHCModel(false);
          setHomeCategorySelected(null);
        }}
        updateItem={homeCategorySelected}
      />
    </div>
  );
};

export default HomeCategory;
