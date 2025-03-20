import { IProduct } from "./ProductTypes";
import { IUser } from "./UserTypes";

export interface ICartItem {
    id: number;
    cart?: ICart;
    product: IProduct;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number;
    userId: number;
}
export interface ICart {
    id: number;
    user: IUser;
    cartItems: ICartItem[];
    totalSellingPrice: number;
    totalItem: number;
    totalMrpPrice: number;
    discount: number;
    couponCode: string | null;
}
