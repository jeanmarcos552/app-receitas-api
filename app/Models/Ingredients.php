<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ingredients extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'deleted'
    ];

    public function recipes()
    {
        return $this->belongsToMany(Recipes::class, 'recipe_ingredients', 'ingredients_id', 'recipe_id');
    }
}
