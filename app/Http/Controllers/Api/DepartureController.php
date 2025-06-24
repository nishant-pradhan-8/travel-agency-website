<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepartureRequest;
use App\Http\Requests\UpdateDepartureRequest;
use App\Models\Package;
use App\Models\Departure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DepartureController extends Controller
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
    public function store(StoreDepartureRequest $request)
    {
       
        try{
            $validated = $request->validated();
            $departure = Departure::create($validated);
            $newDeparture = Departure::with("package:id,name")->where('id', $departure['id'])->first();
            return response()->json([
                'success' => true,
                'message' => "New Departure Created Successfully.",
                'data'=> $newDeparture
            ],200);
    
        }catch(Exception $e){
            return response()->json([
                "success"=>false,
                "message"=>'An internal server error occurred while creating Departure. Please Try again',
                "error"
            ], 500);
        }
          
    }

    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        
        try {
        
            $departures = Departure::where('package_id', $package->id)->get();
            
            return response()->json([
                'success' => true,
                'departures' => $departures
            ]);
        } catch (Exception $e) {
          
            return response()->json([
                'success' => false,
                'message' => 'Error fetching departures',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartureRequest $request, Departure $departure)
    {
       try{
        $validated = $request->validated();
        $departure->update($validated);
        return response()->json([
            'success' => true,
            'message'=> "Departure Detail Updated Successfully",
            'data' => $departure
        ]);
       }catch(Exception $e){
        return response()->json([
            'success' => false,
            'message' => 'Error updating Departure. Please Try again',
        ], 500);
       }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departure $departure)
    {
        try {
            $departure->delete();
              return response()->json([
                'success' => true,
                'message' => 'Departure deleted Successfully.'
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while deleting Departure. Please Try again'
            ], 500);
        }

    }
}
