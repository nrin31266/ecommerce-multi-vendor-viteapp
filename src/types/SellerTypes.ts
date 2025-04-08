import { EUserRole } from "./UserTypes"

export interface ISeller {
  id: number
  sellerName: string
  mobile: string
  email: string
  password: string
  businessDetails: IBusinessDetails
  bankDetails: IBankDetails
  role: string
  accountStatus: string
  taxCode: string
  pickupAddress: IPickupAddress
  gstin: string
  emailVerified: boolean
  }


  
  export interface IBusinessDetails {
    businessName: string
    businessEmail: string
    businessMobile: string
    businessAddress: string
    logo: string
    banner: string
  }
  
  export interface IBankDetails {
    accountNumber: string
    accountHolderName: string
    ifscCode: string
    swiftCode: string
  }
  
  export interface IPickupAddress {
    id: number
    name: string
    phoneNumber: any
    street: any
    ward: any
    district: any
    province: any
    postalCode: any
  }

  export interface ISellerReport {
    id: number;
    seller: ISeller;
    totalEarnings: number;
    totalSales: number;
    totalRefunds: number;
    totalTax: number;
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions: number;
  }
  