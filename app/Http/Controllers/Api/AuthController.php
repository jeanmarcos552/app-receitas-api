<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseApi;
use App\Http\Controllers\Controller;
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

   public function register(Request $request)
   {
      try {
         $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
         ]);

         $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
         ]);

         $token = JWTAuth::fromUser($user);

         return response()->json([
            'user' => $user,
            'token' => $token,
         ], 201);
      } catch (\Exception $e) {
         return ResponseApi::error($e->getMessage(), 500);
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
