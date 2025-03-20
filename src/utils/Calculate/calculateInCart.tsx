import { ICartItem } from "../../types/CartTypes";

export class CalculateInCart {
    public static sumCartItemMrpPrice = (cartItems: ICartItem[]): number =>{

        return cartItems.reduce((acc, item) => acc + item.mrpPrice * item.quantity, 0);
    }

    public static sumCartItemSellingPrice = (cartItems: ICartItem[]): number =>{

        return cartItems.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0);
    }
} 