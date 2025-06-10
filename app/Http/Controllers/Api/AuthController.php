<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseApi;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
   public function login(Request $request)
   {
      $credentials = $request->only('email', 'password');

      if (!$token = JWTAuth::attempt($credentials)) {
         return ResponseApi::unauthorized('Credenciais inválidas');
      }

      return response()->json(compact('token'));
   }

   public function register(UserRequest  $request)
   {
      try {
         $validatedData = $request->validated();

         $user = User::create([
            ...$validatedData,
            'password' => bcrypt($request->password),
         ]);

         $token = JWTAuth::fromUser($user);

         return response()->json([
            'user' => $user,
            'token' => $token,
         ], 201);
      } catch (\Exception $e) {
         return ResponseApi::error($e->getMessage(), $e->getCode() ?: 500);
      }
   }

   public function logout()
   {
      try {
         JWTAuth::invalidate(JWTAuth::getToken());
         return response()->json(['mensagem' => 'Logout realizado com sucesso']);
      } catch (JWTException $e) {
         return ResponseApi::error('Falha ao sair, token inválido.', 500);
      }
   }

   public function me()
   {
      return response()->json(auth('api')->user());
   }
}
