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
import { useAppContext } from '@/contexts/appContext';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface AddDeparture {
    departure_date: string;
    package_id: number;
    available_slots: number;
}

export default function AddDepartureDialog({
    handleClose,
    open,
    departureHistory,
    setDepartureHistory,
    packageList
}: {
    handleClose: () => void;
    open: boolean;
    departureHistory: Departure[];
    setDepartureHistory: React.Dispatch<React.SetStateAction<Departure[]>>;
    packageList:info[] | null;
}) {
    const {APP_URL} = useAppContext();
    const [newDeparture, setNewDeparture] = React.useState<AddDeparture>({
        departure_date: '',
        package_id: 0,
        available_slots: 0,
    });

    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const { name, value } = event.target;
        setNewDeparture((val) => ({ ...val, [name]: value }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = event.target;
        setNewDeparture((val) => ({ ...val, [name]: value }));
    };

    const handleSubmit = () => {
       
        axios
            .post(`${APP_URL}/api/departure`, newDeparture)
            .then(function (res) {
                setDepartureHistory([res.data.data,...departureHistory]);
                window.alert(res.data.message);
                handleClose();
            })
            .catch(function (err) {
                window.alert(err.response.data.message);
            });
    };

    return (
        <React.Fragment>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add New Departure
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
                            value={newDeparture.departure_date}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel>Package</InputLabel>
                            <Select
                                name="package_id"
                                value={newDeparture.package_id}
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
                            value={newDeparture.available_slots}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={!newDeparture.departure_date || !newDeparture.package_id || !newDeparture.available_slots}
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Add Departure
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}