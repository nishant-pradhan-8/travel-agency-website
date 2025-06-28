import { useAppContext } from '@/contexts/appContext';
import useDialog from '@/hooks/useDialog';
import { Departure, info, Package } from '@/types/types';
import { Button, Chip, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import DepartureEditDialog from './editDepartureDialog';
import AddDepartureDialog from './addDepartureDialog';


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



interface BookingsTableProps {
    departures: Departure[];
    addOpen: boolean;
    handleAddClose: () => void;
    packages: info[]
}

export default function DepartureTable({ departures, addOpen, handleAddClose, packages }: BookingsTableProps) {
    const [departureHistory, setDepartureHistory] = useState<Departure[]>([...departures].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    const { open: editOpen, handleClickOpen: handleEditOpen, handleClose: handleEditClose } = useDialog();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(null);
    const [packageList, setPackageList] = useState<info[] | null>(null)
  

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, departure: Departure) => {
        setAnchorEl(event.currentTarget);
        setSelectedDeparture(departure);
    };

    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        handleEditOpen();
        handleMenuClose();
    };

    useEffect(()=>{
        if(!packageList){
         setPackageList(packages)
          }
        
   
      },[])

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Departure Id
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Departure Date
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Package Name
                            </StyledTableCell>
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Available Slots
                            </StyledTableCell>
                        
                            <StyledTableCell align="center" className="border-r-[1px] border-gray-300 !bg-teal-800 py-1">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departureHistory.map((departure) => (
                            <StyledTableRow key={departure.id}>
                                <TableCell align="center">#{departure.id}</TableCell>
                                <TableCell align="center">{new Date(departure.departure_date).toLocaleDateString()}</TableCell>
                                <TableCell align="center">{departure.package?.name || 'N/A'}</TableCell>
                                <TableCell align="center">{departure.available_slots}</TableCell>
                             
                                <TableCell align="center">
                                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, departure)}>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>Edit Departure</MenuItem>
            </Menu>

            {selectedDeparture && (
                <DepartureEditDialog
                    departure={selectedDeparture}
                    handleClose={handleEditClose}
                    open={editOpen}
                    
                    packageList = {packageList}
                />
            )}

            <AddDepartureDialog
                handleClose={handleAddClose}
                open={addOpen}
                packageList = {packageList}
            />
        </>
    );
}
