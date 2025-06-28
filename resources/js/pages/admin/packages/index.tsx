import PackageCard from '@/components/admin/packages/packageCard';
import PackageDialog from '@/components/admin/packages/packageDialog';
import useDialog from '@/hooks/useDialog';
import AdminLayout from '@/layouts/admin/admin-layout';
import { activity, destination, info, PackageWithRelations, SharedProps } from '@/types/types';
import { usePage, useForm } from '@inertiajs/react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Plus, Search } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useAppContext } from '@/contexts/appContext';

export default function Packages({ packages, destinations, activities }: { packages: PackageWithRelations[], destinations:destination[], activities:activity[] }) {
    const {APP_URL} = useAppContext();
    const { open, handleClickOpen, handleClose } = useDialog();
    const [packageList, setPackageList] = useState<PackageWithRelations[]>(
        [...packages].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    );
    const [selectedPackage, setSelectedPackage] = useState<PackageWithRelations>();
    const [isCreateMode, setIsCreateMode] = useState(false);

    // Inertia form for package operations
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        duration: '',
        discount: 0,
        activity_id: '',
        destination_id: '',
        image: null as File | null,
        _method: isCreateMode?'POST':'PUT'
    });

    const handleOpenPackageInfo = async (packageInfo: PackageWithRelations) => {
        setSelectedPackage(packageInfo);
        setIsCreateMode(false);
        handleClickOpen();
    };

    const handleAddPackage = async () => {
        setSelectedPackage(undefined);
        setIsCreateMode(true);
        reset(); // Reset form for new package
        handleClickOpen();
    };

    const handleDialogClose = () => {
        setSelectedPackage(undefined);
        setIsCreateMode(false);
        reset(); // Reset form when closing
        handleClose();
    };

    const deletePackage = (selectedPackage: PackageWithRelations): void => {
        let confirmDelete = window.confirm(`Do you want to delete the package ${selectedPackage.name}?`);
        if (confirmDelete) {
            destroy(route('packages.destroy', selectedPackage.id), {
                onSuccess: () => {
                    window.alert(`Package Deleted Successfully`);

                },
                onError: (errors) => {
                    console.log(errors);
                    const msg = errors.message || 'An unexpected error occurred.';
                    window.alert(msg);
                },
                preserveState: false
            });
        }
    };

    const handleSavePackage = () => {
        if (isCreateMode) {
            // Create new package
            post('/admin/packages', {
                onSuccess: () => {
                  
                    window.alert('Package created successfully');
                    handleDialogClose();
                },
                onError: (errors) => {
                    console.error('Create error:', errors);
                    window.alert('Failed to create package. Please try again.');
                },
                forceFormData: true,
                preserveState: false,
            });
        } else {
            // Update existing package
            if (!selectedPackage) return;

            // Only send changed fields
            const changedData: any = {};
            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'image' && value !== null && value !== undefined && value !== '' && 
                    selectedPackage[key as keyof PackageWithRelations] !== value) {
                    changedData[key] = value;
                }
            });

            // Add image if it's a File
            if (data.image instanceof File) {
                changedData.image = data.image;
            }

            if (Object.keys(changedData).length === 0) {
                window.alert('Please edit at least one field');
                return;
            }

            post(route(`packages.update`,selectedPackage.id), {
          
                onSuccess: () => {
                  
                    window.alert('Package updated successfully');
                    handleDialogClose();
                },
                onError: (errors) => {
                    console.error('Update error:', errors);
                    window.alert('Failed to update package. Please try again.');
                },
                forceFormData: true,
                preserveState: false
            });
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-teal-800">Available Packages</h1>
                <Button variant="contained" color="primary" startIcon={<Plus className="h-4 w-4" />} onClick={handleAddPackage}>
                    Add Package
                </Button>
            </div>

            <div className="mb-6 flex items-center gap-4">
                <TextField
                    placeholder="Search bookings..."
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
                {packageList.map((pack) => (
                    <div key={pack.id}>
                        <PackageCard packageInfo={pack} onView={() => handleOpenPackageInfo(pack)} onDelete={deletePackage} />
                    </div>
                ))}
            </div>
            <PackageDialog
                open={open}
                onClose={handleDialogClose}
                package={selectedPackage}
                destinations={destinations}
                activities={activities}
                mode={isCreateMode ? 'create' : 'view'}
                onSave={handleSavePackage}
                form={{ data, setData, post, put, processing, errors }}
                setData={setData}
                post={post}
                processing={processing}
                errors={errors}
            />
        </div>
    );
}

Packages.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
