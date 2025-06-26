import { Departure, FormData, Package } from "@/types/types";
import BookingDetails from "./bookingDetails";
import BookingPreference from "./bookingPreference";
import { useState } from "react";


export default function BookingsInfo({packageInfo, departures}:{packageInfo:Package, departures:Departure[]}) {
   
    return (
        <div className="m-auto grid max-w-[1280px] grid-cols-[2fr_1fr] gap-4 p-4 text-black">
           <BookingPreference  packageInfo={packageInfo} departures={departures}/>
            <BookingDetails   packageInfo={packageInfo} />
        </div>
    );
}
