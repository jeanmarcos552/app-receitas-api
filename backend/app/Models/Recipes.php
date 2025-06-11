<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipes extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'preparation_method',
        'user_id',
        'category_id',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class)->select((['categories.name', 'categories.id']));
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredients::class, 'recipe_ingredients', 'recipe_id', 'ingredients_id')
            ->select((['ingredients.name']));
    }
}
