<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AlternatingController;

//routes pour les alternants
Route::get('alternatings', [AlternatingController::class,'index']);
Route::put('alternating/{id}', [AlternatingController::class,'update']);
Route::delete('alternating/{id}', [AlternatingController::class,'delete']);
Route::get('alternating/{id}', [AlternatingController::class,'show']);
Route::post('alternating', [AlternatingController::class,'store']);
Route::post('alternating/login', [AlternatingController::class,'login']);

//routes pour les entreprises
Route::get(('entreprises'),[EntrepriseController::class,'index']);
Route::get(('entreprise/{id}'),[EntrepriseController::class,'show']);
Route::put(('entreprise/{id}'),[EntrepriseController::class,'update']);
Route::delete(('entreprise/{id}'),[EntrepriseController::class,'delete']);
Route::post('entreprise/login', [EntrepriseController::class,'login']);
Route::post('entreprise',[EntrepriseController::class,'store']);

//routes pour les postes
Route::get(('posts'),[PostController::class,'all']);
Route::get(('entreprise/{id}/posts'),[PostController::class,'index']);
Route::delete(('entreprise/{entre_id}/post/{post_id}'),[PostController::class,'delete']);
Route::post(('entreprise/{id}/post'),[PostController::class,'store']);
Route::put(('entreprise/{entre_id}/post/{post_id}'),[PostController::class,'update']);


//gere le cas où la route n'existe pas
Route::fallback(function() {
    return response()
    ->json(array('code'=> 404,'message' => 'this route does not exist'),404)
    ->header('Content-Type', 'application/json');
 });
