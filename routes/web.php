<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\DepartureController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/destination/{destination}', [DestinationController::class, 'show'])->name('destinationPackages.show');
Route::get('/activity/{activity}', [ActivityController::class, 'show'])->name('activityPackages.show');
Route::get('/package/{package}', [PackageController::class, 'show'])->name('package.show');
Route::get('/package/{package}/booking', [BookingController::class, 'create'])->name('package.booking.create');
Route::post('/package/{package}/booking', [BookingController::class, 'store'])->name('package.booking.store');
Route::get('/booking/success', [BookingController::class, 'success'])->name('success.show');
Route::get('/packages', [PackageController::class, 'clientIndex'])->name('package.clientIndex');
Route::get('/booking-history', [BookingController::class, 'show'])->name('bookingHistory.show');


Route::prefix('admin')->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('admin/home');
  })->name('admin.dashboard');
  Route::get('/bookings', [BookingController::class, 'index'])->name('admin.bookings');
  Route::get('/destinations', [DestinationController::class, 'index'])->name('admin.destinations');
  Route::get('/activities', [ActivityController::class, 'index'])->name('admin.activities');
  Route::get('/packages', [PackageController::class, 'index'])->name('admin.packages');
  Route::get('/departures', [DepartureController::class, 'index'])->name('admin.departures');
});


Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
    return Inertia::render('dashboard');
  })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
