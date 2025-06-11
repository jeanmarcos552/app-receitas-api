<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthControllerTest extends TestCase
{
   use RefreshDatabase;


   /**
    * Testa o endpoint de registro de usuário (/api/register) com dados válidos.
    */
   public function test_register_com_dados_validos_retorna_token_e_usuario()
   {
      $response = $this->postJson('/api/register', [
         'name' => 'Jean',
         'email' => 'jean@example.com',
         'password' => '123456',
         'password_confirmation' => '123456',
      ]);

      $response->assertStatus(201)
         ->assertJsonStructure([
            'user' => ['id', 'name', 'email', 'created_at', 'updated_at'],
            'token',
         ]);
   }

   /**
    * Testa o endpoint de registro de usuário (/api/register) com dados faltando.
    */
   public function test_register_com_dados_faltando_retorna_erro_de_validacao()
   {
      // Cria um usuário para testar o erro de e-mail já cadastrado
      User::factory()->create([
         'email' => 'jean@example.com',
      ]);

      $response = $this->postJson('/api/register', [
         'name' => 'JEAN',
         'email' => 'jean_teste@testevalidacao.com',
         'password' => '123456',
         'password_confirmation' => '1234565',
      ]);

      $response->assertStatus(422)
         ->assertJson([
            'message' => 'A confirmação da senha não corresponde.',
         ]);
   }


   /**
    * Testa se o login com credenciais válidas retorna um token de autenticação.
    *
    * @return void
    */
   public function test_login_com_credenciais_validas_retorna_token()
   {
      $user = User::factory()->create(attributes: [
         'email' => 'jean@example.com',
         'password' => bcrypt('123456'),
      ]);

      $response = $this->postJson('/api/login', [
         'email' => 'jean@example.com',
         'password' => '123456',
      ]);

      $response->assertStatus(200)
         ->assertJsonStructure(['token']);
   }

   /**
    * Testa se o login com credenciais inválidas retorna status 401.
    * @return void
    */
   public function test_login_com_credenciais_invalidas_retorna_401()
   {
      $response = $this->postJson('/api/login', [
         'email' => 'fake@example.com',
         'password' => 'wrongpass',
      ]);

      $response->assertStatus(401)
         ->assertJson([
            'success' => false,
            'message' => 'Credenciais inválidas',
         ]);
   }


   /**
    * Testa se o endpoint 'me' retorna corretamente os dados do usuário autenticado.
    *
    * @return void
    */
   public function test_me_retorna_dados_do_usuario_autenticado()
   {
      $user = User::factory()->create();
      $token = JWTAuth::fromUser($user);

      $response = $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/me');

      $response->assertStatus(200)
         ->assertJson([
            'id' => $user->id,
            'email' => $user->email,
         ]);
   }

   /**
    * Testa se o endpoint 'me' sem estar logado
    *
    * @return void
    */
   public function test_me_returns_unauthorized_without_token()
   {
      $response = $this->getJson('/api/me');
      $response->assertStatus(401);
   }

   /**
    * Testa se o endpoint '/api/logout' retorna corretamente o logout.
    *
    * @return void
    */
   public function test_logout_invalidando_token()
   {
      $user = User::factory()->create();
      $token = JWTAuth::fromUser($user);

      $response = $this->withHeader('Authorization', "Bearer $token")
         ->postJson('/api/logout');

      $response->assertStatus(200)
         ->assertJson([
            'mensagem' => 'Logout realizado com sucesso',
         ]);
   }
}
