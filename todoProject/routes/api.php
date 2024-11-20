<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AuthController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('projects', ProjectController::class);
Route::post('projects/{project}/todos', [TodoController::class, 'store']);
Route::put('todos/{todo}', [TodoController::class, 'update']);
Route::delete('todos/{todo}', [TodoController::class, 'destroy']);
Route::post('/login', [AuthController::class, 'login']);
