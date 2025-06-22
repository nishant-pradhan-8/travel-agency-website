import { Departure, info, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';

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

}

export default function DepartureEditDialog({
    departure,
    handleClose,
    open,
    departureHistory,
    setDepartureHistory,
    packageList

}: {
    departure: Departure;
    handleClose: () => void;
    open: boolean;
    departureHistory: Departure[];
    setDepartureHistory: React.Dispatch<React.SetStateAction<Departure[]>>;
    packageList:info[] | null;
}) {
    const { env } = usePage<SharedProps>().props;
    

    const [updateDetails, setUpdateDetails] = React.useState<EditDeparture>({
        departure_date: departure.departure_date || '',
        package_id: departure.package_id || 0,
        available_slots: departure.available_slots || 0,
    });

    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const { name, value } = event.target;
        setUpdateDetails((val) => ({ ...val, [name]: value }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdateDetails((val) => ({ ...val, [name]: value }));
    };

    const handleSubmit = () => {
        let reqBody: Partial<EditDeparture> = {};
        if (updateDetails.departure_date !== departure.departure_date) {
            reqBody['departure_date'] = updateDetails.departure_date;
        }
        if (updateDetails.package_id !== departure.package_id) {
            reqBody['package_id'] = updateDetails.package_id;
        }
        if (updateDetails.available_slots !== departure.available_slots) {
            reqBody['available_slots'] = updateDetails.available_slots;
        }

        axios
            .patch(`${env.APP_URL}:8000/api/departure/${departure.id}`, reqBody)
            .then(function (res) {
                const updatedDepartureHistory = departureHistory.map((dep) => {
                    if (departure.id === dep.id) {
                        return { ...dep, ...updateDetails };
                    }
                    return dep;
                });
                setDepartureHistory(updatedDepartureHistory);
                window.alert(res.data.message);
            })
            .catch(function (err) {
                window.alert(err.response.data.message);
            });

        handleClose();
    };

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
                            value={updateDetails.departure_date}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Package</InputLabel>
                            <Select
                                name="package_id"
                                value={updateDetails.package_id}
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
                            value={updateDetails.available_slots}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={
                            departure.departure_date === updateDetails.departure_date &&
                            departure.package_id === updateDetails.package_id &&
                            departure.available_slots === updateDetails.available_slots
                        }
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