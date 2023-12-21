<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::query();

        if ($request->has('price_min') && $request->has('price_max')) {
            $products = $products->where('price', '>=', $request->price_min)->where('price', '<=', $request->price_max);
        }

        if ($request->has('name')) {
            $products = $products->where('name', 'LIKES', '%' . $request->name . '%');
        }

        $products = $products->paginate(25)->toArray();

        return response()->json(
            array_merge(
                [
                    'status' => 'success',
                ],
                $products,
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $valid = $request->validate([
            'name' => 'required',
            'price' => 'required',
        ]);

        $product =  Product::create($valid);

        return response()->json(
            [
                'status' => 'success',
                'data' => $product
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        if (is_null($product)) {
            return response()->json(
                [
                    'status' => 'fail',
                    'message' => 'product not found'
                ]
            );
        }

        return response()->json(
            [
                'status' => 'success',
                'data' => $product
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if (is_null($product)) {
            return response()->json(
                [
                    'status' => 'fail',
                    'message' => 'product not found'
                ]
            );
        }

        $product->name = $request->name ?? $product->name;
        $product->price = $request->price ?? $product->price;
        $product->image = $request->image ?? $product->image;

        $product->save();

        return response()->json(
            [
                'status' => 'success',
                'data' => $product
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (is_null($product)) {
            return response()->json(
                [
                    'status' => 'fail',
                    'message' => 'product not found'
                ]
            );
        }

        $product->delete();

        return response()->json(
            [
                'status' => 'success',
                'data' => ""
            ]
        );
    }
}
