import { BookingHistory, SharedProps } from '@/types/types';
import { usePage, useForm } from '@inertiajs/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

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

export default function BookingHistoryTable({ bookings }: { bookings: BookingHistory[] }) {
   
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedBooking, setSelectedBooking] = useState<number | null>(null);

    const {data,setData, patch, processing } = useForm();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, bookingId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedBooking(bookingId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedBooking(null);
    };

    useEffect(()=>{
        setData({
            booking_status: "cancelled",
        
      })
    },[selectedBooking])

    const handleCancelBooking = () => {
        if (!selectedBooking) return;

        patch(route('booking.update', { booking: selectedBooking }), {
           
            onSuccess: () => {
                window.alert('Booking cancelled successfully');
            },
            onError: (errors) => {
                window.alert('Failed to cancel booking. Please try again.');
            },
            preserveState:false
        });
        handleMenuClose();
    };

    // Sort bookings by creation date (newest first)
    const sortedBookings = bookings.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Booking Id
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Package
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Departure Date
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            No of Traveller
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Price
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Payment Status
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Booking Status
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Booked On
                        </StyledTableCell>
                        <StyledTableCell className="border-r-[1px] border-gray-300 !bg-teal-800 py-1" align="center">
                            Actions
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedBookings.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{row.id}</StyledTableCell>
                            <StyledTableCell align="center">{row.package.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.departure.departure_date}</StyledTableCell>
                            <StyledTableCell align="center">{row.number_of_person}</StyledTableCell>
                            <StyledTableCell align="center">${row.totalPrice}</StyledTableCell>
                            <StyledTableCell align="center">{row.payment_status}</StyledTableCell>
                            <StyledTableCell align="center">{row.booking_status}</StyledTableCell>
                            <StyledTableCell align="center">{row.created_at.split('T')[0]}</StyledTableCell>
                            <StyledTableCell align="center">
                                <IconButton 
                                    onClick={(e) => handleMenuClick(e, row.id)} 
                                    size="small"
                                    disabled={processing}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className="shadow-none">
                    <MenuItem 
                        disabled={bookings.find((b) => b.id === selectedBooking)?.booking_status === 'cancelled' || processing} 
                        onClick={handleCancelBooking}
                    >
                        {processing ? 'Cancelling...' : 'Cancel Booking'}
                    </MenuItem>
                </Menu>
            </Table>
        </TableContainer>
    );
}
