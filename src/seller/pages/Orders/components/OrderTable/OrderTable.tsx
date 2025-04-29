import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../../../../states/seller/sellerOrderSlide";
import { EOrderStatus } from "../../../../../types/OrderTypes";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import classes from "./OrderTable.module.css";
import {
  ChangeCircle,
  ChangeCircleOutlined,
  SignalWifiStatusbarConnectedNoInternet4Rounded,
} from "@mui/icons-material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DateUtils } from "../../../../../utils/DateTime/dateUtils";

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

interface IOrderStatusAction {
  value: EOrderStatus;
  colorHex: string;
  label: string;
}

const orderStatusActions: IOrderStatusAction[] = [
  {
    colorHex: "#FFA500", // Cam - Đang chờ xử lý
    value: EOrderStatus.PENDING,
    label: "Pending",
  },
  {
    colorHex: "#4CAF50", // Xanh lá - Đã đặt hàng
    value: EOrderStatus.PLACED,
    label: "Placed",
  },
  {
    colorHex: "#2196F3", // Xanh dương - Đã xác nhận
    value: EOrderStatus.CONFIRMED,
    label: "Confirmed",
  },
  {
    colorHex: "#9C27B0", // Tím - Đang vận chuyển
    value: EOrderStatus.SHIPPED,
    label: "Shipped",
  },
  {
    colorHex: "#009688", // Teal - Đã giao hàng
    value: EOrderStatus.DELIVERED,
    label: "Delivered",
  },
  {
    colorHex: "#F44336", // Đỏ - Đã hủy
    value: EOrderStatus.CANCELLED,
    label: "Cancelled",
  },
];

const OrderTable = () => {
  const { orderStatus } = useParams();
  const [orderStatusAction, setOrderStatusAction] = useState(
    orderStatus as EOrderStatus
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // Tạo Map từ mảng
  const orderStatusMap = new Map<EOrderStatus, IOrderStatusAction>(
    orderStatusActions.map((action) => [action.value, action])
  );
  // Thay vì dùng 1 state, dùng một object để lưu anchorEl của từng row
  const [anchorElMap, setAnchorElMap] = useState<
    Record<number, HTMLElement | null>
  >({});

 
  useEffect(() => {
    dispatch(fetchSellerOrders({orderStatus: orderStatus as EOrderStatus}));
  }, [searchParams, orderStatus]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    orderId: number
  ) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: number) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: null }));
  };
  const dispatch = useAppDispatch();
  const sellerOrder = useAppSelector((store) => store.sellerOrder);

  const handleUpdateOrderStatus = (
    orderId: number,
    orderStatus: EOrderStatus
  ) => {
    dispatch(updateOrderStatus({ orderId: orderId, orderStatus: orderStatus }));
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-4">
          <h1 className="font-bold mb-5 text-2xl">Orders by: </h1>
          <FormControl className="w-max">
            <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderStatusAction}
              label="Account Status"
              onChange={(e) => {
                setOrderStatusAction(e.target.value as EOrderStatus);
                navigate(`/seller/orders/${e.target.value}`);
              }}
            >
              {orderStatusActions.map((item) => (
                <MenuItem
                  style={{ color: orderStatusMap.get(item.value)?.colorHex }}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div></div>
      </div>

      <TableContainer
        sx={{
          position: "relative",
          minHeight: 200,
        }}
        component={Paper}
      >
        <Table  sx={{ minWidth: 700, opacity: sellerOrder.loading ? 0.6 : 1  }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell align="right">Shipping Address</StyledTableCell>
              <StyledTableCell align="right">Order Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerOrder.orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell>{order.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div className="flex flex-col space-y-2 ">
                    <h1>
                      {order.orderItems.length}
                      {order.orderItems.length === 1 ? " item" : " items"}
                    </h1>
                    {order.orderItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-wrap not-last:border-b-1 border-[var(--primary-color)]"
                      >
                        <div className="flex flex-nowrap">
                          <h1>{"x "+item.quantity}</h1>
                        <img
                          className="w-20"
                          src={item.product.images[0]}
                          alt=""
                        />
                        </div>
                        <div className="flex flex-col justify-between">
                          <h1>{item.product.title}</h1>
                          <h1>{item.sellingPrice}</h1>
                          <h1>{item.product.category.name}</h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  {order.paymentDetails.paymentMethod}
                </StyledTableCell>
                <StyledTableCell>
                  {DateUtils.timeAgo(new Date(order.orderDate))}
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <h1>{order.shippingAddress.name}</h1>
                    <h1>{order.shippingAddress.province}</h1>
                    <h1>{order.shippingAddress.district}</h1>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div
                    className="px-5 py-3 w-max rounded-md"
                    style={{
                      border: `1px solid ${
                        orderStatusMap.get(order.orderStatus)?.colorHex
                      }`,
                      color: orderStatusMap.get(order.orderStatus)?.colorHex,
                    }}
                  >
                    {orderStatusMap.get(order.orderStatus)?.label}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <Button onClick={(e) => handleClick(e, order.id)}>
                      Actions
                    </Button>
                    <Menu
                      anchorEl={anchorElMap[order.id]}
                      open={Boolean(anchorElMap[order.id])}
                      onClose={() => handleClose(order.id)}
                    >
                     {
                      !(orderStatus === EOrderStatus.CANCELLED || orderStatus=== EOrderStatus.PENDING) ?  orderStatusActions.map((item) =>{
                        if(item.value === orderStatus || item.value=== EOrderStatus.PENDING){
                          return null;
                        }else{
                          return <MenuItem style={{ color: orderStatusMap.get(item.value)?.colorHex }}
                          onClick={() => {
                            handleUpdateOrderStatus(order.id, item.value);
                            handleClose(order.id);
                          }}
                          key={item.value}
                        >
                          <h1>{item.label}</h1>
                        </MenuItem>;
                        }
                      }) : <MenuItem>No Action</MenuItem>
                     }
                    </Menu>
                  </div>
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {sellerOrder.loading && (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(2px)', // Hiệu ứng mờ nhẹ
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto' // ← Chặn mọi thao tác
      }}
    >
      <CircularProgress />
    </Box>
  )}
      </TableContainer>
    </div>
  );
};

export default OrderTable;
