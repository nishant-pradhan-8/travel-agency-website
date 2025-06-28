<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDARequest;
use App\Http\Requests\UpdateDARequest;
use App\Models\Activity;
use App\Models\Package;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
           $activities = Activity::all();
        return Inertia::render('admin/activities/index',["activites"=>$activities]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDARequest $request)
    {
        try {
            $validated = $request->validated();
          Activity::create($validated);
            return redirect()->back()->with('success', 'Activity created successfully');
       
        } catch (Exception $e) { 
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        $activityInfo = [
            "id"=>$activity['id'],
            "name"=>$activity['name'],
            "description"=>$activity['description'],
        ];
        $packages = Package::with('destination:id,name,description')->where('activity_id',$activity['id'])->get();
        return Inertia::render('activity/show',[
            'activityInfo'=>$activityInfo,
            'packages'=>$packages
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
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
            return redirect()->back()->with('success', 'Activity updated successfully');
       
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        try {
            $activity->delete();
            return redirect()->back()->with('success', 'Activity deleted successfully');
       
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }
}
