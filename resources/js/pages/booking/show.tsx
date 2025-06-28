import BookingNav from "@/components/bookingsComponents/bookingsNav"
import { Departure, Package } from "@/types/types"
import BookingsInfo from "@/components/bookingsComponents/bookingsInfo"
import { useForm } from "@inertiajs/react";
import { FormData } from "@/types/types";
export default function Booking({packageInfo, departures}:{packageInfo:Package, departures:Departure[]}){
    
    return(
        <>
        <BookingNav  packageInfo={packageInfo} />
        <BookingsInfo packageInfo={packageInfo} departures={departures} />
        </>
    )
}