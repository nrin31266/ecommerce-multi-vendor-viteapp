import { IPickupAddress } from "./SellerTypes";

export interface IUser {
  id?: number;
  fullName: string;
  mobile: string;
  password: string;
  role: EUserRole;
  email: string;
  addresses?: IPickupAddress[];
}

export enum EUserRole {
  BUYER = "BUYER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}
