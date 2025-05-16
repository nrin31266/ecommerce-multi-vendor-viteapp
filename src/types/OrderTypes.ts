import { IProduct, ISubProduct } from "./ProductTypes";
import { IPickupAddress, ISeller } from "./SellerTypes";
import { IUser } from "./UserTypes";

export interface ISellerOrder {
  id: number;
  totalItem: number;
  totalPrice: number;
  discountShipping: number;
  discountShop: number;
  shippingCost: number;
  discountPlatform: number;
  finalPrice: number;
  orderItems: IOrderItem[];
  cancelReason: any;
  status: ESellerOrderStatus;
  paymentDetails: IPaymentDetails;
  createdDate: string;
  updatedDate: any;
  seller: ISeller;
  deliveryDate: string;
  isApproved: boolean;
  userId: number;
  //
  customer: IUser;
  shippingAddress: IPickupAddress;
  paymentMethod: EPaymentMethod;
}

export enum ESellerOrderStatus {
  // PENDING_PAYMENT,
  // PENDING,
  // CONFIRMED,
  // SHIPPING,
  // DELIVERED,
  // COMPLETED,
  // CANCELLED,
  // REFUNDED,
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}
export enum EPaymentStatus {
  PENDING,
  COMPLETED,
}

export interface IShippingAddress {
  id: number;
  name: string;
  phoneNumber: string;
  street: string;
  ward: string;
  district: string;
  province: string;
  postalCode: any;
  isDefault: boolean;
}

export interface IOrder {
  id: number;
  user: IUser;
  sellerOrders: ISellerOrder[];
  shippingAddress: IShippingAddress;
  totalItemsPrice: number;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  totalItem: number;
  paymentMethod: string;
  orderDate: string;
}

export enum EPaymentMethod{
  CASH_ON_DELIVERY,
  STRIPE,
  VNPAY
}
export interface IPaymentDetails {
  paymentStatus: EPaymentStatus;
  paymentDate: any;
}

export interface IOrderItem {
  id: number;
  product: IProduct;
  subProduct: ISubProduct;
  quantity: number;
  mrpPrice: number;
  sellingPrice: number;
  userId: number;
}
