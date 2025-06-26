<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules;
class UpdateUserRequest extends FormRequest
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
            'profile_picture' => 'sometimes|image|mimes:jpg,jpeg,png,svg', 'max:5242880',
            'full_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|lowercase|email|max:255|unique:users,email',
            'address' => 'sometimes|string|max:255',
            'phone' => 'sometimes|numeric|digits_between:7,20',
            'account_status'=> 'sometimes|in:active,blocked'
        ];
    }
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!request()->has('profile_picture') && !request()->has('full_name') && !request()->has('email')&& !request()->has('address')&& !request()->has('phone')&& !request()->has('password')&& !request()->has('account_status')) {
                $validator->errors()->add('fields', 'At least one field must be provided.');
            }
        });
    }

    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(
            response()->json(
                [
                    'success' => false,
                    'message' => $validator->errors(),
                    'data'=>null
                ], 422
            )
            );
    }

}
