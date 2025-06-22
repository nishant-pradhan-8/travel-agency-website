import BookingNav from "@/components/bookingsComponents/bookingsNav"
import { departure, Package } from "@/types/types"
import BookingsInfo from "@/components/bookingsComponents/bookingsInfo"
export default function Booking({packageInfo, departures}:{packageInfo:Package, departures:departure[]}){
    
    return(
        <>
        <BookingNav  packageInfo={packageInfo} />
        <BookingsInfo packageInfo={packageInfo} departures={departures} />
        </>
    )
}