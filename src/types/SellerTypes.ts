import { EUserRole } from "./UserTypes"

export interface ISeller {
    id: number
    sellerName: string
    mobile: string
    email: string
    password: string
    businessDetails: IBusinessDetails
    bankDetails: IBankDetails
    role: EUserRole
    accountStatus: string
    pickupAddress: IPickupAddress
    gstin: any
    emailVerified: boolean
    taxCode:string
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
    locality: string
    address: string
    city: string
    state: string
    pinCode: string
    mobile: string
    zipCode: string
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
  