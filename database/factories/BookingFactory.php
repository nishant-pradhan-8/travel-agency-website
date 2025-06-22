<?php

namespace Database\Factories;

use App\Models\Departure;
use App\Models\Package;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'=>User::inRandomOrder()->first()->id,
            'package_id'=>Package::inRandomOrder()->first()->id,
            'departure_id'=>Departure::inRandomOrder()->first()->id,
            'totalPrice'=>$this->faker->numberBetween(1,5000),
            'number_of_person' => $this->faker->numberBetween(1,5),
            'booking_status' => $this->faker->randomElement(['booked','cancelled']),
            'payment_status'=> $this->faker->randomElement(['paid','unpaid','refunded'])

        ];
    }
}
