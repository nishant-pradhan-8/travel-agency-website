import ActivityCard from '@/components/admin/activities/activityList';
import ActivityDialog from '@/components/admin/activities/ActivityDialog';
import AdminLayout from '@/layouts/admin/admin-layout';
import { activity, SharedProps } from '@/types/types';
import { usePage, useForm } from '@inertiajs/react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import useDialog from '@/hooks/useDialog';

export default function Activities({ activities }: { activities: activity[] }) {

    const [selectedActivity, setSelectedActivity] = useState<activity | undefined>();
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const { open, handleClickOpen, handleClose } = useDialog();
    const { delete: inertiaDelete } = useForm();

    const handleOpenCreateDialog = () => {
        setDialogMode('create');
        setSelectedActivity(undefined);
        handleClickOpen();
    };

    const handleOpenEditDialog = (activity: activity) => {
        setDialogMode('edit');
        setSelectedActivity(activity);
        handleClickOpen();
    };

    const handleDeleteActivity = (activityToDelete: activity) => {
        inertiaDelete(
            route('activities.destroy', activityToDelete.id),
            {
                onSuccess: () => {
                    window.alert('Activity deleted successfully');
                },
                onError: () => {
                    window.alert('Failed to delete activity');
                },
                preserveState: false,
            }
        );
    };

    // Sort activities by created_at
    const sortedActivities = [...activities].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-teal-800">Travel Activities</h1>
                <Button variant="contained" color="primary" startIcon={<Plus className="h-4 w-4" />} onClick={handleOpenCreateDialog}>
                    Add Activity
                </Button>
            </div>

            <div className="mb-6 flex items-center gap-4">
                <TextField
                    placeholder="Search activities..."
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
                {sortedActivities.map((act) => (
                    <div key={act.id}>
                        <ActivityCard 
                            activity={act} 
                            onEdit={() => handleOpenEditDialog(act)}
                            onDelete={handleDeleteActivity}
                        />
                    </div>
                ))}
            </div>

            <ActivityDialog 
                open={open}
                onClose={handleClose}
                mode={dialogMode}
                activity={selectedActivity}
            />
        </div>
    );
}

Activities.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
