export interface ICoupon {
    id: number;
    code: string;
    discountPercentage: number;
    validityStartDate: string;
    validityEndDate: string;
    minimumOrderValue: number;
    active: boolean;
    couponType: ECouponType;
}

enum ECouponType {
    PERCENTAGE = "PERCENTAGE",
    PERMANENT = "PERMANENT",
}

