import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../../../states/store';
import { fetchSellerProducts } from '../../../../../states/seller/sellerProductSlide';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const ProductTable = () => {
  const dispatch = useAppDispatch();
  const sellerProduct = useAppSelector((state) => state.sellerProduct);


  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, []);
  return (
    <div>
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">Selling Pr</StyledTableCell>
              <StyledTableCell align="right">Color</StyledTableCell>
              <StyledTableCell align="right">Update Stock</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.product.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell  component="th" scope="row" className='w-[300px]'>
                 <div className='flex flex-nowrap gap-1 w-full overflow-x-auto overflow-y-hidden'>
                 {row.images.map((image) => (<img className='w-20 rounded-md ' src={image} alt="" />))}
                 </div>
                </StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell align="right">{row.mrpPrice}</StyledTableCell>
                <StyledTableCell align="right">{row.sellingPrice}</StyledTableCell>
                <StyledTableCell align="right">{row.color}</StyledTableCell>
                <StyledTableCell align="right">{
                  <Button>in_stock</Button>
                  }</StyledTableCell>
                <StyledTableCell align="right">{
                  <IconButton color='primary'>
                    <Edit/>
                  </IconButton>
                  }</StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductTable