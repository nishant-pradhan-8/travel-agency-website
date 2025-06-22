<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Package;
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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, Activity $activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        //
    }
}
