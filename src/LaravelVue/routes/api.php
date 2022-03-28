<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$prefixes = ['v1/{locale}', 'v1'];
foreach ($prefixes as $prefix) {
    // NEW: add locale prefix/middleware to all routes
    Route::prefix($prefix)->middleware(['setlocale', 'global'])->group(function () {

        // dashboard
        Route::get('home/for-combobox', [DashboardController::class, 'getCombobox']);
        Route::resource('home', DashboardController::class);

    });
}