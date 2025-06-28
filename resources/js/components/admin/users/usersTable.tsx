import { User } from '@/types/types';
import { useForm } from '@inertiajs/react';
import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface UsersTableProps {
    users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { data,setData,post, delete:InertiaDelete,patch, processing } = useForm();
    useEffect(()=>{
        setData({
              account_status: selectedUser?.account_status === 'active' ? 'blocked' : 'active'
        })
    },[selectedUser])

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = async () => {
        if (!selectedUser) {
            return;
        }
      

        const confirm = window.confirm(`Do you want to ${selectedUser.account_status === 'active' ? 'block' : 'unblock'} the user ${selectedUser.full_name}?`);
        if (confirm) {
        console.log(data)
        
            patch(route('users.update', selectedUser.id), {
                onSuccess: () => {
                    window.alert('User status updated successfully');
                },
                onError: () => {
                    window.alert('Unable to update. Please Try again');
                },
                preserveState: false,
            });
            handleMenuClose();
            
        }
    };

    const handleDeleteClick = () => {
        if (!selectedUser) {
            return;
        }
        const confirm = window.confirm(`Do you want to delete user ${selectedUser.full_name}?`);
        if(!confirm){
            return
        }
       InertiaDelete(route('users.destroy',selectedUser.id), {
        onSuccess: () => {
            window.alert('User deleted successfully');
        },
        onError: () => {
            window.alert('Unable to delete. Please Try again');
        },
        preserveState: false,
    })
     
  
        handleMenuClose();
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                User ID
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Full Name
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Email
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Phone
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Address
                            </StyledTableCell>

                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Joined Date
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Account Status
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <TableCell align="center">#{user.id}</TableCell>
                                <TableCell align="center">{user.full_name}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.phone}</TableCell>
                                <TableCell align="center">{user.address}</TableCell>

                                <TableCell align="center">{user.created_at.split('T')[0]}</TableCell>
                                <TableCell align="center">{user.account_status}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem disabled={processing} onClick={handleEditClick}>
                    {selectedUser?.account_status === 'active' ? 'Block' : 'Unblock'}
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} className="text-red-600">
                    Delete User
                </MenuItem>
            </Menu>
        </>
    );
}
