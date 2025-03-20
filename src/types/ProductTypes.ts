import { ISeller } from "./SellerTypes";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  quantity: number;
  color: string;
  images: string[];
  category: ICategory;
  sizes: string;
  discountPercentage: number;
  createdAt: Date;
  seller?: ISeller;
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
