import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import {
  deleteProduct,
  fetchSellerProducts,
} from "../../../../../states/seller/sellerProductSlide";
import { Button, Divider, IconButton } from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  Remove,
} from "@mui/icons-material";
import AddEditSubProductModel from "../AddEditSubProductModel/AddEditSubProductModel";
import { IProduct } from "../../../../../types/ProductTypes";
import SubProductItem from "../SubProductIem/SubProductItem";
import { CurrencyUtils } from "../../../../../utils/Currency/CurrencyUtils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const ProductTable = () => {
  const dispatch = useAppDispatch();
  const sellerProduct = useAppSelector((state) => state.sellerProduct);
  const [isVisibleAddEditSubModel, setIsVisibleAddEditSubModel] =
    useState(false);
  const [productSelected, setProductSelected] = useState<IProduct>();
  const [moreSubProducts, setMoreSubProducts] = useState(
    new Map<number, boolean>(
      sellerProduct.product.map((item) => [item.id, false])
    )
  );

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Sub product</StyledTableCell>

              <StyledTableCell>Category</StyledTableCell>

              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.product.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell
                  width={600}
                  sx={{ verticalAlign: 'top' }}
                >
                  <div className="flex flex-nowrap gap-1 w-full overflow-x-auto overflow-y-hidden">
                    {item.images.map((image) => (
                      <img className="w-20 rounded-md " src={image} alt="" />
                    ))}
                  </div>
                </StyledTableCell>
                <StyledTableCell sx={{ verticalAlign: 'top' }} width={400}>
                  <div className="overflow-ellipsis line-clamp-4">
                    {item.title}
                  </div>
                </StyledTableCell>
                <StyledTableCell sx={{ verticalAlign: 'top' }} width={700}>
                  {item.isSubProduct ? (
                    <div>
                      <h1 className="font-bold text-[var(--primary-color)]">
                        Single Product
                      </h1>
                      <p>
                        <b>Selling Price: </b>
                        {CurrencyUtils.formatVNDCurrency(item.subProducts[0].sellingPrice)}
                      </p>
                      <p>
                        <b>MRP Price: </b>
                        {CurrencyUtils.formatVNDCurrency(item.subProducts[0].mrpPrice)}
                      </p>
                      <p>
                        <b>Quantity: </b>
                        {item.subProducts[0].quantity}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center">
                        <h1 className="font-bold text-[var(--primary-color)]">
                          MultiP{" "}
                        </h1>
                        ({item.subProducts.length}{" "}
                        {item.subProducts.length > 1 ? "items" : "item"})
                        <div className="ml-auto">
                          <IconButton
                            onClick={() => {
                              setProductSelected(item);
                              setIsVisibleAddEditSubModel(true);
                            }}
                          >
                            <Add />
                          </IconButton>
                          {item.subProducts.length > 1 && (
                            <IconButton
                              onClick={() => {
                                const updatedMap = new Map(moreSubProducts); // Tạo bản sao của Map để tránh thay đổi trực tiếp
                                updatedMap.set(
                                  item.id,
                                  !updatedMap.get(item.id)
                                ); // Cập nhật giá trị
                                setMoreSubProducts(updatedMap); // Cập nhật state với Map đã thay đổi
                              }}
                            >
                              {moreSubProducts.get(item.id) ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                          )}
                        </div>
                      </div>
                      {item.subProducts && item.subProducts.length > 0 && (
                        <>
                          <Divider />
                          <div className="mb-2"></div>
                          {!moreSubProducts.get(item.id) ? (
                            <SubProductItem
                              item={item.subProducts[0]}
                              product={item}
                            />
                          ) : (
                            moreSubProducts.get(item.id) && (
                              <div className="space-y-5">
                                {item.subProducts.map((subProduct) => (
                                  <SubProductItem
                                    key={subProduct.id}
                                    item={subProduct}
                                    product={item}
                                  />
                                ))}
                              </div>
                            )
                          )}
                        </>
                      )}
                    </div>
                  )}
                </StyledTableCell >
                  <StyledTableCell sx={{ verticalAlign: 'top' }} width={400}>
                    <p className="font-bold text-xl text-orange-400">{item.category.name}</p>
                  </StyledTableCell>
                <StyledTableCell align="right" sx={{ verticalAlign: 'top' }} width={100}>
                  {
                    <>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          dispatch(deleteProduct({ id: item.id }));
                        }}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </>
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {productSelected && (
        <AddEditSubProductModel
          product={productSelected}
          isVisible={isVisibleAddEditSubModel}
          onClose={() => {
            setIsVisibleAddEditSubModel(false);
            setProductSelected(undefined);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
