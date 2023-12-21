<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $guarded = [];

    function orderDetails()
    {
        return $this->hasMany(OrderDetails::class);
    }

    function user(){
        return $this->belongsTo(User::class);
    }
}
