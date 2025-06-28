<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\Activity;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Package;
use App\Models\Review;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $packages = Package::with('destination:id,name,description', 'activity:id,name,description')->get();
        $destinations = Destination::all();
        $activities = Activity::all();
        return Inertia::render('admin/packages/index',[
            'packages'=>$packages,
            'destinations' => $destinations,
            'activities' => $activities
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
    public function store(StorePackageRequest $request)
    {
        try {
            $validated = $request->validated();
            unset($validated['image']);

            $package = Package::create($validated);


            if ($request->hasFile('image')) {
                $fileName = $package->name . '-' . $package->id . '.' . $request->file('image')->getClientOriginalExtension();
                $path = $request->file('image')->storeAs('package_image', $fileName, 'public');
                $package->image = $path;
                $package->save();
            }

            return redirect()->back()->with('success', 'Package created successfully');
       
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        $destinationName = Destination::where('id',$package['destination_id'])->value('name');
        $activityName = Activity::where('id',$package['activity_id'])->value('name');
        $reviews = Review::with('user:id,full_name,profile_picture')->where('package_id',$package['id'])->get();
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
    public function update(UpdatePackageRequest $request, Package $package)
    {
        $validated = $request->validated();
        try {
            if ($request->hasFile('image')) {
                unset($validated['image']);
            }
            $currentImage = $package->image;
            $package->update($validated);
            $package->image = $currentImage;
            $package->save();

            if ($request->hasFile('image')) {

                if ($package->image && Storage::disk('public')->exists($package->image)) {
                    Storage::disk('public')->delete($package->image);
                }
                $extension = $request->file('image')->getClientOriginalExtension();
                $fileName = $package->name . '-' . $package->id . '.' . $extension;
                $path = $request->file('image')->storeAs('package_image', $fileName, 'public');
                $package->image = $path;
                $package->save();
            }
  return redirect()->back()->with('success', 'Activity created successfully');
       
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        try{
            $package->delete();
            if($package->image && Storage::disk('')->exists($package->image)) {
                Storage::disk('public')->delete($package->image);
            }
            
  return redirect()->back()->with('success', 'Package Deleted successfully');
      

        }catch(Exception $e){
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    
    }
}
