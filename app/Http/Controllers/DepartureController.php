<?php

namespace App\Http\Controllers;

use App\Models\Departure;
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

        return Inertia::render('admin/departures/index',[
            "departures"=> $departures
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
    public function show(Departure $departure)
    {
        //
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
    public function update(Request $request, Departure $departure)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departure $departure)
    {
        //
    }
}
