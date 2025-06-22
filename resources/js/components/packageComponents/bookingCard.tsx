import { Package } from "@/types/types";
import { Link } from "@inertiajs/react";
import { FaFire, FaClipboardList } from "react-icons/fa";

export default function BookingCard({packageInfo}:{packageInfo:Package}) {
  return (
    <div className="max-w-xs sticky top-0 bg-[#122139] text-white rounded-xl shadow-lg overflow-hidden font-sans">
      <div className="bg-[#122139] text-center py-4 border-b border-white/20">
        <h2 className="text-lg font-bold">Make A Booking</h2>
      </div>

      <div className="bg-white text-black rounded-xl mx-3 mt-3 p-4 space-y-4">
        <div className="text-center font-semibold text-[#122139]">
          Package Information
        </div>

        <div className="flex justify-between">
          <span>Price Per Person</span>
          <span className="font-semibold">US ${packageInfo.price}</span>
        </div>
        <div className="flex justify-between">
          <span>Upcomming Departures</span>
          <span className="font-semibold">Available</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
        Discount
          </span>
          <span className="text-green-600 font-semibold">Up To {packageInfo.discount}%</span>
        </div>
        <div className="flex justify-between">
          <span>Other Fees</span>
          <span className="text-green-600 font-semibold">Free</span>
        </div>

        <hr className="border-t border-gray-300" />

        <div className="flex justify-between text-[#122139] font-bold text-lg">
          <span>Total</span>
          <span>US ${Math.round(Number(packageInfo.price)-((Number(packageInfo.discount)/100)*Number(packageInfo.price)))}</span>
        </div>
      </div>

      <div className="mx-3 mt-4 space-y-3 pb-4">
        <Link href={route('package.booking.create',packageInfo.id)} className="w-full bg-[#00B3B3] hover:bg-[#00a1a1] text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2">
          <FaFire />
          Book Now
        </Link>
      
      </div>
    </div>
  );
}
