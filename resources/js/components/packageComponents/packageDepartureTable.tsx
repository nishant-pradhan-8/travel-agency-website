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


export default function DepartureTable({departures, packageInfo}:{departures:departure[], packageInfo:Package}) {
  console.log(departures)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell className='!bg-teal-800 border-r-[1px] border-gray-300' align="center">Trip</StyledTableCell>
            <StyledTableCell className='!bg-teal-800 border-r-[1px] border-gray-300' align="center">Departure Date</StyledTableCell>
            <StyledTableCell className='!bg-teal-800 border-r-[1px] border-gray-300' align="center">Price</StyledTableCell>
            <StyledTableCell className='!bg-teal-800 ' align="center">Book</StyledTableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {departures.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">
                {packageInfo.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.departure_date}</StyledTableCell>
        
              <StyledTableCell align="center">${packageInfo.price}</StyledTableCell>
        
              <StyledTableCell align="center"><button>Book</button></StyledTableCell>
        
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
