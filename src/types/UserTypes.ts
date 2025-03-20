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
  ROLE_CUSTOMER = "ROLE_CUSTOMER",
  ROLE_SELLER = "ROLE_SELLER",
  ROLE_ADMIN = "ROLE_ADMIN",
}
