<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\DepartureController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*Not Used*/

Route::get('/packages/{package}/departures', [DepartureController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/analytics/{timeFrame}', [AnalyticsController::class, 'bookingAnalytics']);


    Route::patch('/booking/{booking}', [BookingController::class, 'update']);

    Route::resource('destination', DestinationController::class)->only(['index', 'store', 'update', 'destroy']);;
    Route::resource('activity', ActivityController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('package', PackageController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('departure', DepartureController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('user', UserController::class)->only(['index', 'store', 'update', 'destroy']);
});
