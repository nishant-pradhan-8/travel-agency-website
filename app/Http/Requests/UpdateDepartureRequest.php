<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateDepartureRequest extends FormRequest
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
            'package_id'=>'required | numeric | exists:packages,id',
            'departure_date' => 'required  | date',
            'available_slots'=>'required | numeric | min:0'
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!request()->has('package_id') && !request()->has('departure_date') && !request()->has('available_slots')) {
                $validator->errors()->add('fields', 'At least one field must be provided.');
            }
        });
    }

    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(
            response()->json(
                [
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422
            )
            );
    }
}
