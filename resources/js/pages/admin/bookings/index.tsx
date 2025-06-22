import AdminLayout from "@/layouts/admin/admin-layout";
import { BookingHistory } from "@/types/types";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";
import BookingsTable from "@/components/admin/bookings/bookingsTable";

export default function Bookings({ bookings }: { bookings: BookingHistory[] }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-800">Customer Bookings</h1>
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

      <BookingsTable bookings={bookings} />
    </div>
  );
}

Bookings.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;