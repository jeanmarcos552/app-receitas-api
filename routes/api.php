<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
   Route::post('/logout', [AuthController::class, 'logout']);
   Route::get('/me', [AuthController::class, 'me']);

   Route::apiResource('category', CategoryController::class);
});
