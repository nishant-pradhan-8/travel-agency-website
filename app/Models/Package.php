<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
     use HasFactory;

    protected $fillable = [
    'destination_id',
    'activity_id',
    'name',
    'price',
    'description',
    'duration',
    'image',
    'discount'
];


    public function destination(){
        return $this->belongsTo(Destination::class);
    }

     public function activity(){
        return $this->belongsTo(Activity::class);
    }

    public function departures(){
        return $this->hasMany(Departure::class);
    }
     public function bookings(){
        return $this->hasMany(Booking::class);
    }

         public function reviews(){
        return $this->hasMany(Review::class);
    }
}
