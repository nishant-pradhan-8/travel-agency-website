import { destination, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
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
}

interface DestinationDialogProps {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    destination?: destination;
    onSave: (data: destination) => void;
}

const DestinationDialog: React.FC<DestinationDialogProps> = ({ open, onClose, mode, destination, onSave }) => {
    const { env } = usePage<SharedProps>().props;
    const [formData, setFormData] = React.useState<DestinationFormData>({
        name: destination?.name || '',
        description: destination?.description || '',
    });

    React.useEffect(() => {
        if (destination) {
            setFormData({
                name: destination.name,
                description: destination.description,
            });
        }
    }, [destination]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (mode === 'create') {
            axios
                .post(`${env.APP_URL}:8000/api/destination`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(function (res) {
                    onSave(res.data.data);
                    onClose();
                   window.alert(res.data.message); 
                })
                .catch(function (err) {
                    window.alert(err.response.data.message);
                });
        } else {
            const reqBody: Partial<DestinationFormData> = {};

            if (destination && formData.name !== destination.name) {
                reqBody.name = formData.name;
            }
            if (destination && formData.description !== destination.description) {
                reqBody.description = formData.description;
            }

            if (Object.keys(reqBody).length > 0) {
                axios
                    .patch(`${env.APP_URL}:8000/api/destination/${destination?.id}`, reqBody, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(function (res) {
                      console.log(res)
                        onSave({ ...destination, ...formData } as destination);
                        onClose();
                        window.alert(res.data.message);
                    })
                    .catch(function (err) {
                        window.alert(err.response.data.message);
                    });
            } else {
                onClose();
            }
        }
    };

    const isFormValid = formData.name.trim() !== '' && formData.description.trim() !== '';
    const isEditMode = mode === 'edit';
    const hasChanges = isEditMode && destination && (formData.name !== destination.name || formData.description !== destination.description);

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
                        value={formData.name}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
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
                <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!isFormValid || (isEditMode && !hasChanges)}>
                    {isEditMode ? 'Save Changes' : 'Create'}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default DestinationDialog;
