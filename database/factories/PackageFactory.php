<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Destination;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'destination_id'=>Destination::inRandomOrder()->first()->id,
            'activity_id'=>Activity::inRandomOrder()->first()->id,
            'name'=>$this->faker->sentence(1),
            'price'=>$this->faker->numberBetween(100, 1000),
            'description'=>$this->faker->paragraph(100),
            'duration'=>$this->faker->randomElement(['3 days', '1 week', '12 days']),
            'image' => $this->faker->imageUrl(),
            'discount' => $this->faker->numberBetween(0,20)
        ];
    }
}
