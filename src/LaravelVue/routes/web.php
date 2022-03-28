<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use \App\Http\Controllers\Api\V1\Dashboard\DashboardController;

//multiple-files
Route::post('send-exel-file', [DashboardController::class, 'import'])->name('dashboard.import');
Route::get('dashboard-get-items', [DashboardController::class, 'getitems'])->name('dashboard.getitems');

Route::get('/{any?}', [
    function () {
        return view('welcome');
    }
])->where('any', '.*')  ;