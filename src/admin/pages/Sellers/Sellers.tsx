import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import {
  Button,
  Menu,
  MenuItem,
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
import React, { useEffect, useRef, useState } from "react";
import { getSellers, updateSellerAccountStatus } from "../../../states/admin/adminSellerSlice";
import { EAccountStatus } from "../../../types/SellerTypes";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const statuses = [
  { label: "Pending Verification", value: EAccountStatus.PENDING_VERIFICATION },
  { label: "Active", value: EAccountStatus.ACTIVE },
  { label: "Banned", value: EAccountStatus.BANNED },
  { label: "Closed", value: EAccountStatus.CLOSED },
];

const Sellers = () => {
  const dispatch = useAppDispatch();
  const adminSellerState = useAppSelector((store) => store.adminSeller);
  const navigate = useNavigate();
  const initializePage = useRef(false);

  // Lưu anchorEl cho từng seller theo id
  const [menuAnchorEls, setMenuAnchorEls] = useState<{
    [key: number]: HTMLElement | null;
  }>({});

  useEffect(() => {
    if (!initializePage.current) {
      initializePage.current = true;
      dispatch(getSellers());
    }
  }, [dispatch]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    sellerId: number
  ) => {
    setMenuAnchorEls((prev) => ({
      ...prev,
      [sellerId]: event.currentTarget,
    }));
  };

  const handleMenuClose = (sellerId: number) => {
    setMenuAnchorEls((prev) => ({
      ...prev,
      [sellerId]: null,
    }));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Personal Details</StyledTableCell>
              <StyledTableCell>Business Details</StyledTableCell>
              <StyledTableCell>Logo and banner</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminSellerState.sellers.map((row) => {
              const anchorEl = menuAnchorEls[row.id] || null;
              const open = Boolean(anchorEl);

              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <div>
                      <p>{row.sellerName}</p>
                      <p>{row.email}</p>
                      <p>{row.mobile}</p>
                      <p>{row.taxCode}</p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <div>
                      <p>{row.businessDetails.businessName}</p>
                      <p>{row.businessDetails.businessEmail}</p>
                      <p>{row.businessDetails.businessMobile}</p>
                      <p>{row.businessDetails.businessAddress}</p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <div className="flex items-center gap-4">
                      {row.businessDetails.logo ? (
                        <img
                          className="w-20 h-20 object-cover"
                          src={row.businessDetails.logo}
                          alt="logo"
                        />
                      ) : (
                        <p>Chưa cập nhật logo</p>
                      )}
                      {row.businessDetails.banner ? (
                        <img
                          className="w-32 h-20 object-cover"
                          src={row.businessDetails.banner}
                          alt="banner"
                        />
                      ) : (
                        <p>Chưa cập nhật banner</p>
                      )}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <div>
                      <p>{row.pickupAddress?.province}</p>
                      <p>{row.pickupAddress?.district}</p>
                      <p>{row.pickupAddress?.ward}</p>
                      <p>{row.pickupAddress?.street}</p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => handleMenuOpen(e, row.id)}
                      aria-controls={open ? `menu-${row.id}` : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      color={row.accountStatus === EAccountStatus.ACTIVE ? "success" :
                        row.accountStatus === EAccountStatus.PENDING_VERIFICATION ? "warning" :
                          "primary"
                      }
                    >
                      {row.accountStatus}
                    </Button>
                    <Menu
                      id={`menu-${row.id}`}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={() => handleMenuClose(row.id)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      {
                        // @ts-ignore
                        statuses.map((status) => (
                          <MenuItem
                            key={status.value}
                            onClick={() => {
                              handleMenuClose(row.id);
                              dispatch(
                                updateSellerAccountStatus({
                                  sellerId: row.id,
                                  status: status.value,
                                })
                              );
                            }}
                          >
                            {status.label}
                          </MenuItem>
                        ))
                      }
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Sellers;
