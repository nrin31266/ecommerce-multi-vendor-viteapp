import {
  AppBar,
  Box,
  Button,
  Paper,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tabs,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { getSellerOrdersByStatus, sellerApproveOrder, sellerRejectOrder, sellerUpdateOrderStatus } from "../../../../../states/seller/sellerOrderSlide";
import { ESellerOrderStatus } from "../../../../../types/OrderTypes";
import { DateUtils } from "../../../../../utils/DateTime/dateUtils";
import { CurrencyUtils } from "../../../../../utils/Currency/CurrencyUtils";
import { TableBar } from "@mui/icons-material";

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

const mathSellerOrderStatus = (tabIndex: number): ESellerOrderStatus | null => {
  switch (tabIndex) {
    case 0:
      return ESellerOrderStatus.PENDING_PAYMENT;
    case 1:
      return ESellerOrderStatus.PENDING;
    case 2:
      return ESellerOrderStatus.CONFIRMED;
    case 3:
      return ESellerOrderStatus.SHIPPING;
    case 4:
      return ESellerOrderStatus.DELIVERED;
    case 5:
      return ESellerOrderStatus.COMPLETED;
    case 6:
      return ESellerOrderStatus.CANCELLED;
    case 7:
      return ESellerOrderStatus.REFUNDED;
    default:
      return null;
  }
};
const orderTabs = [
  { label: "Pending Payment", status: ESellerOrderStatus.PENDING_PAYMENT },
  { label: "Pending", status: ESellerOrderStatus.PENDING },
  { label: "Confirmed", status: ESellerOrderStatus.CONFIRMED },
  { label: "Shipping", status: ESellerOrderStatus.SHIPPING },
  { label: "Delivered", status: ESellerOrderStatus.DELIVERED },
  { label: "Completed", status: ESellerOrderStatus.COMPLETED },
  { label: "Cancelled", status: ESellerOrderStatus.CANCELLED },
  { label: "Refunded", status: ESellerOrderStatus.REFUNDED },
];

const OrderTable = () => {
  const { tabIndex } = useParams();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const sellerOrder = useAppSelector((state) => state.sellerOrder);

  const initialIndex = Number(tabIndex);
  const [value, setValue] = React.useState(initialIndex);
  const hasInitialized = React.useRef(false);

  // Chỉ chạy 1 lần khi mount để lấy data từ tabIndex trên URL
  useEffect(() => {
    if (!hasInitialized.current) {
      const status = mathSellerOrderStatus(initialIndex);
      if (status) {
        dispatch(getSellerOrdersByStatus(status));
      }
      hasInitialized.current = true;
    }
  }, [dispatch, initialIndex]); // có dispatch ở đây để khỏi bị ESLint warning

  // Khi user chọn tab khác => gọi API theo tab đó
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const status = mathSellerOrderStatus(newValue);
    if (status) {
      dispatch(getSellerOrdersByStatus(status));
    }
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
            {orderTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
        {orderTabs.map((tab, index) => (
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Order date</TableCell>
              <TableCell>Customer info</TableCell>
              <TableCell>Payment method</TableCell>
              <TableCell>Details</TableCell>
              {(value === 1 || value === 2 || value === 3) && (
                <TableCell>Action</TableCell>
              )}
              {value === 6 && <TableCell>Cancelled reason</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerOrder.sellerOrder.map((sellerOrder) => (
              <TableRow
                key={sellerOrder.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{sellerOrder.id}</TableCell>
                <TableCell>
                  <div>
                    <div>
                      Create:{" "}
                      {DateUtils.timeAgo(new Date(sellerOrder.createdDate))}
                    </div>
                    {sellerOrder.updatedDate && (
                      <div>
                        Update:{" "}
                        {DateUtils.timeAgo(new Date(sellerOrder.updatedDate))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    Name: {sellerOrder.shippingAddress.name}, Phone:{" "}
                    {sellerOrder.shippingAddress.phoneNumber}
                  </div>

                  <div>
                    Address: {sellerOrder.shippingAddress.street},{" "}
                    {sellerOrder.shippingAddress.ward},{" "}
                    {sellerOrder.shippingAddress.district},{" "}
                    {sellerOrder.shippingAddress.province}
                  </div>
                </TableCell>
                <TableCell>
                  <div>Method: {sellerOrder.paymentMethod}</div>
                  <div>Status: {sellerOrder.paymentDetails.paymentStatus}</div>
                  {sellerOrder.paymentDetails.paymentDate && (
                    <div>
                      Payment date:{" "}
                      {sellerOrder.paymentDetails.paymentDate}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {sellerOrder.orderItems.map((item) => (
                    <div>
                      <div key={item.id} className="flex items-center gap-2">
                        <img
                          src={item.subProduct.images[0]}
                          alt=""
                          className="w-[50px] h-[50px] object-contain"
                        />
                        <div>
                          <div>
                            Product id {item.product.id}, Variant id: {item.subProduct.id}
                          </div>
                          <div className="overflow-ellipsis w-[320px] line-clamp-1">
                            {item.product.title}
                          </div>
                          <div>
                            Quantity: {item.quantity}, Price:{" "}
                            {CurrencyUtils.formatVNDCurrency(item.sellingPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TableCell>
                {(value === 1 || value === 2 || value === 3) && (
                  <TableCell>
                    {sellerOrder.status === ESellerOrderStatus.PENDING && (
                      <div className="flex gap-2 flex-col">
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => {
                            dispatch(
                              sellerApproveOrder(sellerOrder.id)
                            );
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            dispatch(
                              sellerRejectOrder(sellerOrder.id)
                            );
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {(sellerOrder.status === ESellerOrderStatus.CONFIRMED) && (
                      <div className="flex gap-2 flex-col">
                        <Button
                          variant="outlined"
                          color="info"
                          onClick={() => {
                            dispatch(
                              sellerUpdateOrderStatus({
                                sellerOrderId: sellerOrder.id,
                                status: ESellerOrderStatus.SHIPPING,})
                            );
                          }}
                        >
                          Shipping
                        </Button>
                      </div>
                    )}
                    {(sellerOrder.status === ESellerOrderStatus.SHIPPING) && (
                      <div className="flex gap-2 flex-col">
                        <Button
                          variant="outlined"
                          color="info"
                          onClick={() => {
                            dispatch(
                              sellerUpdateOrderStatus({
                                sellerOrderId: sellerOrder.id,
                                status: ESellerOrderStatus.DELIVERED,})
                            );
                          }}
                        >
                          Delivered
                        </Button>
                      </div>
                    )}
                  </TableCell>
                )}
                {value === 6 && (
                  <TableCell>
                    {sellerOrder.cancelReason
                      ? sellerOrder.cancelReason
                      : "No reason"}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderTable;
