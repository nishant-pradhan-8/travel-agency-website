<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDARequest;
use App\Http\Requests\UpdateDARequest;
use App\Models\Destination;
use App\Models\Package;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Termwind\render;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $destinations = Destination::all();
        return Inertia::render('admin/destinations/index',["destinations"=>$destinations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDARequest $request)
    {
        try {
            $validated = $request->validated();
           Destination::create($validated);
            return redirect()->back()->with('success', 'Destination created successfully');
       
        } catch (Exception $e) { 
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Destination $destination)
    { 
        
       
        $relatedPackages = Package::with('destination:id,name,description')->where('destination_id',$destination['id'])->get();

         return Inertia::render('destination/show',[
            'packages'=>$relatedPackages
         ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Destination $destination)
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
            return redirect()->back()->with('success', 'Destination updated successfully');
       
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destination $destination)
    {
        try {
            $destination->delete();
            return redirect()->back()->with('success', 'Destination deleted successfully');
       
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }

    }
}
