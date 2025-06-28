import { Departure, info, SharedProps } from '@/types/types';
import { usePage, useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { useAppContext } from '@/contexts/appContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface EditDeparture {
    departure_date: string;
    package_id: number;
    available_slots: number;
    [key:string]:any
}

export default function DepartureEditDialog({
    departure,
    handleClose,
    open,
    packageList

}: {
    departure: Departure;
    handleClose: () => void;
    open: boolean;
    packageList:info[] | null;
}) {
    const { data, setData, patch, processing, reset } = useForm<EditDeparture>({
        departure_date: '',
        package_id: 0,
        available_slots: 0,
    });

    React.useEffect(() => {
        if (open && departure) {
            setData({
                departure_date: departure.departure_date || '',
                package_id: departure.package_id || 0,
                available_slots: departure.available_slots || 0,
            });
        } else if (!open) {
            reset();
        }
    }, [departure, open, setData, reset]);

    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const { name, value } = event.target;
        setData(name as keyof EditDeparture, value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(name as keyof EditDeparture, value);
    };

    const handleSubmit = () => {
        patch(route('departures.update', departure.id), {
            onSuccess: () => {
                window.alert('Departure updated successfully');
                handleClose();
            },
            onError: () => {
                window.alert('Failed to update departure');
            },
            preserveState: false,
        });
    };

    const hasChanges =
        departure.departure_date !== data.departure_date ||
        departure.package_id !== data.package_id ||
        departure.available_slots !== data.available_slots;

    return (
        <React.Fragment>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Departure
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
                        <TextField
                            name="departure_date"
                            label="Departure Date"
                            type="date"
                            value={data.departure_date}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Package</InputLabel>
                            <Select
                                name="package_id"
                                value={data.package_id}
                                label="Package"
                                onChange={handleSelectChange}
                            >
                                {packageList && packageList.map((pac) => (
                                    <MenuItem key={pac.id} value={pac.id}>
                                        {pac.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            name="available_slots"
                            label="Available Slots"
                            type="number"
                            value={data.available_slots}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={!hasChanges || processing}
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