<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Entreprise extends Model
{
    use HasApiTokens,HasFactory;
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'localization',
        'description',
        'number_employee',
    ];
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
