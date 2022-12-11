<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

Route::group(['prefix' => 'v1'], function () {
    Route::group([
        'prefix' => 'auth',
    ], function () {
        Route::post('login', 'App\Http\Controllers\v1\Seguridad\AuthController@login');
        Route::post('logout', 'App\Http\Controllers\v1\Seguridad\AuthController@logout')->middleware('auth:api');
    });

    Route::post('generate', 'App\Http\Controllers\v1\Administracion\GenerationController@create');
    Route::post('generate/pdf', 'App\Http\Controllers\v1\Administracion\GenerationController@generateFromPdf');
    Route::post('generate/image', 'App\Http\Controllers\v1\Administracion\GenerationController@generateFromImage');
    Route::post('generate/audio', 'App\Http\Controllers\v1\Administracion\GenerationController@audio');
    
    Route::post('job', 'App\Http\Controllers\v1\Administracion\GenerationController@jobInit');

    Route::get('generations', 'App\Http\Controllers\v1\Administracion\GenerationController@index');
});
