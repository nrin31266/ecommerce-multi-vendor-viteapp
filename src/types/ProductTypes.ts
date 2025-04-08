import { ISeller } from "./SellerTypes";

export interface IProduct {
  id: number
  title: string
  description: string
  minMrpPrice: number
  maxMrpPrice: number
  discountPercentage: number
  minSellingPrice: number
  maxSellingPrice: number
  totalSubProduct: number
  totalSold: number
  totalOrder: number
  isSubProduct: boolean
  images: string[]
  numberRating: number
  category: ICategory
  seller: ISeller
  createdAt: string
  optionsTypes: IOptionsType[]
  optionKey: string
  subProducts: ISubProduct[]
}

export interface IOptionsType {
  id: number
  value: string
}

export interface ISubProduct {
  id: number
  quantity: number
  mrpPrice: number
  sellingPrice: number
  discountPercentage: number
  images: string[]
  options: any[]
}

export interface ICategory {
  name: string;
  categoryId: string;
  level: number;
  parentCategory: string;
}

export interface IPageableType<T> {
  content: T[];
  pageable: IPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
