import ProfileHero from '@/components/profile/profileHero';
import { useAppContext } from '@/contexts/appContext';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types/types';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Avatar, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { ReactNode, useRef, useState } from 'react';
import { Update } from 'vite/types/hmrPayload.js';
import { UserProps } from '@/types/types';
interface UpdateProfile {
    profile_picture: File | null;
    full_name: string;
    email: string;
    address: string;
    phone: string;
}

interface ValidationErrors {
    full_name?: string;
    email?: string;
    address?: string;
    phone?: string;
}

export default function Profile() {
    const { APP_URL } = useAppContext();
    const { user } = usePage<UserProps>().props.auth;
    console.log(user)
    const [formData, setFormData] = useState<UpdateProfile>({
        full_name: user.full_name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profile_picture: null as File | null,
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImg, setPreviewImg] = useState<Base64URLString | null>(null);
    const [saving, setSaving] = useState<boolean>(false)
    const [originalData, setOriginalData] = useState<Partial<User>>({
        full_name: user.full_name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profile_picture: user.profile_picture
    });
    let isChanged =
        formData.full_name !== originalData.full_name ||
        formData.email !== originalData.email ||
        formData.address !== originalData.address ||
        formData.phone !==originalData.phone ||
        formData.profile_picture !== null 

    const validate = (): boolean => {
        const newErrors: ValidationErrors = {};
        if (!formData.full_name) newErrors.full_name = 'Full name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d+$/.test(String(formData.phone))) {
            newErrors.phone = 'Phone must be numeric';
        } else if (formData.phone.length < 7 || formData.phone.length > 20) {
            newErrors.phone = 'Phone number must be be greater than 7 and less than 20 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof ValidationErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSave = async () => {
        setSaving(true)
        const form = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
            if (
                key !== 'profile_picture' &&
                val !== null &&
                val !== undefined &&
                formData[key as keyof typeof formData] !== originalData[key as keyof typeof originalData]
            ) {
                form.append(key, val.toString());
            }
        });
        if (formData.profile_picture instanceof File) {
            form.append('profile_picture', formData.profile_picture);
        }
        await axios
            .post(`${APP_URL}/api/user/${user.id}?_method=PUT`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                window.alert(response.data.message);
                setOriginalData({
                    full_name: formData.full_name,
                    email: formData.email,
                    address: formData.address,
                    phone: formData.phone,
                    profile_picture: null,
                });
               
                setFormData((prev) => ({ ...prev, profile_picture: null }));
            }).catch((e)=>{
                const errorMsg = e.response.data.message || "Unable to update. Please Try again"
                window.alert(errorMsg)
            }).finally(()=>{
                setSaving(false)
            });

        if (!validate()) {
            return;
        }

    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null;
        if (!file) {
            return;
        }
        const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
        if (!acceptedFileTypes.includes(file?.type)) {
            window.alert('File Type not supported. Choose: JPEG, JPG, PNG or SVG only');
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            window.alert('File size too large. Maximum size is 5MB');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setPreviewImg(base64String);
            setFormData((prev) => ({
                ...prev,
                profile_picture: file,
            }));
        };
        reader.readAsDataURL(file);
    };
   
    console.log(`${APP_URL}/storage/${originalData.profile_picture}`)
    return (
        <>
            <ProfileHero />
            <div className="mx-auto mt-8 flex max-w-[1280px] flex-col gap-8 p-8 md:flex-row">
                {/* Photo Section */}
                <div className="flex w-full flex-col items-center rounded-2xl border-[1px] border-gray-300 p-6 md:w-1/3">
                    <Avatar src={previewImg ? previewImg: originalData.profile_picture? `${APP_URL}/storage/${originalData.profile_picture}`:''} alt={user.full_name} sx={{ width: 120, height: 120, mb: 2 }} />
                    <div className="mb-2 font-semibold text-teal-800">Photo</div>
                    <div className="mb-4 text-xs text-gray-500">Upload photo up to 5 MB</div>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handlePhotoChange} />
                    <div className="flex flex-col items-stretch gap-4">
                        <Button variant="contained" color="primary" className="w-full" onClick={() => fileInputRef.current?.click()}>
                            Upload photo
                        </Button>
                    
                    </div>
                </div>

                {/* Personal Info Section */}
                <div className="flex-1 rounded-2xl border-[1px] border-gray-300 p-6 text-teal-800">
                    <div className="mb-4 text-lg font-semibold">Personal information</div>
                    <form className="flex flex-col gap-4">
                        <TextField
                            label="Full name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.full_name}
                            helperText={errors.full_name}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                        <div className="mt-4 flex justify-end">
                            <Button variant="contained" color="primary" onClick={handleSave} disabled={!isChanged || saving}>
                                Save changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Profile.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
