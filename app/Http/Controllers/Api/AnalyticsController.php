<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Carbon;

class AnalyticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

    public function bookingAnalytics(string $timeFrame)
    {
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
                        DB::raw('COUNT(*) as Bookings')
                    )
                    ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                    ->groupBy(DB::raw('DAYNAME(created_at)')) // Preserves weekday order (1=Sunday, 7=Saturday)
                    ->orderBy(DB::raw('DAYNAME(created_at)'))
                    ->get();
                
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
