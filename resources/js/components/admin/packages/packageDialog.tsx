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
import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";
import axios from "axios";
import { SharedProps } from "@/types/types";
import { FaCamera } from "react-icons/fa";

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
  onSave: (packageData: Partial<PackageWithRelations>) => void;
  destinations: Partial<info[]> | null;
  activities: Partial<info[]> | null;
  mode: 'create' | 'edit' |'view';
}

interface FormData {
  id: number;
  name: string;
  description: string;
  image: string | File;
  price: string;
  discount: number;
  duration: string;
  destination_id: number;
  activity_id: number;
}

const PackageDialog: React.FC<PackageDialogProps> = ({ 
  open, 
  onClose, 
  package: packageInfo, 
  onSave,
  destinations,
  activities,
  mode
}) => {
  const { env } = usePage<SharedProps>().props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Package>>({
    name: '',
    description: '',
    price: '',
    duration: '',
    discount: 0,
    activity_id: undefined,
    destination_id: undefined
  });
  const [isEditMode, setIsEditMode] = useState(mode === 'edit' || mode === 'create');
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  useEffect(() => {
    if (packageInfo) {
      setFormData(packageInfo);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        discount: 0,
        activity_id: undefined,
        destination_id: undefined
      });
    }
    setIsEditMode(mode === 'edit' || mode === 'create');
  }, [packageInfo, mode]);

  useEffect(() => {
    if (!open) {
      setPreviewImg(null);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        setFormData(prev => ({
          ...prev,
          image: file
        }));
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
    onSave(formData);
  };

  const isFormValid = formData.name?.trim() !== '' && 
                     formData.description?.trim() !== '' && 
                     formData.price && 
                     formData.duration && 
                     formData.activity_id && 
                     formData.destination_id 


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
              className={`w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative ${isEditMode ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            >
              {formData.image ? (
                <img 
              
           src={previewImg?previewImg:typeof formData.image === 'string'
      ? `${env.APP_URL}:8000/storage/${formData.image}`
      : ''}
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
            value={formData.name || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
            required
          />
          <TextField
            name="price"
            label="Price"
            value={formData.price || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
            required
          />
          <TextField
            name="duration"
            label="Duration"
            value={formData.duration || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
            required
          />
          <TextField
            name="discount"
            label="Discount"
            type="number"
            
            value={formData.discount || ''}
            onChange={handleChange}
            fullWidth
            disabled={!isEditMode}
          />
          <FormControl fullWidth>
            <InputLabel>Activity</InputLabel>
            <Select
              name="activity_id"
              value={formData.activity_id || ''}
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
          <FormControl fullWidth>
            <InputLabel>Destination</InputLabel>
            <Select
              name="destination_id"
              value={formData.destination_id || ''}
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
            value={formData.description || ''}
            onChange={handleChange}
            multiline
            rows={8}
            fullWidth
            className="col-span-2"
            disabled={!isEditMode}
            required
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
            disabled={!isFormValid}
          >
            {mode === 'create' ? 'Create Package' : 'Save Changes'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PackageDialog; 