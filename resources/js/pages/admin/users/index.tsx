import React from 'react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Search } from 'lucide-react';
import { User } from '@/types/types';
import UsersTable from '@/components/admin/users/usersTable';

interface UsersPageProps {
    users: User[];
}

export default function Users({ users }: UsersPageProps) {
    console.log(users)
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-teal-800">Customers</h1>
            </div>
    
            <div className="flex items-center gap-4 mb-6">
                <TextField
                    placeholder="Search users..."
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
            <UsersTable users={users} />
        </div>
    );
}

Users.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;