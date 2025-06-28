import ProfileHero from '@/components/profile/profileHero';
import { useAppContext } from '@/contexts/appContext';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types/types';
import { PageProps } from '@inertiajs/core';
import { usePage, useForm, router } from '@inertiajs/react';
import { Avatar, Button, TextField } from '@mui/material';
import React, { ReactNode, useRef, useState } from 'react';
import { Update } from 'vite/types/hmrPayload.js';
import { UserProps } from '@/types/types';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile() {
    const { APP_URL } = useAppContext();
    const { user } = usePage<UserProps>().props.auth;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    const [originalData, setOriginalData] = useState<Partial<User>>({
        full_name: user.full_name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profile_picture: user.profile_picture
    });
    
    const { data, setData, post,patch, processing, errors, reset, wasSuccessful } = useForm({
        full_name: user.full_name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profile_picture: null as File | null,
        _method:'PUT'
    });

    let isChanged =
        data.full_name !== originalData.full_name ||
        data.email !== originalData.email ||
        data.address !== originalData.address ||
        data.phone !== originalData.phone ||
        data.profile_picture !== null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
   
        // Use router.post to send FormData
        post(route('user.update', user.id), {
            onSuccess: () => window.alert('Profile Updated Successfully'),
            onError: (e: any) => console.log(e),
            onFinish: () => setSaving(false),
            forceFormData: true,
        });
    };
    
    
    
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null;
        if (!file) return;
        const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];
        if (!acceptedFileTypes.includes(file.type)) {
            window.alert('File Type not supported. Choose: JPEG, JPG, PNG or SVG only');
            return;
        }
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            window.alert('File size too large. Maximum size is 5MB');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImg(reader.result as string);
            setData('profile_picture', file);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <ProfileHero />
            <div className="mx-auto mt-8 flex max-w-[1280px] flex-col gap-8 p-8 md:flex-row">
                {/* Photo Section */}
                <div className="flex w-full flex-col items-center rounded-2xl border-[1px] border-gray-300 p-6 md:w-1/3">
                    <Avatar src={previewImg ? previewImg : originalData.profile_picture ? `${APP_URL}/storage/${originalData.profile_picture}` : ''} alt={user.full_name} sx={{ width: 120, height: 120, mb: 2 }} />
                    <div className="mb-2 font-semibold text-teal-800">Photo</div>
                    <div className="mb-4 text-xs text-gray-500">Upload photo up to 5 MB</div>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handlePhotoChange} />
                    <div className="flex flex-col items-stretch gap-4">
                        <Button type="button" variant="text" className="w-full" onClick={() => fileInputRef.current?.click()}>
                            Upload photo
                        </Button>
                        <InputError message={errors.profile_picture as string} />
                    </div>
                </div>

                {/* Personal Info Section */}
                <div className="flex-1 rounded-2xl border-[1px] border-gray-300 p-6 text-teal-800">
                    <div className="mb-4 text-lg font-semibold">Personal information</div>
                    <form className="flex flex-col gap-4" onSubmit={handleSave} encType="multipart/form-data">
                        <div>
                            <Label htmlFor="full_name">Full name</Label>
                            <Input
                                id="full_name"
                                name="full_name"
                                value={data.full_name}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.full_name as string} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="Email"
                            />
                            <InputError message={errors.email as string} />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="Phone"
                            />
                            <InputError message={errors.phone as string} />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={data.address}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="Address"
                            />
                            <InputError message={errors.address as string} />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className='bg-teal-800 text-white py-2 rounded-xl px-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' type="submit"  disabled={!isChanged || processing || saving}>
                                {processing || saving ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Profile.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
