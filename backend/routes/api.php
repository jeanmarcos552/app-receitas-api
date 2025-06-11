<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\IngredientsController;
use App\Http\Controllers\Api\RecipesController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
   Route::post('/logout', [AuthController::class, 'logout']);
   Route::get('/me', [AuthController::class, 'me']);

   Route::apiResource('category', CategoryController::class);
   Route::apiResource('ingredients', IngredientsController::class);
   Route::apiResource('recipes', RecipesController::class);
});
