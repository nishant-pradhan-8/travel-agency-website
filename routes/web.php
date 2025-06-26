<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\DepartureController;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/destination/{destination}', [DestinationController::class, 'show'])->name('destinationPackages.show');
Route::get('/activity/{activity}', [ActivityController::class, 'show'])->name('activityPackages.show');
Route::get('/package/{package}', [PackageController::class, 'show'])->name('package.show');
Route::get('/package/{package}/booking', [BookingController::class, 'create'])->name('package.booking.create');
Route::post('/package/{package}/booking', [BookingController::class, 'store'])->name('package.booking.store');
Route::get('/packages', [PackageController::class, 'clientIndex'])->name('package.clientIndex');



Route::prefix('admin')->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
  Route::get('/bookings', [BookingController::class, 'index'])->name('admin.bookings');
  Route::get('/destinations', [DestinationController::class, 'index'])->name('admin.destinations');
  Route::get('/activities', [ActivityController::class, 'index'])->name('admin.activities');
  Route::get('/packages', [PackageController::class, 'index'])->name('admin.packages');
  Route::get('/departures', [DepartureController::class, 'index'])->name('admin.departures');
  Route::get('/users', [UserController::class, 'index'])->name('admin.users');
});


Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/booking-history', [BookingController::class, 'show'])->name('bookingHistory.show');
  Route::get('/profile/{user}', [UserController::class, 'show'])->name('profile.show');
  Route::get('/booking/success', function () {
    return Inertia::render('success/show');
  })->name('success.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
