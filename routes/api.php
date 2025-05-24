<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware('web')->group(function () {
   Route::get('/', [UserController::class, 'index']);
});
