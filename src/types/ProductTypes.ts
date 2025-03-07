import { Seller } from "./SellerTypes"

export interface Product {
    id: number,
    title: string,
    description: string,
    mrpPrice: number,
    sellingPrice: number,
    quantity: number,
    color: string,
    images: string[],
    category: Category
    sizes: string,
    discountPercentage: number,
    createdAt: Date,
    seller?: Seller
}

interface Category{

}