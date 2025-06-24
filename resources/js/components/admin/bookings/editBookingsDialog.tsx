import { BookingHistory, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';

import { useAppContext } from '@/contexts/appContext';
const paymentStatuses = ['unpaid', 'paid', 'refunded'];
const bookingStatuses = ['booked', 'cancelled'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface EditBooking {
    payment_status: 'paid' | 'refunded' | 'unpaid';
    booking_status: 'cancelled' | 'booked';
    [key: string]: string;
}

export default function BookingEditDialog({
    booking,
    handleClose,
    open,
    bookingHistory,
    setBookingHistory,
}: {
    booking: BookingHistory;
    handleClose: () => void;
    open: boolean;
    bookingHistory: BookingHistory[];
    setBookingHistory: React.Dispatch<React.SetStateAction<BookingHistory[]>>;
}) {
    const {APP_URL} = useAppContext();

    const [updateDetails, setUpdateDetails] = React.useState<EditBooking>({
        payment_status: booking.payment_status || '',
        booking_status: booking.booking_status || '',
    });

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setUpdateDetails((val) => ({ ...val, [name]: value }));
    };

    const handleSubmit = () => {
        let reqBody: Partial<EditBooking> = {};
        if (updateDetails.booking_status !== booking.booking_status) {
            reqBody['booking_status'] = updateDetails.booking_status;
        }
        if (updateDetails.payment_status !== booking.payment_status) {
            reqBody['payment_status'] = updateDetails.payment_status;
        }

        axios
            .patch(`${APP_URL}/api/booking/${booking.id}`, reqBody)
            .then(function (res) {
                const updatedBookingHistory: BookingHistory[] = bookingHistory.map((book) => {
                    if (booking.id === book.id) {
                        return { ...booking, ...updateDetails};
                    }
                    return book;
                });
                setBookingHistory(updatedBookingHistory);
              
                window.alert(res.data.message);
            })
            .catch(function (err) {
                window.alert(err.response.data.message);
            }).finally(()=>{
                handleClose();
            })

     
    };

    React.useEffect(()=>{
        setUpdateDetails({
            payment_status: booking.payment_status || '',
            booking_status: booking.booking_status || '',
        });
    },[booking])
    return (
        <React.Fragment>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Booking
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Payment Status</InputLabel>
                            <Select name="payment_status" value={updateDetails.payment_status} label="Payment Status" onChange={handleSelectChange}>
                                {paymentStatuses.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Booking Status</InputLabel>
                            <Select name="booking_status" value={updateDetails.booking_status} label="Booking Status" onChange={handleSelectChange}>
                                {bookingStatuses.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={booking.booking_status === updateDetails.booking_status && booking.payment_status === updateDetails.payment_status}
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
