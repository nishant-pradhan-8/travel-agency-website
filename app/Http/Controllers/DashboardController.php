<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $topDestinations = Booking::join('packages', 'bookings.package_id', '=', 'packages.id')
            ->join('destinations', 'packages.destination_id', '=', 'destinations.id')
            ->select('destinations.id', 'destinations.name', DB::raw('COUNT(*) as count'))
            ->groupBy('destinations.id', 'destinations.name')
            ->orderByDesc('count')
            ->limit(5)
            ->get();
        
        $topActivities = Booking::join('packages','bookings.package_id','=','packages.id')
        ->join("activities",'packages.activity_id','activities.id')
        ->select('activities.id','activities.name',DB::raw('COUNT(*) as count'))
        ->groupBy('activities.id', 'activities.name')
        ->orderByDesc('count')
        ->limit(5)
        ->get();

        return Inertia::render("admin/home", ["topDestinations" => $topDestinations,"topActivities" => $topActivities]);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
