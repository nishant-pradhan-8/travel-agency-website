import { Departure, FormData, Package } from "@/types/types";
import BookingDetails from "./bookingDetails";
import BookingPreference from "./bookingPreference";
import { InertiaFormProps, useForm } from "@inertiajs/react";

interface BookingsInfoProps {
  packageInfo: Package;
  departures: Departure[];
}

export default function BookingsInfo({packageInfo, departures}: BookingsInfoProps) {
    
  const form = useForm<FormData>({
    number_of_person: 1,
    departure_id: null,
    messege: '',
    totalPrice:null
  });

  const { data } = form;

  return (
    <div className="m-auto grid max-w-[1280px] grid-cols-[2fr_1fr] gap-4 p-4 text-black">
       <BookingPreference  packageInfo={packageInfo} departures={departures} form={form}/>
        <BookingDetails   packageInfo={packageInfo} data={data} form={form} />
    </div>
  );
}
