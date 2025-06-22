<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{

    use HasFactory;


    protected $fillable = [
    'user_id',
    'package_id',
     'departure_id',
    'totalPrice',
    'number_of_person',
    'messege',
    'booking_status',
    'payment_status'
];
 public function user(){
    return $this->belongsTo(User::class);
 }

 public function package(){
    return $this->belongsTo(Package::class);
 }

  public function departure(){
    return $this->belongsTo(Departure::class);
 }


}
