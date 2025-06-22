<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Package;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $packages = Package::with('destination:id,name,description', 'activity:id,name,description')->get();
        return Inertia::render('admin/packages/index',[
            'packages'=>$packages
        ]);
    }

     public function    clientIndex()
    {

        $packages = Package::with('destination:id,name,description')->get();
        return Inertia::render('package/index',[
            'packages'=>$packages
        ]);
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
    public function show(Package $package)
    {
      
        $destinationName = Destination::where('id',$package['destination_id'])->value('name');
        $activityName = Activity::where('id',$package['activity_id'])->value('name');
        $reviews = Review::with('user:id,full_name')->where('package_id',$package['id'])->get();
        $departures = Departure::where('package_id',$package['id'])->get();
    
        return Inertia::render('package/show',[
            'additionalInfo'=>[
                'destinationName'=> $destinationName,
                'activityName' => $activityName,
            ],
            'packageInfo' => $package,
            'reviews'=>$reviews,
            'departures'=>$departures
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Package $package)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Package $package)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        //
    }
}
