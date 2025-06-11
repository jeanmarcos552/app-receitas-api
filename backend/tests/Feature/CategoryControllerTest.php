<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class CategoryControllerTest extends TestCase
{
   use RefreshDatabase;

   private function authenticate(): string
   {
      $user = User::factory()->create([
         'email' => 'teste@categoria.com',
         'password' => bcrypt('password123'),
      ]);

      return JWTAuth::fromUser($user);
   }

   public function test_index_retorna_lista_de_categorias()
   {
      Category::factory()->count(3)->create();

      $token = $this->authenticate();

      $response = $this->withHeader('Authorization', "Bearer $token")->getJson('/api/category');

      $response->assertStatus(200)
         ->assertJsonCount(3);
   }

   public function test_index_filtra_por_nome()
   {
      Category::factory()->create(['name' => 'Sobremesas']);
      Category::factory()->create(['name' => 'Massas']);

      $token = $this->authenticate();
      $response = $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/category?name=sobrem');

      $response->assertStatus(200)
         ->assertJsonFragment(['name' => 'Sobremesas']);
   }

   public function test_index_retorna_404_se_nenhuma_categoria_encontrada()
   {
      $token = $this->authenticate();
      $response = $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/category?name=inexistente');

      $response->assertStatus(404)
         ->assertJson([
            'success' => false,
            'message' => 'Nenhuma categoria encontrada',
         ]);
   }

   public function test_store_cria_categoria_com_dados_validos()
   {
      $token = $this->authenticate();

      $response = $this->withHeader('Authorization', "Bearer $token")
         ->postJson('/api/category', [
            'name' => 'Nova Categoria',
         ]);

      $response->assertStatus(201)
         ->assertJson([
            'name' => 'Nova Categoria',
         ]);

      $this->assertDatabaseHas('categories', [
         'name' => 'Nova Categoria',
      ]);
   }

   public function test_show_retorna_categoria_existente()
   {
      $category = Category::factory()->create();

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->getJson("/api/category/{$category->id}");

      $response->assertStatus(200)
         ->assertJson([
            'id' => $category->id,
            'name' => $category->name,
         ]);
   }

   public function test_show_retorna_erro_para_categoria_inexistente()
   {
      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/category/999');

      $response->assertStatus(404)
         ->assertJson([
            'success' => false,
            'message' => 'Categoria não encontrada',
         ]);
   }

   public function test_update_altera_categoria_com_nome_diferente()
   {
      $category = Category::factory()->create(['name' => 'Original']);

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->putJson("/api/category/{$category->id}", [
            'name' => 'Atualizado',
         ]);

      $response->assertStatus(200)
         ->assertJson(['name' => 'Atualizado']);

      $this->assertDatabaseHas('categories', ['name' => 'Atualizado']);
   }

   public function test_update_com_nome_igual_retorna_erro_de_validacao()
   {
      $category = Category::factory()->create(['name' => 'Duplicado']);

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->putJson("/api/category/{$category->id}", [
            'name' => 'Duplicado',
         ]);

      $response->assertStatus(422)
         ->assertJsonValidationErrors(['name']);
   }

   public function test_destroy_exclui_categoria_sem_receitas()
   {
      $category = Category::factory()->create();

      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->deleteJson("/api/category/{$category->id}");

      $response->assertStatus(200)
         ->assertJson([
            'success' => true,
            'message' => 'Categoria excluída com sucesso',
         ]);

      $this->assertDatabaseMissing('categories', ['id' => $category->id]);
   }


   public function test_destroy_retorna_erro_se_categoria_nao_existe()
   {
      $token = $this->authenticate();
      $response =  $this->withHeader('Authorization', "Bearer $token")
         ->deleteJson('/api/category/999');

      $response->assertStatus(404)
         ->assertJson([
            'success' => false,
            'message' => 'Categoria não encontrada',
         ]);
   }
}
