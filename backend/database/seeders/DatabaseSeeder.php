<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Ingredients;
use App\Models\Recipes;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'email_verified_at' => now(),
            'remember_token' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        $array_ingredients = [
            'Farinha',
            'Açúcar',
            'Ovos',
            'Manteiga',
            'Leite',
            'Sal',
            'Fermento em Pó',
            'Extrato de Baunilha',
            'Gotas de Chocolate',
            'Cacau em Pó',
            'Canela em Pó',
            'Maçã',
            'Banana',
            'Morango',
            'Laranja',
            'Limão',
            'Abacaxi',
            'Cenoura',
            'Batata Doce',
            'Brócolis',
            'Espinafre',
            'Alface',
            'Tomate',
            'Cebola',
            'Alho',
            'Pimentão',
            'Queijo',
            'Presunto',
            'Peito de Frango',
            'Carne Moída',
            'Peixe',
            'Salmão',
            'Atum',
            'Arroz',
            'Feijão',
            'Macarrão',
            'Lentilha',
            'Grão-de-bico',
            'Aveia',
            'Iogurte',
            'Mel',
            'Azeite de Oliva',
            'Vinagre',
            'Mostarda',
            'Ketchup',
            'Maionese',
            'Molho de Soja',
            'Pimenta-do-reino',
            'Páprica',
            'Orégano',
            'Alecrim',
        ];
        foreach ($array_ingredients as $ingredient) {
            Ingredients::factory()->create([
                'name' => $ingredient,
            ]);
        }

        Category::factory()->create([
            'name' => 'Sobremesas',
        ]);
        Category::factory()->create([
            'name' => 'Entradas',
        ]);
        Category::factory()->create([
            'name' => 'Pratos Principais',
        ]);
    }
}
