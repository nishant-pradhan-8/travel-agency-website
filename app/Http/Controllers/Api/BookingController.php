<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Departure;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking): JsonResponse
    {
        try {

            $validated = $request->validated();

            if (isset($validated['payment_status']) && $validated['payment_status'] === $booking['payment_status']) {
                return response()->json([

                    'success' => false,
                   'message' => "Payment status is already set to {$booking->payment_status}."

                ],409);
            }
            DB::beginTransaction();
            if (isset($validated['booking_status']) && $validated['booking_status'] === 'cancelled') {

                if ($booking->booking_status === 'cancelled') {
                    DB::rollBack(); 
                    return response()->json([
                        'success' => false,
                        'message' => 'This booking is already cancelled.'
                    ],409);
                }

                $departure = $booking->departure;


                if (!$departure) {
  DB::rollBack(); 
                    return response()->json([
                        'success' => false,
                        'message' => "Associated Departure not found for this booking. Cannot proceed with cancellation."
                    ], 404);
                }


                $departureDate = Carbon::parse($departure->departure_date);
                $validCancelDate = $departureDate->copy()->subDays(3);
                $todayDate = Carbon::today();

                if ($todayDate->gt($validCancelDate)) {
  DB::rollBack(); 
                    return response()->json([
                        'success' => false,
                        'message' => "Booking cancellation is only allowed at least 3 days before the departure date."
                    ],403);
                }


                $slotsToRelease = $booking->number_of_person;
                if ($slotsToRelease <= 0) {
  DB::rollBack(); 
                    return response()->json([
                        'success' => false,
                        'message' => "Invalid number of persons for slot release."
                    ],400);
                }
                $departure->increment('available_slots', $slotsToRelease);
            }
            $booking->update($validated);
            DB::commit();


            return response()->json([
                'success' => true,
                'message' => 'Booking updated successfully.'
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while updating the booking. Please Try again'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
