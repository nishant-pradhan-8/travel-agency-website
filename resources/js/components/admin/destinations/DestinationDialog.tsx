import { destination, SharedProps } from '@/types/types';
import { usePage, useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface DestinationFormData {
    name: string;
    description: string;
    [key: string]: any;
}

interface DestinationDialogProps {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    destination?: destination;
}

const DestinationDialog: React.FC<DestinationDialogProps> = ({ open, onClose, mode, destination }) => {
    const { env } = usePage<SharedProps>().props;
   

    const { data, setData, post, patch, processing, errors, reset } = useForm<DestinationFormData>({
        name: '',
        description: '',
    });

    React.useEffect(() => {
        if (mode === "edit" && destination) {
            setData({
                name: destination.name,
                description: destination.description,
            });
        } else if (mode === "create") {
            reset();
        }
    }, [destination, mode, setData, reset]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof DestinationFormData, value);
    };

    const handleSubmit = () => {
     
        if (mode === 'create') {
            post(route('destinations.store'), {
                onSuccess: () => {
                   
                    onClose();
                    window.alert('Destination created successfully');
                },
                onError: () => {
                    window.alert('Failed to create destination');
                },
                preserveState: false,
            });
        } else if (mode === 'edit' && destination) {
            patch(route('destinations.update', destination.id), {
                onSuccess: () => {
                    onClose();
                    window.alert('Destination updated successfully');
                },
                onError: () => {
                    window.alert('Failed to update destination');
                },
                preserveState: false,
            });
        }
    };

    const isFormValid = data.name.trim() !== '' && data.description.trim() !== '';
    const isEditMode = mode === 'edit';
    const hasChanges = isEditMode && destination && (data.name !== destination.name || data.description !== destination.description);

    return (
        <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {isEditMode ? 'Edit Destination' : 'Add New Destination'}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <div className="flex flex-col gap-4">
                    <TextField
                        fullWidth
                        label="Destination Name"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={data.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!isFormValid || (isEditMode && !hasChanges) || processing}>
                    {isEditMode ? 'Save Changes' : 'Create'}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default DestinationDialog;
