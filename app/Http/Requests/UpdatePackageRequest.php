<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePackageRequest extends FormRequest
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
            'destination_id' => ['sometimes', 'exists:destinations,id'],
            'activity_id' => ['sometimes', 'exists:activities,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'description' => ['sometimes', 'string'],
            'duration' => ['sometimes', 'string', 'max:255'],
            'image' => ['sometimes', 'image', 'mimes:jpg,jpeg,png,svg', 'max:5242880'],
            'discount' => ['sometimes', 'integer', 'min:0', 'max:100'],
        ];
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
