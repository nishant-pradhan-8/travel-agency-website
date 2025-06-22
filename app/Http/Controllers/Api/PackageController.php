<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PackageController extends Controller
{
/**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $packages = Package::all();
            return response()->json([
                "success"=>true,
                "message"=> "Packages Fetched Successfully",
                "data"=> PackageResource::collection($packages),
              
                
            ]);
            
        }catch(Exception $e){
            return response()->json([
                "success"=>false,
                "message"=> "Unable to get Packages",
                "error"=> $e->getMessage()
            ]);
        }
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

            return response()->json([
                'success' => true,
                'message' => 'Package Created Successfully',
                'data' => $package
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while creating Packages. Please try again.'
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
    public function update(UpdatePackageRequest $request, Package $package)

    {

         $validated = $request->validated();
        return response()->json([
            "data"=>$validated
        ])
  
       ;/*
  try {
        if ($request->hasFile('image')) {
            unset($validated['image']);
        }

        $package->update($validated); 

     
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

        return response()->json([
            'success' => true,
            'message' => 'Package updated successfully.',
            'data' => $package
        ]);
    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'An internal server error occurred while updating Package. Please try again.'
        ], 500);
    }
        */
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        try {
            $package->delete();
            return response()->json([
                'success' => true,
                'message' => 'Destination deleted Successfully.'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while deleting Destination. Please Try again'
            ], 500);
        }
    }
}
