import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Edit, UploadTwoTone } from "@mui/icons-material";


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

/*************  ✨ Codeium Command 🌟  *************/
/**
 * A component that displays a table of home categories.
 *
 * The table displays the name, calories, fat, carbs, and protein of each home category.
 */
const HomeCategory = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {/* The table header displays the column names. */}
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* The table body displays the data in rows. */}
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                {/* The first column displays the name of the row. */}
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                {/* The second column displays the calories of the row. */}
                <StyledTableCell>{row.calories}</StyledTableCell>
                {/* The third column displays the fat of the row. */}
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                {/* The fourth column displays the carbs of the row. */}
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                {/* The fifth column displays the protein of the row. */}
                <StyledTableCell align="right">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
/******  f4276b23-d57e-438e-8dec-21e72f1477e0  *******/

export default HomeCategory;
