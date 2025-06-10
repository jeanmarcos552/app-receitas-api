<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseApi;
use App\Http\Controllers\Controller;
use App\Http\Requests\RecipesRequest;
use App\Models\Recipes;
use Illuminate\Support\Facades\Auth;

class RecipesController extends Controller
{
    public function index()
    {
        $recipes = Recipes::with(['category', 'ingredients'])
            ->get();

        return response()->json($recipes, 200);
    }

    public function store(RecipesRequest $request)
    {
        try {
            $recipe = Recipes::create([
                ...$request->validated(),
                'user_id' => Auth::id(),
            ]);

            $recipe->ingredients()->sync($request->validated('ingredients'));

            return response()->json($recipe->load('category', 'ingredients'), 201);
        } catch (\Exception $e) {
            return ResponseApi::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $recipe = Recipes::with(['category', 'ingredients'])
                ->findOrFail($id);

            return response()->json($recipe);
        } catch (\Exception $e) {
            return ResponseApi::notFound("Receita não encontrada");
        }
    }

    public function update(RecipesRequest $request, $id)
    {
        $recipe = Recipes::findOrFail($id);

        $recipe->ingredients()->sync($request['ingredients']);

        $recipe->update($request->validated());

        return response()->json($recipe->load('category', 'ingredients'));
    }

    public function destroy($id)
    {
        try {
            $recipe = Recipes::findOrFail($id);
            $recipe->delete();

            return ResponseApi::success('Receita excluída com sucesso');
        } catch (\Exception $e) {
            return ResponseApi::notFound("Receita não encontrada");
        }
    }
}
