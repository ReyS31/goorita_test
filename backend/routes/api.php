<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserOrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Auth::routes();

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
});

Route::prefix('user')->middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });

    Route::get('/history/{id}', [UserOrderController::class, 'orderHistoryDetail']);
    Route::get('/history', [UserOrderController::class, 'orderHistory']);
    Route::post('/checkout', [UserOrderController::class, 'finishOrder']);

    Route::prefix('cart')->group(function () {
        Route::delete('/remove/{id}', [UserOrderController::class, 'removeFromCart']);
        Route::put('/update', [UserOrderController::class, 'updateCart']);
        Route::post('/add', [UserOrderController::class, 'addToCart']);
        Route::get('/', [UserOrderController::class, 'cart']);
    });
});

Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });

    Route::prefix('products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });

    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{id}', [OrderController::class, 'show']);
    });
});
