<?php

use Illuminate\Support\Facades\Route;

Route::get('/start', [App\Http\Controllers\HomeController::class, 'start'])
    ->name('api.start');
