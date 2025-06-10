<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Ingredients;
use App\Models\Recipes;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipes>
 */
class RecipesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'preparation_method' => $this->faker->paragraph(2),
            'user_id' => User::factory(),       // cria user se não passar
            'category_id' => Category::factory(), // cria categoria se não passar
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Recipes $recipe) {
            $ingredients = Ingredients::factory()->count(3)->create();
            $recipe->ingredients()->sync($ingredients->pluck('id')->toArray());
        });
    }
}
