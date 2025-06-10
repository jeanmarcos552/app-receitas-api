<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseApi;
use App\Http\Controllers\Controller;
use App\Http\Requests\IngredientsRequest;
use App\Models\Ingredients;

class IngredientsController extends Controller
{
    public function index()
    {
        $query = Ingredients::query();

        if ($name = request('name')) {
            $query->where('name', 'like', '%' . $name . '%');
        }

        $ingredients = $query->get();
        return response()->json($ingredients);
    }

    public function store(IngredientsRequest  $request)
    {
        try {
            $ingredient = Ingredients::create($request->validated());

            return response()->json($ingredient, 201);
        } catch (\Exception $e) {
            return ResponseApi::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $ingredient = Ingredients::find($id);

            if (!$ingredient) {
                return ResponseApi::notFound('Ingrediente não encontrado');
            }

            return response()->json($ingredient);
        } catch (\Exception $e) {
            return ResponseApi::error($e->getMessage(), $e->getCode());
        }
    }

    public function update(IngredientsRequest $request, $id)
    {
        $ingredient = Ingredients::find($id);

        if (!$ingredient) {
            return ResponseApi::notFound('Ingrediente não encontrado');
        }

        if ($ingredient->name === $request->name) {
            return ResponseApi::validation([
                'name' => 'O nome do ingrediente não pode ser alterado.'
            ], 'Erro de validação');
        }

        $ingredient->update($request->validated());

        return response()->json($ingredient);
    }

    public function destroy($id)
    {
        try {
            $ingredient = Ingredients::where('id', $id)
                ->first();

            if (!$ingredient) {
                return ResponseApi::notFound('Ingrediente não encontrado');
            }

            if ($ingredient->recipes()->exists()) {
                return ResponseApi::forbidden(
                    'Não é possível excluir o ingrediente, pois está vinculado a uma ou mais receitas.',
                );
            }
            $ingredient->delete();

            return ResponseApi::success('Ingrediente excluído com sucesso');
        } catch (\Exception $e) {
            return ResponseApi::error($e->getMessage(), 500);
        }
    }
}
