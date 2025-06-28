<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::with('package:id,name', 'departure:id,departure_date', 'user:id,full_name')->get();
        return Inertia::render('admin/bookings/index', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Package $package)
    {
        //
        $departures = Departure::where('package_id', $package['id'])->get();
        return Inertia::render('booking/show', [
            "packageInfo" => $package,
            "departures" => $departures
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request, Package $package)
    {
        try{
            $validated = $request->validated();
            $departure = Departure::find($validated['departure_id']);
    
            if ($departure->available_slots < $validated['number_of_person']) {
    
                return back()->withErrors([
                    'departure' => 'Not enough available spots for the selected departure.',
                ])->withInput();
            }
    
    
            $departure->decrement('available_slots', $validated['number_of_person']);
    
            Booking::create([
                'user_id' => Auth::user()->id,
                'package_id' => $package->id,
                'departure_id' => $validated['departure_id'],
                'totalPrice' => $validated['totalPrice'],
                'number_of_person' => $validated['number_of_person'],
                'messege' => $validated['messege'],
            ]);
    
            return redirect()->route('success.show');
        }catch(Exception $e){
            return back()->withErrors(['server',$e->getMessage()]);
        }
     
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $bookings = Booking::with('package:id,name', 'departure:id,departure_date')->where('user_id', Auth::user()->id)->get();
        return Inertia::render('bookingHistory/index', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        try {

            $validated = $request->validated();


            $departure = $booking->departure;


            $departureDate = Carbon::parse($departure->departure_date);
            $validCancelDate = $departureDate->copy()->subDays(3);
            $todayDate = Carbon::today();

            if ($todayDate->gt($validCancelDate)) {

                return redirect()->back()->withErrors([
                    'rule' => 'Cannot Cancel booking.',
                ]);
            }


            $slotsToRelease = $booking->number_of_person;
            if ($slotsToRelease <= 0) {

                return redirect()->back()->withErrors([
                    'people' => 'Please enter valid number of people',
                ]);
            }
            $departure->increment('available_slots', $slotsToRelease);

            $booking->update($validated);


           
            return redirect()->back()->with('success', 'Booking updated successfully');
       
        } catch (Exception $e) {

            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
    

    }
    public function success(Request $request)
    {
        return Inertia::render('Success/show');
    }


    
}
