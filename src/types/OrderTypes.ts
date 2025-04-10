import { IProduct } from "./ProductTypes";
import { IPickupAddress } from "./SellerTypes";
import { IUser } from "./UserTypes";

export interface IOrder {
  id: number;
  orderId: string;
  user: IUser;
  sellerId: number;
  orderItems: IOrderItem[];
  orderDate: string;
  shippingAddress: IPickupAddress;
  paymentDetails: any;
  totalMrpPrice: number;
  totalSellingPrice: number; 
  discount: number; 
  orderStatus: EOrderStatus;
  totalItem: number;
  deliverDate: string;
}
export enum EOrderStatus {
  PENDING = "PENDING",
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface IOrderItem {
  id: number;
  order: IOrder;
  product: IProduct;
  size: string;
  quantity: number;
  mrpPrice: number;
  sellingPrice: number;
  userId: number;
}
