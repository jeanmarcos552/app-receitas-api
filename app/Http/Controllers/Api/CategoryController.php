<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseApi;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->query('name') . '%');
        }

        $categories = $query->get();
        if ($categories->isEmpty()) {
            return ResponseApi::notFound('Nenhuma categoria encontrada');
        }

        return response()->json($categories);
    }

    public function store(CategoryRequest $request)
    {
        try {
            $category = Category::create([
                'name' => $request->name,
            ]);

            return response()->json($category, 201);
        } catch (\Exception $e) {
            return ResponseApi::error($e->getMessage(), 500);
        }
    }

    public function show($categoria)
    {
        try {
            $category = Category::findOrFail($categoria);
            return response()->json($category);
        } catch (\Exception $e) {
            return ResponseApi::error('Categoria não encontrada', 404, $e->getMessage());
        }
    }

    public function update(CategoryRequest $request, $categoria)
    {
        try {

            $category = Category::find($categoria);

            if (!$category) {
                return ResponseApi::notFound('Categoria não encontrada');
            }

            if ($category->name === $request->name) {
                return ResponseApi::validation([
                    'name' => 'O nome do categoria não pode ser alterado.'
                ]);
            }

            $category->update($request->validated());

            return response()->json($category);
        } catch (\Exception $e) {
            return ResponseApi::error('Erro ao atualizar categoria: ' . $e->getMessage(), 500);
        }
    }

    public function destroy($categoria)
    {
        try {
            $category = Category::find($categoria);

            if (!$category) {
                return ResponseApi::notFound('Categoria não encontrada');
            }

            $category->delete();
            return ResponseApi::success('Categoria excluída com sucesso');
        } catch (\Exception $e) {
            return ResponseApi::error('Erro ao excluir categoria: ' . $e->getMessage(), 500);
        }
    }
}
