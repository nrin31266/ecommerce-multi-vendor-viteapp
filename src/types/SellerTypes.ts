
export interface Seller {
    id: number
    sellerName: string
    mobile: string
    email: string
    password: string
    businessDetails: BusinessDetails
    bankDetails: BankDetails
    role: string
    accountStatus: string
    pickupAddress: PickupAddress
    gstin: any
    emailVerified: boolean
    taxCode:string
  }
  
  export interface BusinessDetails {
    businessName: string
    businessEmail: string
    businessMobile: string
    businessAddress: string
    logo: string
    banner: string
  }
  
  export interface BankDetails {
    accountNumber: string
    accountHolderName: string
    ifscCode: string
    swiftCode: string
  }
  
  export interface PickupAddress {
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

  export interface SellerReport {
    id: number;
    seller: Seller;
    totalEarnings: number;
    totalSales: number;
    totalRefunds: number;
    totalTax: number;
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions: number;
  }
  