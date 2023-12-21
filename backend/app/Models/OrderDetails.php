<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $hidden = ['created_at', 'updated_at', 'orders_id', 'product_id'];

    function product()
    {
        return $this->belongsTo(Product::class);
    }
}
