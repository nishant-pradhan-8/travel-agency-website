import ActivityCard from '@/components/admin/activities/activityList';
import ActivityDialog from '@/components/admin/activities/ActivityDialog';
import AdminLayout from '@/layouts/admin/admin-layout';
import { activity, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import useDialog from '@/hooks/useDialog';
import axios from 'axios';

export default function Activities({ activities }: { activities: activity[] }) {
    const { env } = usePage<SharedProps>().props;
    const [newActivities, setNewActivities] = useState<activity[]>(activities.sort((a,b)=>new Date(b.created_at).getDate() - new Date(a.created_at).getDate()));
    const [selectedActivity, setSelectedActivity] = useState<activity | undefined>();
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const { open, handleClickOpen, handleClose } = useDialog();

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

    const handleSaveActivity = (updatedActivity: activity) => {
        if (dialogMode === 'create') {
            setNewActivities([ updatedActivity,...newActivities]);
        } else {
            setNewActivities(newActivities.map(act => 
                act.id === updatedActivity.id ? updatedActivity : act
            ));
        }
    };

    const handleDeleteActivity = (activityToDelete: activity) => {
        axios
            .delete(`${env.APP_URL}/api/activity/${activityToDelete.id}`)
            .then(function (res) {
                setNewActivities(newActivities.filter(act => act.id !== activityToDelete.id));
                window.alert(res.data.message);
            })
            .catch(function (err) {
                window.alert(err.response.data.message);
            });
    };
    
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
                {newActivities.map((act) => (
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
                onSave={handleSaveActivity}
            />
        </div>
    );
}

Activities.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
