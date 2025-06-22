<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Booking;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Package;
use App\Models\Review;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Destination::factory(5)->create();
    Activity::factory(5)->create();

    Package::factory(10)->create();
    Departure::factory(15)->create();
    Booking::factory(20)->create();
    Review::factory(30)->create();
       
    }
}
