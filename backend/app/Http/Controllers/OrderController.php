<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    function index(Request $request)
    {
        $orders = Orders::query();

        if ($request->has('user')) {
            $user = $request->user;
            $orders = $orders->whereHas('user', function ($q) use ($user) {
                $q->where('name', 'like', '%' . $user . '%');
            })->paginate(25);
        } else {
            $orders = $orders->with('user')->paginate(25);
        }

        return response()->json([
            'status' => 'success',
            'data'  => $orders
        ]);
    }

    function show($order)
    {
        $order = Orders::with(['orderDetails', 'orderDetails.product'])->find($order);

        if (is_null($order)) {
            return response()->json([
                'status' => 'fail',
                'message' => 'order not found'
            ], 404);
        }

        return response()->json(
            [
                'status' => 'success',
                'data' => $order
            ]
        );
    }
}
