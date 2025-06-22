import { departure, Package } from "@/types/types";
import { useAppContext } from "@/contexts/appContext";
import { FormEvent, useEffect } from "react";
import { router } from "@inertiajs/react";
interface BookingPreferenceProps {
  packageInfo: Package;
  departures: departure[];
}

export default function BookingPreference({ packageInfo, departures }: BookingPreferenceProps) {

  const { form } = useAppContext();
  const { data, setData, post, processing, errors } = form;

  const handleSubmit = (e: FormEvent) => {

    
     e.preventDefault();
    const selectedSlot:departure | null = departures.find(dep=>Number(dep.id)===data.departureId) || null;
  
    if(!selectedSlot){

      return window.alert(`Please Select a Departure Date`)
    }

    const availableSlot = selectedSlot.available_slots;

    if (data.noOfPeople > Number(availableSlot)) {
      return window.alert(`Not enough available spots for the selected departure.`);
    }

    // Calculate total price
    const basePrice = Number(packageInfo.price);
    const baseDiscount = Number(packageInfo.discount);
    const totalPrice = Math.round((basePrice * data.noOfPeople) - (baseDiscount * basePrice * data.noOfPeople / 100));
    
    // Set total price before submitting
    setData('totalPrice', totalPrice);
    
    post(route('package.booking.store', { package: packageInfo.id }));
  };


  return (
    <div>
      <h2 className="text-3xl font-semibold font-[playfair] text-teal-600 my-8 text-center">
        Traveler Information
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-6">
          <label htmlFor="package" className="block text-gray-700 text-sm font-medium mb-2">
            Package
          </label>
          <input
            type="text"
            id="package"
            value={`${packageInfo.name} - ${packageInfo.duration}`}
            disabled
            className="w-full px-4 py-3 border border-gray-300 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
       

        <div className="mb-6">
          <label htmlFor="noOfPeople" className="block text-gray-700 text-sm font-medium mb-2">
            Number of People
          </label>
          <input
            type="number"
            id="noOfPeople"
            placeholder="e.g. 3"
            min={1}
            value={data.noOfPeople}
            onChange={e => setData('noOfPeople', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          {errors.noOfPeople && <p className="text-red-600 text-sm mt-1">{errors.noOfPeople}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="departureDate" className="block text-gray-700 text-sm font-medium mb-2">
            Departure Dates
          </label>
          <select
          required
            id="departureDate"
            value={data.departureId || ''}
            onChange={e => setData('departureId', Number(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-xl cursor-pointer"
          >
            <option value="" disabled>
              Select a departure date
            </option>
            {departures.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.departure_date.split(' ')[0] + " | " + dep.available_slots + " Spots Available"}
              </option>
            ))}
          </select>
          {errors.departure && <p className="text-red-600 text-sm mt-1">{errors.departure}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="messege" className="block text-gray-700 text-sm font-medium mb-2">
            Message (Optional)
          </label>
          <textarea
            id="messege"
            value={data.messege}
            onChange={e => setData('messege', e.target.value)}
            className="border border-gray-300 w-full rounded-xl p-2"
          />
          {errors.messege && <p className="text-red-600 text-sm mt-1">{errors.messege}</p>}
        </div>
       
        <button
          type="submit"
          disabled={processing}
          className="bg-teal-800 rounded-xl px-4 mt-4 py-2 text-white disabled:opacity-50"
        >
          {processing ? 'Booking....' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
