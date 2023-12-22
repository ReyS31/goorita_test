<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OrderDetails;
use App\Models\Orders;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserOrderController extends Controller
{
    // Cek jika produk telah dicheckout di bawah 24 jam
    private function checkIsAvailable($user, $product): bool
    {
        $order = Orders::where('updated_at', '>', Carbon::now()->subHours(24))->where('user_id', $user->id)->where('done', 1)->whereHas('orderDetails', function ($q) use ($product) {
            $q->where('product_id',  $product->id);
        })->first();
        if ($order != null) {
            return false;
        }
        return true;
    }

    function addToCart(Request $req)
    {
        $user = $req->user();

        $req->validate([
            'amount' => ['required', 'integer'],
            'product_id' => ['required']
        ]);

        $product = Product::find($req->product_id);

        if (is_null($product)) {
            return response()->json([
                'status' => 'fail',
                'msg' => "product not found"
            ], 404);
        }

        if (!$this->checkIsAvailable($user, $product)) {
            return response()->json([
                'status' => 'fail',
                'msg' => "can't add product to cart"
            ], 422);
        }

        // Mencari order yang belum selesai
        // jika tidak ada maka buat baru
        $order = Orders::where('done', 0)->where('user_id', $user->id)->first();
        if (is_null($order)) {
            $order = Orders::create([
                'user_id' => $user->id,
                'total' => 0,
            ]);
        }

        $total = (int)$req->amount * $product->price;

        $orderDetail = OrderDetails::where('product_id', $product->id)->where('orders_id', $order->id)->first();

        if (is_null($orderDetail)) {
            OrderDetails::create([
                'orders_id' => $order->id,
                'product_id' => $product->id,
                'amount' => $req->amount,
                'total' => $total,
            ]);
        } else {
            $orderDetail->amount += $req->amount;
            $orderDetail->total += $total;
            $orderDetail->save();
        }

        $order->total = $order->total + $total;
        $order->save();

        return response()->json(['status' => 'success', 'data' => [
            'message' => 'item added to cart',
            'item' => $product
        ]], 200);
    }

    function removeFromCart(Request $request, string $id)
    {

        $user = $request->user();

        $orderDetail = OrderDetails::where('id', $id)->first();
        $order = Orders::where('id', $orderDetail->orders_id)->where('user_id', $user->id)->first();

        $order->total -= $orderDetail->total;
        $orderDetail->delete();
        $order->save();

        return response()->json(['status' => 'success', 'data' => $order], 200);
    }

    function updateCart(Request $request)
    {
        $request->validate([
            'amount' => ['required', 'integer'],
            'detail_id' => ['required']
        ]);

        $user = $request->user();

        $orderDetail = OrderDetails::where('id', $request->detail_id)->with('product')->first();
        $order = Orders::where('id', $orderDetail->orders_id)->where('user_id', $user->id)->first();

        $total = $orderDetail->product->price * $request->amount;

        $order->total -= $orderDetail->total;
        $orderDetail->amount = $request->amount;
        $orderDetail->total = $total;
        $order->total += $total;
        $orderDetail->save();
        $order->save();

        return response()->json(['status' => 'success', 'data' => $order], 200);
    }

    function cart(Request $request)
    {
        $user = $request->user();

        $order = Orders::where('done', 0)->where('user_id', $user->id)->with(['orderDetails', 'orderDetails.product'])->first();
        if (is_null($order)) {
            return response()->json(['status' => 'success', 'data' => []], 200);
        }
        $products = $order['orderDetails'];
        return response()->json(['status' => 'success', 'data' => $products], 200);
    }

    function finishOrder(Request $req)
    {
        $user = $req->user();

        $order = Orders::where('done', 0)->where('user_id', $user->id)->first();

        // Ambil 1% untuk koperasi (simulasi jika di-implement)
        // $koperasiAmount = $order->total * 0.01;
        // $koperasiWallet->amount = $koperasiAmount;
        // $gooritaWallet->amount = $order->total - $koperasiAmount;

        $order->done = 1;

        $order->save();

        return response()->json(['status' => 'success', 'data' => [
            'message' => 'order complete',
            'order_id' => $order->id
        ]], 200);
    }

    function orderHistory(Request $req)
    {
        $user = $req->user();

        $orders = Orders::where('done', 1)->where('user_id', $user->id)->paginate(25)->toArray();

        return response()->json(
            array_merge(
                [
                    'status' => 'success',
                ],
                $orders,
            )
        );
    }

    function orderHistoryDetail(Request $req, string $id)
    {
        $user = $req->user();

        $order = Orders::where('user_id', $user->id)->where('id', $id)->with(['orderDetails', 'orderDetails.product'])->first();

        return response()->json(
            [
                'status' => 'success',
                'data' => $order
            ],

        );
    }
}
