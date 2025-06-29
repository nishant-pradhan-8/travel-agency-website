import DestinationCard from '@/components/admin/destinations/destinationList';
import DestinationDialog from '@/components/admin/destinations/DestinationDialog';
import AdminLayout from '@/layouts/admin/admin-layout';
import { destination, SharedProps } from '@/types/types';
import { useForm, usePage } from '@inertiajs/react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import useDialog from '@/hooks/useDialog';
import axios from 'axios';

export default function Destinations({ destinations }: { destinations: destination[] }) {
    const { env } = usePage<SharedProps>().props;
    const [selectedDestination, setSelectedDestination] = useState<destination | undefined>();
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const { open, handleClickOpen, handleClose } = useDialog();
    const { delete: inertiaDelete } = useForm();

    const handleOpenCreateDialog = () => {
        setDialogMode('create');
        setSelectedDestination(undefined);
        handleClickOpen();
    };

    const handleOpenEditDialog = (destination: destination) => {
        setDialogMode('edit');
        setSelectedDestination(destination);
        handleClickOpen();
    };

    const handleDestinationDelete = (destinationToDelete: destination) => {
        inertiaDelete(
            route('destinations.destroy', destinationToDelete.id),
            {
                onSuccess: () => {
                   window.alert('Destination deleted successfully');
                },
                onError: () => {
                    window.alert('Failed to delete destination');
                },
                preserveState: false,
            }
        );
    };
    
    const sortedDestinations = [...destinations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-teal-800">Travel Destinations</h1>
                <Button variant="contained" color="primary" startIcon={<Plus className="h-4 w-4" />} onClick={handleOpenCreateDialog}>
                    Add Destination
                </Button>
            </div>

            <div className="mb-6 flex items-center gap-4">
                <TextField
                    placeholder="Search destinations..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search className="h-4 w-4 text-gray-500" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="outlined">Filter</Button>
            </div>

            <div className="flex flex-col gap-4">
                {sortedDestinations.map((dest) => (
                    <div key={dest.id}>
                        <DestinationCard 
                            destination={dest} 
                            onEdit={() => handleOpenEditDialog(dest)}
                            onDelete={handleDestinationDelete}
                        />
                    </div>
                ))}
            </div>

            <DestinationDialog 
                open={open}
                onClose={handleClose}
                mode={dialogMode}
                destination={selectedDestination}
            
            />
        </div>
    );
}

Destinations.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
