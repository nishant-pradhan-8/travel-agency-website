import PackageCard from '@/components/admin/packages/packageCard';
import PackageDialog from '@/components/admin/packages/packageDialog';
import useDialog from '@/hooks/useDialog';
import AdminLayout from '@/layouts/admin/admin-layout';
import { info, PackageWithRelations, SharedProps } from '@/types/types';
import { usePage } from '@inertiajs/react';
import { Button, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import { Plus, Search } from 'lucide-react';
import { ReactNode, useState } from 'react';

export default function Packages({ packages }: { packages: PackageWithRelations[] }) {
    const { env } = usePage<SharedProps>().props;
    const { open, handleClickOpen, handleClose } = useDialog();
    const [packageList, setPackageList] = useState<PackageWithRelations[]>(
        [...packages].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    );
    const [selectedPackage, setSelectedPackage] = useState<PackageWithRelations>();
    const [destinations, setDestinations] = useState<Partial<info[]> | null>(null);
    const [activities, setActivities] = useState<Partial<info[]> | null>(null);
    const [isCreateMode, setIsCreateMode] = useState(false);

    const getAdditionalInfo = async () => {
        try {
            const [destinationsRes, activitiesRes] = await Promise.all([
                axios.get(`${env.APP_URL}:8000/api/destination`),
                axios.get(`${env.APP_URL}:8000/api/activity`),
            ]);

            const destinations: Partial<info[]> = destinationsRes.data.data;
            const activities: Partial<info[]> = activitiesRes.data.data;

            setDestinations(destinations);
            setActivities(activities);
        } catch (error) {
            console.error('Failed to fetch additional info:', error);
        }
    };

    const handleOpenPackageInfo = async (packageInfo: PackageWithRelations) => {
        await getAdditionalInfo();
        setSelectedPackage(packageInfo);
        setIsCreateMode(false);
        handleClickOpen();
    };

    const handleAddPackage = async () => {
        await getAdditionalInfo();
        setSelectedPackage(undefined);
        setIsCreateMode(true);
        handleClickOpen();
    };

    const handleDialogClose = () => {
        setSelectedPackage(undefined);
        setIsCreateMode(false);
        handleClose();
    };

const deletePackage = (selectedPackage: PackageWithRelations): void => {
        let confirmDelete = window.confirm(`Do you want to delete the package ${selectedPackage.name}?`);
        if (confirmDelete) {
            axios
                .delete(`${env.APP_URL}:8000/api/package/${selectedPackage.id}`)
                .then(() => {
                    window.alert(`Package Deleted Successfully`);
                    const newPackageList: PackageWithRelations[] = packageList.filter((pac) => pac.id !== selectedPackage.id);
                    setPackageList(newPackageList);
                })
                .catch((e) => {
                    console.log(e);
                    const msg = e.response?.data?.message || 'An unexpected error occurred.';
                    window.alert(msg);
                });
        }
    };

    const handleSavePackage = async (packageData: Partial<PackageWithRelations>) => {
        try {
            const formData = new FormData();

            if (isCreateMode) {
                Object.entries(packageData).forEach(([key, value]) => {
                    if (key !== 'image' && value !== null && value !== undefined) {
                        formData.append(key, value.toString());
                    }
                });

                if (packageData.image instanceof File) {
                    formData.append('image', packageData.image);
                }

                await axios
                    .post(`${env.APP_URL}:8000/api/package`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((response) => {
                        setPackageList(
                            [...packageList, response.data.data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
                        );
                        window.alert(response.data.message);
                    });
            } else if (selectedPackage) {
                Object.entries(packageData).forEach(([key, value]) => {
                    if (
                        key !== 'image' &&
                        value !== null &&
                        value !== undefined &&
                        value !== '' &&
                        selectedPackage[key as keyof PackageWithRelations] !== value
                    ) {
                        console.log(`Adding field ${key}:`, {
                            oldValue: selectedPackage[key as keyof PackageWithRelations],
                            newValue: value,
                        });
                        formData.append(key, value.toString());
                    }
                });

                if (packageData.image instanceof File) {
                    formData.append('image', packageData.image);
                }

                console.log('Form Data Contents:');
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }

                if ([...formData.entries()].length === 0) {
                    window.alert('Please edit at least one field');
                    return;
                }

                try {
                    const response = await axios.patch(`${env.APP_URL}:8000/api/package/${selectedPackage.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    const newPackageList = packageList
                        .map((pac) => {
                            if (pac.id === selectedPackage.id) {
                                return response.data.data;
                            }
                            return pac;
                        })
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                    setPackageList(newPackageList);
                    window.alert(response.data.message);
                } catch (error) {
                    console.error('Update error:', error);
                    window.alert('Failed to update package. Please try again.');
                }
            }

            handleDialogClose();
        } catch (error) {
            console.error('Failed to save package:', error);
            window.alert('Failed to save package. Please try again.');
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
                onSave={handleSavePackage}
                destinations={destinations}
                activities={activities}
                mode={isCreateMode ? 'create' : 'view'}
            />
        </div>
    );
}

Packages.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
