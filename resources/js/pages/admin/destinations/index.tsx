import DestinationCard from '@/components/admin/destinations/destinationList';
import DestinationDialog from '@/components/admin/destinations/DestinationDialog';
import AdminLayout from '@/layouts/admin/admin-layout';
import { destination, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import useDialog from '@/hooks/useDialog';
import axios from 'axios';

export default function Destinations({ destinations }: { destinations: destination[] }) {
    const { env } = usePage<SharedProps>().props;
    const [newDestinations, setNewDestinations] = useState<destination[]>(destinations);
    const [selectedDestination, setSelectedDestination] = useState<destination | undefined>();
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const { open, handleClickOpen, handleClose } = useDialog();

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

    const handleSaveDestination = (updatedDestination: destination) => {
        if (dialogMode === 'create') {
            setNewDestinations([...newDestinations, updatedDestination]);
        } else {
            setNewDestinations(newDestinations.map(dest => 
                dest.id === updatedDestination.id ? updatedDestination : dest
            ));
        }
    };

    const handleDestinationDelete = (destinationToDelete: destination) => {
        axios
            .delete(`${env.APP_URL}:8000/api/destination/${destinationToDelete.id}`)
            .then(function (res) {
                setNewDestinations(newDestinations.filter(dest => dest.id !== destinationToDelete.id));
                window.alert(res.data.message);
            })
            .catch(function (err) {
                window.alert(err.response.data.message);
            });
    };
    
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
                {newDestinations.map((dest) => (
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
                onSave={handleSaveDestination}
            />
        </div>
    );
}

Destinations.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
