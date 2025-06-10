<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IngretientsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:40|unique:ingretients,name',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'ingrediende é obrigatório.',
            'name.string'   => 'ingrediende deve ser uma string.',
            'name.max'      => 'ingrediende não pode ter mais de 40 caracteres.',
            'name.unique'   => 'Já existe um ingrediente com esse nome.',
        ];
    }
}
