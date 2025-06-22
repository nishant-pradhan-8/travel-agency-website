<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDARequest;
use App\Http\Requests\UpdateDARequest;
use App\Models\Activity;
use Exception;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $activites = Activity::select('id', 'name')->get();
            return response()->json([
                'success' => true,
                'message' => 'Activites Fetched Successfully.',
                'data'=> $activites
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
            $activity = Activity::create($validated);
              return response()->json([
                'success' => true,
                'message' => 'New Activity Added Successfully.',
                'data'=> $activity
            ],201);
        } catch (Exception $e) { 
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while creating Activity . Please Try again'
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
    public function update(UpdateDARequest $request, Activity $activity)
    {
         try {
            $validated = $request->validated();
            $activity->update($validated);
              return response()->json([
                'success' => true,
                'message' => 'Activity  updated successfully.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while updating Activity . Please Try again'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
         try {
            $activity->delete();
              return response()->json([
                'success' => true,
                'message' => 'Activity deleted Successfully.'
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while deleting the Activity. Please Try again'
            ], 500);
        }

    }
}
