import {
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { deleteBanner, fetchBanner, IBanner } from "../../../states/admin/bannerSlide";
import { Add } from "@mui/icons-material";
import AddUpdateBannerModel from "./components/AddUpdateBannerModel/AddUpdateBannerModel";
import { DateUtils } from "../../../utils/DateTime/dateUtils";
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
const Banner = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState(false);
  const dispatch = useAppDispatch();
  const adminBanner = useAppSelector((store) => store.adminBanner);
  const [bannerSelected, setBannerSelected] = useState<IBanner | null>(null);
  const bannerState = useAppSelector((store) => store.adminBanner);
 const hasInitialized = React.useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      dispatch(fetchBanner());
      hasInitialized.current = true;
    }
  }, [dispatch, hasInitialized]);

  return (
    <div>
      <Button
        onClick={() => {
          setOpenAddEditModel(true);
          setBannerSelected(null);
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
              <TableCell>Banner</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Start-End</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bannerState.data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {item.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-[200px] w-[400px] object-contain border border-gray-400"
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div
                    className={`text-xl ${
                      item.active ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </div>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div>
                    {(() => {
                      const now = new Date();
                      const start = new Date(item.startDate);
                      const end = new Date(item.endDate);

                      let textColor = "text-green-500";
                      if (now > end) {
                        textColor = "text-red-500"; // Hết hạn
                      } else if (now < start) {
                        textColor = "text-yellow-500"; // Chưa bắt đầu
                      }

                      return (
                        <div className={textColor}>
                          Start: {DateUtils.convertVNTime(item.startDate)}{" "}
                          <br />
                          End: {DateUtils.convertVNTime(item.endDate)}
                        </div>
                      );
                    })()}
                  </div>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Button
                  variant="contained"
                    onClick={() => {
                      setBannerSelected(item);
                      setOpenAddEditModel(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(deleteBanner(item.id));
                    }}
                    color="error"
                  >
                    Delete
                  </Button>

                </StyledTableCell>
                  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddUpdateBannerModel
        isVisible={openAddEditModel}
        onClose={() => {
          setOpenAddEditModel(false);
          setBannerSelected(null);

        }}
        updateItem={bannerSelected}
      />
    </div>
  );
};

export default Banner;
