<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecipesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'preparation_method' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'ingredients' => 'required|array',
            'ingredients.*' => 'exists:ingredients,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome da receita é obrigatório.',
            'name.string' => 'O nome da receita deve ser uma string.',
            'name.max' => 'O nome da receita não pode passar de 255 caracteres.',

            'description.required' => 'A descrição é obrigatória.',
            'description.string' => 'A descrição deve ser uma string.',

            'preparation_method.required' => 'O modo de preparo é obrigatório.',
            'preparation_method.string' => 'O modo de preparo deve ser uma string.',

            'category_id.required' => 'A categoria é obrigatória.',
            'category_id.exists' => 'A categoria selecionada não existe.',

            'ingredients.required' => 'A receita deve ter ao menos um ingrediente.',
            'ingredients.array' => 'Os ingredientes devem estar em formato de lista.',
            'ingredients.*.exists' => 'Algum ingrediente informado não existe.',
        ];
    }
}
