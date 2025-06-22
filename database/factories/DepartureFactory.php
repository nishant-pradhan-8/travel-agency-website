<?php

namespace Database\Factories;

use App\Models\Package;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Departure>
 */
class DepartureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'package_id'=>Package::inRandomOrder()->first()->id,
            'departure_date'=>$this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'available_slots'=>$this->faker->numberBetween(5,15),
        
        ];
    }
}
