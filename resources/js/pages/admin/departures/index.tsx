import DepartureTable from "@/components/admin/departures/departureTable";
import AdminLayout from "@/layouts/admin/admin-layout";
import { Departure, info, Package } from "@/types/types";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Plus, Search } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import useDialog from "@/hooks/useDialog";
import { useAppContext } from "@/contexts/appContext";
export default function Departures({departures, packages}:{departures:Departure[], packages:info[]}){
  
    const { open: addOpen, handleClickOpen: handleAddOpen, handleClose: handleAddClose } = useDialog();
  console.log(packages)
    return (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-teal-800">Package Departure Schedules</h1>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Plus className="h-4 w-4" />}
                onClick={handleAddOpen}
            >
                Add Departure
            </Button>
          </div>
    
          <div className="flex items-center gap-4 mb-6">
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
        <DepartureTable 
            departures={departures} 
            addOpen={addOpen}
            handleAddClose={handleAddClose}
            packages={packages}
        />
          
        </div>
      );
}

Departures.layout = (page:ReactNode)=><AdminLayout>{page}</AdminLayout>