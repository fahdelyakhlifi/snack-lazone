<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\VarianteProduitController;
use App\Http\Controllers\OptionProduitController;
use App\Http\Controllers\CommandeController;
use App\Http\Middleware\RoleMiddleware;

// Auth
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:api');

// Admin routes
Route::middleware(['auth:api', RoleMiddleware::class.':admin'])->group(function(){
    Route::apiResource('categories',CategorieController::class);
    Route::apiResource('produits',ProduitController::class);
    Route::apiResource('variantes',VarianteProduitController::class);
    Route::apiResource('options',OptionProduitController::class);
    Route::get('/stats/{periode}',[CommandeController::class,'stats']);
});

// Caissier routes
Route::middleware(['auth:api',RoleMiddleware::class.':caissier'])->group(function(){
    Route::get('/commandes',[CommandeController::class,'index']);
    Route::post('/commandes',[CommandeController::class,'store']);
    Route::get('/commandes/{id}',[CommandeController::class,'show']);
});
