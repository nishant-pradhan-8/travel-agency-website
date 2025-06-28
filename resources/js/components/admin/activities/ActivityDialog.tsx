import { activity, SharedProps } from '@/types/types';
import { usePage, useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAppContext } from '@/contexts/appContext';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface ActivityFormData {
  name: string;
  description: string;
  [key:string]:any;
}

interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  activity?: activity;
}

const ActivityDialog: React.FC<ActivityDialogProps> = ({ open, onClose, mode, activity }) => {
  const { data, setData, post, patch, processing, errors, reset } = useForm<ActivityFormData>({
    name: '',
    description: '',
  });

  React.useEffect(() => {
    if (mode === "edit" && activity) {
      setData({
        name: activity.name,
        description: activity.description,
      });
    } else if (mode === "create") {
      reset();
    }
  }, [activity, mode, setData, reset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as keyof ActivityFormData, value);
  };

  const handleSubmit = () => {
    if (mode === 'create') {
      post(route('activities.store'), {
        onSuccess: () => {
          onClose();
          window.alert('Activity created successfully');
        },
        onError: () => {
          window.alert('Failed to create activity');
        },
        preserveState: false,
      });
    } else if (mode === 'edit' && activity) {
      patch(route('activities.update', activity.id), {
        onSuccess: () => {
          onClose();
          window.alert('Activity updated successfully');
        },
        onError: () => {
          window.alert('Failed to update activity');
        },
        preserveState: false,
      });
    }
  };

  const isFormValid = data.name.trim() !== '' && data.description.trim() !== '';
  const isEditMode = mode === 'edit';
  const hasChanges = isEditMode && activity && (data.name !== activity.name || data.description !== activity.description);

  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {isEditMode ? 'Edit Activity' : 'Add New Activity'}
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
            label="Activity Name"
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
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!isFormValid || (isEditMode && !hasChanges) || processing}
        >
          {isEditMode ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ActivityDialog; 