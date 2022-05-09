<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'entreprise_id',
        'title',
        'type_post',
        'duration',
        'competences',
        'description',
    ];
    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }
}
