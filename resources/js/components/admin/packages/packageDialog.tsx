import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { destination, PackageWithRelations, info, Package } from "@/types/types";
import { usePage, useForm } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";
import { SharedProps } from "@/types/types";
import { FaCamera } from "react-icons/fa";
import { useAppContext } from '@/contexts/appContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface PackageDialogProps {
  open: boolean;
  onClose: () => void;
  package: PackageWithRelations | undefined;
  destinations: Partial<info[]> | null;
  activities: Partial<info[]> | null;
  mode: 'create' | 'edit' |'view';
  onSave: () => void;
  form: any; // Inertia form object
  setData: (key: string, value: any) => void;
  post: (url: string, options?: any) => void;
  processing: boolean;
  errors: any;
}

const PackageDialog: React.FC<PackageDialogProps> = ({ 
  open, 
  onClose, 
  package: packageInfo, 
  destinations,
  activities,
  mode,
  onSave,
  form,
  setData,
  post,
  processing,
  errors
}) => {
const {APP_URL} = useAppContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(mode === 'edit' || mode === 'create');
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  useEffect(() => {
    if (packageInfo && mode !== 'create') {
      // Set form data when package is selected for edit/view
      setData('name', packageInfo.name || '');
      setData('description', packageInfo.description || '');
      setData('price', packageInfo.price || '');
      setData('duration', packageInfo.duration || '');
      setData('discount', packageInfo.discount || 0);
      setData('activity_id', packageInfo.activity_id || '');
      setData('destination_id', packageInfo.destination_id || '');
      setData('image', null);
    } else if (mode === 'create') {
      // Reset form for create mode
      setData('name', '');
      setData('description', '');
      setData('price', '');
      setData('duration', '');
      setData('discount', 0);
      setData('activity_id', '');
      setData('destination_id', '');
      setData('image', null);
    }
    setIsEditMode(mode === 'edit' || mode === 'create');
  }, [packageInfo, mode, setData]);

  useEffect(() => {
    if (!open) {
      setPreviewImg(null);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    if(!file){
      return;
    }

    const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg']
    if(!acceptedFileTypes.includes(file?.type)){
      window.alert("File Type not supported. Choose: JPEG, JPG, PNG or SVG only")
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      window.alert("File size too large. Maximum size is 5MB")
      return;
    }
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImg(base64String);
        setData('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = () => {
    setIsEditMode(false);
    onSave(); 
  };

  const isFormValid = form.data.name?.trim() !== '' && 
                     form.data.description?.trim() !== '' && 
                     form.data.price && 
                     form.data.duration && 
                     form.data.activity_id && 
                     form.data.destination_id;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <span>{mode === 'create' ? 'Add New Package' : 'Package Information'}</span>
        {mode === 'edit' || mode==="view" && (
          <FormControlLabel
            control={
              <Switch
                checked={isEditMode}
                onChange={(e) => setIsEditMode(e.target.checked)}
                color="primary"
              />
            }
            label="Edit Mode"
          />
        )}
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-2">
            <div 
              className={`w-full h-48  bg-gray-100 rounded-lg overflow-hidden relative ${isEditMode ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            >
              <div className={`overlay  bg-[#8080809e] absolute top-0 left-0 w-full h-full ${isEditMode && 'hidden'}`}></div>
              {form.data.image || packageInfo?.image ? (
                <img 
                  src={previewImg || (packageInfo?.image ? `${APP_URL}/storage/${packageInfo.image}` : '')}
                  alt="Package preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaCamera size={40} className="text-gray-400" />
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={!isEditMode}
              />
            </div>
          </div>

          <TextField
            name="name"
            label="Package Name"
            value={form.data.name || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            name="price"
            label="Price"
            value={form.data.price || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
            required
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            name="duration"
            label="Duration"
            value={form.data.duration || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
            required
            error={!!errors.duration}
            helperText={errors.duration}
          />
          <TextField
            name="discount"
            label="Discount"
            type="number"
            value={form.data.discount || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
            error={!!errors.discount}
            helperText={errors.discount}
          />
          <FormControl fullWidth error={!!errors.activity_id}>
            <InputLabel>Activity</InputLabel>
            <Select
              name="activity_id"
              value={form.data.activity_id || ''}
              onChange={handleChange}
              label="Activity"
              disabled={!isEditMode}
              required
            >
              {activities?.map((activity: any) => (
                <MenuItem key={activity.id} value={activity.id}>
                  {activity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth error={!!errors.destination_id}>
            <InputLabel>Destination</InputLabel>
            <Select
              name="destination_id"
              value={form.data.destination_id || ''}
              onChange={handleChange}
              label="Destination"
              disabled={!isEditMode}
              required
            >
              {destinations?.map((destination: any) => (
                <MenuItem key={destination.id} value={destination.id}>
                  {destination.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="description"
            label="Description"
            value={form.data.description || ''}
            onChange={handleChange}
            multiline
            rows={8}
            fullWidth
            className="col-span-2"
            disabled={!isEditMode}
            required
            error={!!errors.description}
            helperText={errors.description}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {(isEditMode || mode === 'create') && (
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!isFormValid || processing}
          >
            {processing ? 'Saving...' : (mode === 'create' ? 'Create Package' : 'Save Changes')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PackageDialog; 