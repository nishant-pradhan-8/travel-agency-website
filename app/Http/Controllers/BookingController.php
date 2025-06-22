<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreBookingRequest;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $bookings = Booking::with('package:id,name','departure:id,departure_date', 'user:id,full_name')->get();
      return Inertia::render('admin/bookings/index',[
        'bookings'=>$bookings
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
        $validated = $request->validated();
        $departure = Departure::find($validated['departureId']);

        if ($departure->available_slots < $validated['noOfPeople']) {

            return back()->withErrors([
                'departure' => 'Not enough available spots for the selected departure.',
            ])->withInput();
        }


        $departure->decrement('available_slots', $validated['noOfPeople']);

        Booking::create([
            'user_id' => 1,
            'package_id' => $package->id,
            'departure_id' => $validated['departureId'],
            'totalPrice' => $validated['totalPrice'],
            'number_of_person' => $validated['noOfPeople'],
            'messege' => $validated['messege'],
        ]);

        return redirect()->route('success.show');
    }

    /**
     * Display the specified resource.
     */
    public function show() {
          $bookings = Booking::with('package:id,name','departure:id,departure_date')->where('user_id',1)->get();
        return Inertia::render('bookingHistory/index',[
            'bookings'=>$bookings
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
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }
    public function success(Request $request)
    {
        return Inertia::render('Success/show');
    }
}
