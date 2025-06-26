import { User } from '@/types/types';
import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '@/contexts/appContext';
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
    const [userList, setUserList] = useState<User[]>(users)
    const { APP_URL } = useAppContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [updating, setUpdating] = useState<boolean>(false)
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = async() => {
        
        if(!selectedUser){
            return
        }
        const body = {
            'account_status': selectedUser.account_status==="active"?"blocked":'active'
        }
        setUpdating(true)
        await axios
        .post(`${APP_URL}/api/user/${selectedUser.id}?_method=PUT`, body)
        .then((response) => {
            window.alert(response.data.message);
            const newUserList:User[] = userList.map((u)=>{
                if(u.id===selectedUser.id){
                    return response.data.data
                }else{
                    return u;
                }
            })
        }).catch((e)=>{
            const errorMsg = e.response.data.message || "Unable to update. Please Try again"
            window.alert(errorMsg)
        }).finally(()=>{
            setUpdating(false)
        });


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
                        {userList.map((user) => (
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
                <MenuItem disabled={updating} onClick={handleEditClick}>{selectedUser?.account_status==='active'?"Block":"Unblock"}</MenuItem>
                <MenuItem onClick={handleDeleteClick} className="text-red-600">Delete User</MenuItem>
            </Menu>
        </>
    );
}