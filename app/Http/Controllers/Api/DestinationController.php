<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreDARequest;
use App\Http\Requests\UpdateDARequest;
use App\Models\Destination;
use Illuminate\Http\Request;
use Exception;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $destinations = Destination::select('id', 'name')->get();
            return response()->json([
                'success' => true,
                'message' => 'Destinations Fetched Successfully.',
                'data'=> $destinations
            ],200);
        }catch (Exception $e) { 
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while fetching Destinations. Please Try again'
            ], 500);
        }
       

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDARequest $request)
    {
        try {
            $validated = $request->validated();
            $destination = Destination::create($validated);
              return response()->json([
                'success' => true,
                'message' => 'New Destination Added Successfully.',
                'data'=> $destination
            ],201);
        } catch (Exception $e) { 
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while creating Destination. Please Try again'
            ], 500);
        }

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
    public function update(UpdateDARequest $request, Destination $destination)
    {
        try {
            $validated = $request->validated();
            $destination->update($validated);
              return response()->json([
                'success' => true,
                'message' => 'Destination updated successfully.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while updating Destination. Please Try again'
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destination $destination)
    {
         try {
            $destination->delete();
              return response()->json([
                'success' => true,
                'message' => 'Destination deleted Successfully.'
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while deleting Destination. Please Try again'
            ], 500);
        }

    }
}
