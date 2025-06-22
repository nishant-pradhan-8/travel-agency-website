<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departure extends Model
{

     use HasFactory;

    protected $fillable =[
        'package_id',
        'departure_date',
        'available_slots',
    ];

    public function package(){
        return $this->belongsTo(Package::class);
    }

    public function bookings(){
        return $this->hasMany(Booking::class);
    }
}
