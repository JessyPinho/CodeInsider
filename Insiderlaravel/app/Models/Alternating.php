<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Alternating extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'lastname',
        'description',
        'localization',
        'email',
        'password',
        'minimum_wage',
        'maximum_wage',
        'type_post',
        'year_of_study',
        'alternation_duration',
        'competences',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
