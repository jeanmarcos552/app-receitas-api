<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Ingredients;
use App\Models\Recipes;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class RecipesControllerTest extends TestCase
{
   use RefreshDatabase;

   private User $user;

   protected function setUp(): void
   {
      parent::setUp();
      $this->user = User::factory()->create();
   }


   private function authenticate(): string
   {
      return JWTAuth::fromUser($this->user);
   }

   public function test_index_retorna_lista_de_receitas_com_relacionamentos()
   {
      $recipes = Recipes::factory()
         ->count(2)
         ->for(Category::factory())
         ->hasAttached(Ingredients::factory()->count(2))
         ->create();

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/recipes');

      $response->assertStatus(200)
         ->assertJsonStructure([
            '*' => ['id', 'name', 'category', 'ingredients'],
         ]);
   }

   public function test_store_cria_nova_receita_com_ingredientes_e_categoria()
   {
      $category = Category::factory()->create();
      $ingredients = Ingredients::factory()->count(2)->create();

      $payload = [
         'name' => 'Bolo de Cenoura',
         'description' => 'Delicioso bolo',
         'category_id' => $category->id,
         'ingredients' => $ingredients->pluck('id')->toArray(),
         'preparation_method' => 'Misture tudo e asse por 30 minutos.',
      ];

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->actingAs($this->user)
         ->postJson('/api/recipes', $payload);

      $response->assertStatus(201)
         ->assertJsonFragment(['name' => 'Bolo de Cenoura'])
         ->assertJsonStructure(['id', 'name', 'category', 'ingredients']);

      $this->assertDatabaseHas('recipes', ['name' => 'Bolo de Cenoura']);
   }

   public function test_show_exibe_receita_existente_com_relacionamentos()
   {
      $recipe = Recipes::factory()
         ->for(Category::factory())
         ->hasAttached(Ingredients::factory()->count(2))
         ->create();

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->getJson("/api/recipes/{$recipe->id}");

      $response->assertStatus(200)
         ->assertJsonFragment(['id' => $recipe->id])
         ->assertJsonStructure(['id', 'name', 'category', 'ingredients']);
   }

   public function test_show_retorna_404_para_receita_inexistente()
   {
      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/recipes/999');

      $response->assertStatus(404)
         ->assertJson([
            'success' => false,
            'message' => 'Receita não encontrada',
         ]);
   }

   public function test_update_atualiza_dados_da_receita()
   {
      $recipe = Recipes::factory()
         ->for(Category::factory())
         ->hasAttached(Ingredients::factory()->count(1))
         ->create(['user_id' => $this->user->id]);

      $newCategory = Category::factory()->create();
      $newIngredients = Ingredients::factory()->count(2)->create();

      $payload = [
         'name' => 'Nova Receita Atualizada',
         'description' => 'Receita com descrição atualizada',
         'category_id' => $newCategory->id,
         'ingredients' => $newIngredients->pluck('id')->toArray(),
         'preparation_method' => 'Método de preparo atualizado.',
      ];

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->actingAs($this->user)
         ->putJson("/api/recipes/{$recipe->id}", $payload);

      $response->assertStatus(200)
         ->assertJsonFragment(['name' => 'Nova Receita Atualizada'])
         ->assertJsonStructure(['id', 'name', 'category', 'ingredients']);

      $this->assertDatabaseHas('recipes', ['name' => 'Nova Receita Atualizada']);
   }

   public function test_destroy_exclui_receita_existente()
   {
      $recipe = Recipes::factory()
         ->for(Category::factory())
         ->create();

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->actingAs($this->user)
         ->deleteJson("/api/recipes/{$recipe->id}");

      $response->assertStatus(200)
         ->assertJson([
            'success' => true,
            'message' => 'Receita excluída com sucesso',
         ]);

      $this->assertDatabaseMissing('recipes', ['id' => $recipe->id]);
   }

   public function test_destroy_retorna_404_para_receita_inexistente()
   {
      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->actingAs($this->user)
         ->deleteJson('/api/recipes/999');

      $response->assertStatus(404)
         ->assertJson([
            'success' => false,
            'message' => 'Receita não encontrada',
         ]);
   }
}
