<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('package_id')->constrained('packages')->cascadeOnDelete();
            $table->foreignId('departure_id')->constrained('departures')->cascadeOnDelete();
            $table->integer('totalPrice');
            $table->integer('number_of_person');
            $table->longText('messege')->nullable();
            $table->enum('booking_status', ['cancelled', 'booked'])->default('booked');
            $table->enum('payment_status', ['paid', 'refunded', 'unpaid'])->default('unpaid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
