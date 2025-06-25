import { User } from '@/types/types';
import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

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

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {

        handleMenuClose();
    };

    const handleDeleteClick = () => {
        // Handle delete user logic here
        console.log('Delete user:', selectedUser);
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
                                Role
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Joined Date
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
                                <TableCell align="center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        user.isAdmin ? 'bg-blue-100 text-blue-800' : ' text-gray-800'
                                    }`}>
                                        {user.isAdmin ? 'Admin' : 'Customer'}
                                    </span>
                                </TableCell>
                                <TableCell align="center">{user.created_at.split('T')[0]}</TableCell>
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
                <MenuItem onClick={handleEditClick}>{selectedUser?.account_status==='active'?"Block":"Unblock"}</MenuItem>
                <MenuItem onClick={handleDeleteClick} className="text-red-600">Delete User</MenuItem>
            </Menu>
        </>
    );
}