import useDialog from '@/hooks/useDialog';
import { BookingHistory } from '@/types/types';
import { Chip, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import BookingEditDialog from './editBookingsDialog';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const statusColors = {
    booked: 'success',
    pending: 'warning',
    cancelled: 'error',
} as const;

interface BookingsTableProps {
    bookings: BookingHistory[];
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
    const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>(bookings);
    const { open, handleClickOpen, handleClose } = useDialog();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedBooking, setSelectedBooking] = useState<BookingHistory | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, booking: BookingHistory) => {
        setAnchorEl(event.currentTarget);
        setSelectedBooking(booking);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        handleClickOpen();
        handleMenuClose();
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Booking Id
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Package
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Customer
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Departure Date
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                No of Travellers
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Payment Status
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Booking Status
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Price
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Booked On
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingHistory.map((booking) => (
                            <StyledTableRow key={booking.id}>
                                <TableCell align="center">#{booking.id}</TableCell>
                                <TableCell align="center">{booking.package.name}</TableCell>
                                <TableCell align="center">{booking.user.full_name}</TableCell>
                                <TableCell align="center">{booking.departure.departure_date}</TableCell>
                                <TableCell align="center">{booking.number_of_person}</TableCell>
                                <TableCell align="center">{booking.payment_status}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                                        color={statusColors[booking.booking_status as keyof typeof statusColors]}
                                        size="medium"
                                    />
                                </TableCell>
                                <TableCell align="center">NPR {booking.totalPrice}</TableCell>
                                <TableCell align="center">{booking.created_at.split('T')[0]}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, booking)}>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>Edit Booking</MenuItem>
            </Menu>

            {selectedBooking && (
                <BookingEditDialog
                    booking={selectedBooking}
                    handleClose={handleClose}
                    open={open}
                 
                />
            )}
        </>
    );
}
