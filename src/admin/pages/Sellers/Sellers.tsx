import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "PENDING VERIFICATION",
    description:
      "Pending Verification: The seller has not completed the verification process yet.",
  },
  {
    status: "ACTIVE",
    title: "ACTIVE",
    description:
      "Active: The seller has completed the verification process and is active on the platform.",
  },
  {
    status: "SUSPENDED",
    title: "SUSPENDED",
    description:
      "Suspended: The seller has been suspended for violating the platform's terms and conditions.",
  },
  {
    status: "DEACTIVATED",
    title: "DEACTIVATED",
    description:
      "Deactivated: The seller has been deactivated by the platform for inactivity or other reasons.",
  },
  {
    status: "BANNED",
    title: "BANNED",
    description:
      "Banned: The seller has been banned for violating the platform's terms and conditions.",
  },
  {
    status: "CLOSED",
    title: "CLOSED",
    description:
      "Closed: The seller has been closed by the platform for inactivity or other reasons.",
  },
];

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const Sellers = () => {
  const [accountStatus, setAccountStatus] = useState(accountStatuses[0].status);

  return (
    <div>
      <div className="mb-5 p-y-5">
        <FormControl className="w-max">
          <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="Account Status"
            onChange={(e) => setAccountStatus(e.target.value)}
          >
            {accountStatuses.map((status) => (
              <MenuItem value={status.status}>{status.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Seller Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="right">
                  Mobile
                </StyledTableCell>
                <StyledTableCell align="right">GSTIN</StyledTableCell>
                <StyledTableCell align="right">Business Name</StyledTableCell>
                <StyledTableCell align="right">Account Status</StyledTableCell>
                <StyledTableCell align="right">Change Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Sellers;
