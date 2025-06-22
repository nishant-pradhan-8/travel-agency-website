import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { departure, Package } from '@/types/types';

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


export default function GroupDiscountTable({packageInfo}:{packageInfo:Package}) {
 const groupDiscount = [
    {
    id: 1,
    persons : 1,
    pricePerPerson: Number(packageInfo.price)
 },{
    id: 2,
    persons : 2,
    pricePerPerson: Number(packageInfo.price)-20
 },
 {
    id: 3,
    persons : "3-5",
    pricePerPerson: Number(packageInfo.price)-30
 },
 {
    id: 4,
    persons : "6-9",
    pricePerPerson: Number(packageInfo.price)-60
 },
  {
    id: 5,
    persons : "10-15",
    pricePerPerson: Number(packageInfo.price)-80
 },
  {id: 6,
    persons : "16+",
    pricePerPerson: Number(packageInfo.price)-100
 }
    
]

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell className='!bg-teal-800 border-r-[1px] py-1 border-gray-300'  align="center">Number of Person</StyledTableCell>
            <StyledTableCell className='!bg-teal-800 border-r-[1px] py-1 border-gray-300' align="center">Discounted Price</StyledTableCell>
           
    
          </TableRow>
        </TableHead>
        <TableBody>
          {groupDiscount.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center'>
                {row.persons}
              </StyledTableCell>
              <StyledTableCell align="center">${row.pricePerPerson}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
