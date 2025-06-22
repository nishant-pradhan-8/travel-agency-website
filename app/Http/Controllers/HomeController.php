<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
       
        return Inertia::render('home'
        );
    }
}
