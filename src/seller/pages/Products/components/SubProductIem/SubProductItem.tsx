import React from "react";
import { IProduct, ISubProduct } from "../../../../../types/ProductTypes";
import { CurrencyUtils } from "../../../../../utils/Currency/CurrencyUtils";
import { IconButton } from "@mui/material";
import { Delete, Edit, Remove } from "@mui/icons-material";
{
  /* <p>
<b>Selling Price: </b>
{item.subProducts[0].sellingPrice}
</p>
<p>
<b>MRP Price: </b>
{item.subProducts[0].mrpPrice}
</p>
<p>
<b>Quantity: </b>
{item.subProducts[0].quantity}
</p> */
}
const SubProductItem = ({
  item,
  product,
  onUpdate,
  onRemove
}: {
  item: ISubProduct;
  product: IProduct;
  onUpdate: () => void;
  onRemove: () => void;
}) => {
  return (
    <div className="border border-gray-200 p-2 rounded-md grid grid-cols-12 gap-2">
      <img
        src={item.images[0]}
        alt=""
        width={"100%"}
        className="object-cover col-span-3"
      />

      <div className="col-span-7">
        <div className="flex gap-2">
          {item.options.map((item) => (
            <p key={item.optionValue} className="font-semibold text-md text-gray-600">
              {item.optionType.value}: {item.optionValue}
            </p>
          ))}
        </div>
        <p>
          <b>Selling Price: </b>
          {CurrencyUtils.formatVNDCurrency(item.sellingPrice)}
        </p>
        <p>
          <b>MRP Price: </b>
          {CurrencyUtils.formatVNDCurrency(item.mrpPrice)}
        </p>
        <p>
          <b>Quantity: </b>
          {item.quantity}
        </p>
      </div>
      <div className="col-span-2">
      <IconButton>
            <Edit onClick={onUpdate} color="primary"/>
        </IconButton>
        {/* <IconButton>
            <Delete onClick={onRemove} color="error"/>
        </IconButton> */}
      </div>
    </div>
  );
};

export default SubProductItem;
