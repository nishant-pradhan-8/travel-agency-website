import CallToActionSectionBH from "@/components/bookingHistoryComponents/bookingHistoryCTA"
import BookingsHero from "@/components/bookingHistoryComponents/bookingHistoryHero"
import BookingHistoryTable from "@/components/bookingHistoryComponents/bookingHistoryTable"
import AppLayout from "@/layouts/app-layout"
import type { BookingHistory } from "@/types/types"
import { ReactNode } from "react"


export default function BookingHistory({bookings}:{bookings:BookingHistory[]}){
    console.log(bookings, 'bookings')
    return(
        <>
            <BookingsHero />
            <main>
                <div  className="max-w-[1440px] px-4 m-auto my-18">
   <h2 className="mb-8 stroke-1 text-center font-[playfair] text-4xl font-bold text-teal-800">Your Booking History</h2>
                <div>
                 <BookingHistoryTable bookings={bookings} />
                </div>
       
                </div>
                
             <section className="cta bg-[#141B34]">
                                <CallToActionSectionBH />
             </section>
            </main>

        </>
    )
}

BookingHistory.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
