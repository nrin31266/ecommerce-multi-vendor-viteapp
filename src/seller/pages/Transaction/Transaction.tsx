import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { initializeApp } from 'firebase/app';

import { DateUtils } from "../../../utils/DateTime/dateUtils";
import { CurrencyUtils } from "../../../utils/Currency/CurrencyUtils";
import { ITransaction } from "../../../states/seller/sellerTransactionSlide";


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

const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sellerTransactionState = useAppSelector((state) => state.sellerTransaction);



  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Order id for seller</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerTransactionState.transactions.map((row : ITransaction) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                 <div>
                   {DateUtils.convertVNTime(row.date)}
                 </div>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.sellerOrder.id}
                </StyledTableCell>
               
                <StyledTableCell align="right">
                 <div>
                   {CurrencyUtils.formatVNDCurrency(row.sellerOrder.totalPrice)}
                 </div>
                </StyledTableCell>
               
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction;
