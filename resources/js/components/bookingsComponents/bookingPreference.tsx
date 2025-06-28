import { Departure, Package, FormData } from "@/types/types";
import { FormEvent } from "react";
import { InertiaFormProps } from "@inertiajs/react";

interface BookingPreferenceProps {
  packageInfo: Package;
  departures: Departure[];
  form: InertiaFormProps<FormData>;
}

export default function BookingPreference({ packageInfo, departures, form }: BookingPreferenceProps) {

  const { data, setData, post, processing, errors } = form;

  const handleSubmit = (e: FormEvent) => {

    
     e.preventDefault();
    const selectedSlot:Departure | null = departures.find(dep=>Number(dep.id)===data.departure_id) || null;
  
    if(!selectedSlot){

      return window.alert(`Please Select a Departure Date`)
    }

    const availableSlot = selectedSlot.available_slots;

    if (data.number_of_person > Number(availableSlot)) {
      return window.alert(`Not enough available spots for the selected departure.`);
    }

    // The totalPrice is already calculated and set by BookingDetails component
    // No need to recalculate here
    
    post(route('package.booking.store', { package: packageInfo.id }),{
      onError: () => {
        window.alert('Something went wrong. Please Try again');
    }
    });
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
          <label htmlFor="number_of_person" className="block text-gray-700 text-sm font-medium mb-2">
            Number of People
          </label>
          <input
            type="number"
            id="number_of_person"
            placeholder="e.g. 3"
            min={1}
            value={data.number_of_person}
            onChange={e => setData('number_of_person', Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          {errors.number_of_person && <p className="text-red-600 text-sm mt-1">{errors.number_of_person}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="departure_id" className="block text-gray-700 text-sm font-medium mb-2">
            Departure Dates
          </label>
          <select
          required
            id="departure_id"
            value={data.departure_id || ''}
            onChange={e => setData('departure_id', Number(e.target.value))}
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
          {errors.departure_id && <p className="text-red-600 text-sm mt-1">{errors.departure_id}</p>}
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
          className="bg-teal-800 rounded-xl cursor-pointer px-4 mt-4 py-2 text-white disabled:opacity-50"
        >
          {processing ? 'Booking....' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
