import DestinationSlider from "./destinationSlider";
import { destination } from "@/types/types";
import { MyPageProps } from "@/types/types";
import { usePage } from "@inertiajs/react";
export default function PopularDestinations() {
   const {destinations} = usePage<Partial<MyPageProps>>().props
    return (
        <div  className="container relative slider">
            <p className="mb-2 text-lg text-gray-700 font-bold">Where You Can Go</p>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-4xl font-bold text-teal-800">Popular Destinations</h2>
                 <div className="flex space-x-4 ">
      {/* Left Button */}
      <button className=" flex items-center justify-center w-20 h-10 rounded-full border border-gray-700 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
          <img className="w-8 h-8 " src="/images/left.svg" />
      </button>

      {/* Right Button */}
      <button className="flex items-center justify-center w-20 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
        <img className="w-8 h-8 brightness-0 invert-[1]" src="/images/right.svg" />
      </button>
    </div>
               
            </div>
      
            <div className="flex h-64 items-center justify-center rounded-lg  text-gray-500">
             {destinations && <DestinationSlider destinations={destinations} />}
            </div>
        </div>
    );
}
