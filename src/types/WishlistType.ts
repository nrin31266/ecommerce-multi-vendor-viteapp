import { IProduct } from "./ProductTypes";
import { IUser } from "./UserTypes";

export interface IWishlist {
    id: number;
    user: IUser;
    products: IProduct[];
}

export interface IWishlistState {
    wishlist: IWishlist | null;
    loading: boolean;
    error: string | null;
}

// Payload interfaces for async thunks
export interface IAddProductToWishlistPayload {
    wishlistId: number;
    productId: number;
}