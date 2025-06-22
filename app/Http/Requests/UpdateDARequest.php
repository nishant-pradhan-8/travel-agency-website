<?php

namespace App\Http\Requests;

 use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class UpdateDARequest extends FormRequest
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
            'name' => "sometimes | string",
            'description' => "sometimes | string",
        ];
    }
   

  public function withValidator($validator)
{
    $validator->after(function ($validator) {
        if (!request()->has('name') && !request()->has('description')) {
            $validator->errors()->add('fields', 'Invalid Field or At least one field must be provided');
        }
    });
}


     protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
