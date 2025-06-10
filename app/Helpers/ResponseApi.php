<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseApi
{

   /**
    * Generate a JSON response for successful operations.
    *
    * @param string $message
    * @param int $status
    * @return JsonResponse
    */
   public static function success(string $message = 'Operação bem-sucedida', int $status = 200): JsonResponse
   {
      return response()->json([
         'success' => true,
         'message' => $message,
      ], $status);
   }
   /**
    * Generate a JSON response for error operations.
    *
    * @param string $message
    * @param int $status
    * @param mixed $data
    * @return JsonResponse
    */
   public static function error(string $message = 'Erro interno', int $status = 500, $errors = []): JsonResponse
   {
      return response()->json([
         'success' => false,
         'message' => $message,
         'errors'    => $errors,
      ], $status ?? 500);
   }


   public static function forbidden(string $message = 'Acesso proibido'): JsonResponse
   {
      return self::error($message, 403);
   }

   public static function notFound(string $message = 'Recurso não encontrado'): JsonResponse
   {
      return self::error($message, 404);
   }

   public static function unauthorized(string $message = 'Não autorizado'): JsonResponse
   {
      return self::error($message, 401);
   }

   public static function validation(array $errors, string $message = 'Erro de validação'): JsonResponse
   {
      return response()->json([
         'success' => false,
         'message' => $message,
         'errors'  => $errors,
      ], 422);
   }
}
