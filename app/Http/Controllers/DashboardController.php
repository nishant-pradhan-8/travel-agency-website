<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Package;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Carbon;


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

        $customersCount = User::count();
        $packageCount = Package::count();
        $newBookings = DB::table('bookings')
        ->select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as Bookings')
        )
        ->whereDate('created_at', Carbon::today())
        ->groupBy(DB::raw('DATE(created_at)'))
        ->get();

        $newBookingsCount = $newBookings->isNotEmpty() ? $newBookings[0]->Bookings : 0;

        return Inertia::render("admin/home", ["topDestinations" => $topDestinations,"topActivities" => $topActivities,"customerCount"=>$customersCount, "packageCount" => $packageCount,"newBookings"=> $newBookingsCount]);
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
    public function analytics(string $timeFrame){
        try {
            $data = null;
            $currentYear = Carbon::now()->year;
            
            if($timeFrame==="yearly"){
                $data = DB::table("bookings")
                ->select(
                    DB::raw('YEAR(created_at) as label'),
                    DB::raw('COUNT(*) as Bookings')
                )
                ->groupBy(DB::raw('YEAR(created_at)'))
                ->orderBy('label', 'asc')
                ->get();
            }else if( $timeFrame=== 'monthly'){
                $months =  [
                    1 => 'Jan',
                    2 => 'Feb',
                    3 => 'Mar',
                    4 => 'Apr',
                    5 => 'May',
                    6 => 'Jun',
                    7 => 'Jul',
                    8 => 'Aug',
                    9 => 'Sep',
                    10 => 'Oct',
                    11 => 'Nov',
                    12 => 'Dec'
                  ];
                $data = DB::table("bookings")
                ->select(
                    DB::raw('MONTH(created_at) as label'),
                    DB::raw('COUNT(*) as Bookings')
                )
                ->whereYear('created_at', $currentYear)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->orderBy('label', 'asc')
                ->get();
                foreach($data as $item){
                    $item->label = $months[$item->label];
                }
            }
            else if($timeFrame==="weekly"){
                $startOfWeek = Carbon::now()->startOfWeek(); 
                $endOfWeek = Carbon::now()->endOfWeek();    
                
                $data = DB::table('bookings')
                ->select(
                    DB::raw('DAYNAME(created_at) as label'),
                    DB::raw('COUNT(*) as Bookings'),
                    DB::raw('DAYOFWEEK(created_at) as weekday_num')
                )
                ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                ->groupBy('label', 'weekday_num')
                ->orderBy('weekday_num')
                ->get();
                foreach($data as $item){
                    unset($data->weekday_num);
                }

            
                
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid TimeFrame',
                     'data'=>null
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Booking analytics fetched successfully',
                'data' => $data
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch booking analytics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
