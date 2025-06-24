import { activity, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
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
}

interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  activity?: activity;
  onSave: (data: activity) => void;
}

const ActivityDialog: React.FC<ActivityDialogProps> = ({ open, onClose, mode, activity, onSave }) => {
  const {APP_URL} = useAppContext();
  const [formData, setFormData] = React.useState<ActivityFormData>({
    name: activity?.name || '',
    description: activity?.description || '',
  });

  React.useEffect(() => {
    if (mode === "edit" && activity) {
      setFormData({
        name: activity.name,
        description: activity.description,
      });
    }else if (mode === "create") {
      setFormData({
          name: '',
          description: '',
      });
  }
  }, [activity, mode]);

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
        .post(`${APP_URL}/api/activity`, formData, {
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
      const reqBody: Partial<ActivityFormData> = {};
      
      if (activity && formData.name !== activity.name) {
        reqBody.name = formData.name;
      }
      if (activity && formData.description !== activity.description) {
        reqBody.description = formData.description;
      }

      if (Object.keys(reqBody).length > 0) {
        axios
          .patch(`${APP_URL}/api/activity/${activity?.id}`, reqBody, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(function (res) {
            onSave({ ...activity, ...formData } as activity);
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
  const hasChanges = isEditMode && activity && (
    formData.name !== activity.name || 
    formData.description !== activity.description
  );

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

export default ActivityDialog; 