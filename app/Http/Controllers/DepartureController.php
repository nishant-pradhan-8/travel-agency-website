<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartureRequest;
use App\Http\Requests\UpdateDepartureRequest;
use App\Models\Departure;
use App\Models\Package;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartureController extends Controller
{
    /**
     * Display a listing of the resource.
    */
    public function index()
    {
        $departures = Departure::with('package:id,name')->get();
        $packages = Package::select(['id', 'name'])->get();
        return Inertia::render('admin/departures/index',[
            "departures"=> $departures,
            "packages"=>$packages
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
    public function store(StoreDepartureRequest $request)
    {
        try{
            $validated = $request->validated();
            $departure = Departure::create($validated);
            Departure::with("package:id,name")->where('id', $departure['id'])->first();
            return redirect()->back()->with('success','Departure Created Successfully');
    
        }catch(Exception $e){
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
     * Show the form for editing the specified resource.
     */
    public function edit(Departure $departure)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartureRequest $request, Departure $departure)
    {
        try{
            $validated = $request->validated();
            $departure->update($validated);
            return redirect()->back()->with('success', 'Departure updated successfully');
       
           }catch(Exception $e){
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
           }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departure $departure)
    {
        try {
            $departure->delete();
            return redirect()->back()->with('success', 'Departure deleted successfully');
       
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }
}
