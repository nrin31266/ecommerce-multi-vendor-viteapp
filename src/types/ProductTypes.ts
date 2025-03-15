import { Seller } from "./SellerTypes";

export interface Product {
  id: number;
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  quantity: number;
  color: string;
  images: string[];
  category: Category;
  sizes: string;
  discountPercentage: number;
  createdAt: Date;
  seller?: Seller;
}

export interface Category {
  name: string;
  categoryId: string;
  level: number;
  parentCategory: string;
}

export interface PageableType<T> {
  content: T[];
  pageable: Pageable;
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

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
